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

async function parseUploadedPDF(filePath) {
    const dataBuffer = fs.readFileSync(filePath);

    const parser = new PDFParse({
        data: dataBuffer,
    });

    console.log('parser: ', parser);

    console.log(
        '==================================================================================================================================',
    );

    const data = await parser.getText();

    // console.log('data: ', data);
    // console.log(
    //     '==================================================================================================================================',
    // );

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

    // console.log('docs: ', docs);
    // console.log(
    //     '==================================================================================================================================',
    // );
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
    console.log(
        '==================================================================================================================================',
    );
}

export async function dataIngestion(filePath) {
    try {
        const data = await parseUploadedPDF(filePath);

        console.log('data: ', data);
        console.log(
            '==================================================================================================================================',
        );

        const docs = await chunkAndEmbedThePDF(data);

        console.log('docs: ', docs);
        console.log(
            '==================================================================================================================================',
        );

        await upsertTheVector(docs);
    } catch (error) {
        console.error('Error during data ingestion: ', error);
    }
}

export async function queryTheVector(prompt) {
    const queryEmbedding = await embeddingModel.embedQuery(prompt);

    const queryResult = await index.query({
        vector: queryEmbedding,
        topK: 3,
        includeMetadata: true,
    });

    console.log('Query result: ', queryResult);
    console.log('Query matches: ', queryResult.matches);

    return queryResult.matches;
}

// await dataIngestion(filePath);
await queryTheVector('What is the story about?')

/**
 * NOTE : Return the results in the strings format using the JSON.stringify()
 */
