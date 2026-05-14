import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 700,
    chunkOverlap: 120,
});

// PARSE MARKDOWN SECTIONS

function parseMarkdownSections(markdown) {
    const lines = markdown.split('\n');

    const sections = [];

    let currentSection = {
        h1: null,
        h2: null,
        h3: null,
        content: [],
    };

    function pushCurrentSection() {
        if (currentSection.content.length) {
            sections.push({
                ...currentSection,
            });
        }
    }

    for (const line of lines) {
        // H3

        if (line.startsWith('### ')) {
            pushCurrentSection();

            currentSection = {
                h1: currentSection.h1,
                h2: currentSection.h2,
                h3: line.replace('### ', '').trim(),
                content: [line],
            };

            continue;
        }

        // H2

        if (line.startsWith('## ')) {
            pushCurrentSection();

            currentSection = {
                h1: currentSection.h1,
                h2: line.replace('## ', '').trim(),
                h3: null,
                content: [line],
            };

            continue;
        }

        // H1

        if (line.startsWith('# ')) {
            pushCurrentSection();

            currentSection = {
                h1: line.replace('# ', '').trim(),
                h2: null,
                h3: null,
                content: [line],
            };

            continue;
        }

        // NORMAL CONTENT

        currentSection.content.push(line);
    }

    pushCurrentSection();

    return sections;
}

// PROCESS PAGE

export async function processPage(page) {
    const sections = parseMarkdownSections(page.markdown);

    const finalChunks = [];

    let globalChunkIndex = 0;

    for (const section of sections) {
        const docs = await splitter.createDocuments([
            section.content.join('\n'),
        ]);

        docs.forEach((doc) => {
            finalChunks.push({
                markdown: doc.pageContent,

                metadata: {
                    pageNumber: page.page_number,

                    h1: section.h1,
                    h2: section.h2,
                    h3: section.h3,

                    chunkIndex: globalChunkIndex++,
                },
            });
        });
    }

    return finalChunks;
}

// PROCESS ALL PAGES

export async function processMarkdownPages(pages) {
    console.log('pages: ', pages);

    const processedPages = await Promise.all(pages.map(processPage));

    console.log('processedPages: ', processedPages);

    return processedPages.flat();
}
