import 'dotenv/config';

import { PDFParse } from 'pdf-parse';
import fs from 'fs';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { MistralAIEmbeddings } from '@langchain/mistralai';
import { Pinecone } from '@pinecone-database/pinecone';
import { map } from 'zod';

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

const index = pc.Index('cohort-2-rag');

const embeddingModel = new MistralAIEmbeddings({
    apiKey: process.env.MISTRAL_API_KEY,
    model: 'mistral-embed',
});

const filePath = './src/assets/the_last_train_story.pdf';

const fileBuffer = fs.readFileSync(filePath);

async function parseUploadedPDF(dataBuffer) {
    const parser = new PDFParse({
        data: dataBuffer,
    });

    const data = await parser.getText();

    return data;
}

async function chunkAndEmbedThePDF(data) {
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 0,
    });

    const chunks = await splitter.splitText(data.text);

    const docs = await Promise.all(
        chunks.map(async (chunk) => {
            const embeddedChunk = await embeddingModel.embedQuery(chunk);

            return {
                text: chunk,
                embeddedChunk,
            };
        }),
    );
    return docs;
}

async function upsertTheVector(docs) {
    await index.upsert({
        records: docs.map((doc, idx) => ({
            id: `doc-${idx}`,
            values: doc.embeddedChunk,
            metadata: {
                text: doc.text,
            },
        })),
    });

    console.log('Vectors upserted successfully');
}

async function deleteTheVector() {
    const deleteResult = await index.deleteAll();
    console.log('All vectors deleted successfully');
    console.log('Delete result: ', deleteResult);
}

export async function dataIngestion(dataBuffer) {
    try {
        console.log('DataIngestion Started');

        const data = await parseUploadedPDF(dataBuffer);
        console.log('PDF parsing completed');

        const docs = await chunkAndEmbedThePDF(data);
        console.log('Chunking and embedding completed');

        await upsertTheVector(docs);
        console.log('Data ingestion completed successfully');
    } catch (error) {
        console.error('Error during data ingestion: ', error);
    }
}


// await dataIngestion(fileBuffer);
// await queryTheVector('What is the story about?');

/**
 * NOTE : Return the results in the strings format using the JSON.stringify()
 */
