import 'dotenv/config';

import LlamaCloud from '@llamaindex/llama-cloud';
import fs from 'fs';
import { MarkItDown } from 'markitdown-ts';
import { processMarkdownPages } from './markdownSplitter.js';

const filePath = './src/assets/Campus Job Description - 2027.pdf';

async function parsePdfByLlama(filePath) {
    const client = new LlamaCloud({
        apiKey: process.env.LLAMA_CLOUD_API_KEY,
    });

    // Upload and parse a document
    const file = await client.files.create({
        file: fs.createReadStream(filePath),
        purpose: 'parse',
    });

    const result = await client.parsing.parse({
        file_id: file.id,
        tier: 'cost_effective',
        version: 'latest',
        expand: ['markdown'],
    });

    console.log('Result: ', result);
    console.log(result.markdown.pages[0].markdown);

    return result.markdown.pages;
}

// Function to save JSON to a file
function saveResultToFile(data, filename = 'output.json') {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Result saved to ${filename}`);
}

async function parsePdfByMarkItDown(filePath) {
    const markitdown = new MarkItDown();
    try {
        // Convert a local file
        const result = await markitdown.convert(filePath);

        // Or convert from a URL
        // const result = await markitdown.convert(
        //     'https://arxiv.org/pdf/2308.08155v2.pdf',
        // );

        if (result) {
            console.log(result.markdown);
            return result;
        }
    } catch (error) {
        console.error('Conversion failed:', error);
    }
}

// Save the entire result to a JSON file

const finalResult = await processMarkdownPages(await parsePdfByLlama(filePath));

saveResultToFile(finalResult, 'llama_chunked_output.json');
