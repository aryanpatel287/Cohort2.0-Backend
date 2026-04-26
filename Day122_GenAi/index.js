import 'dotenv/config';
// import readline from 'node:readline/promises';
// import process from 'node:process';
// import { startAiChat } from './services/ai.service.js';
// import { searchWeb } from './services/internet.service.js';

// export const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// startAiChat();

import { PDFParse } from 'pdf-parse';
import fs from 'fs';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { MistralAIEmbeddings } from '@langchain/mistralai';
import { Pinecone } from '@pinecone-database/pinecone';
import { map } from 'zod';

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pc.Index('cohort-2-rag');

// let dataBuffer = fs.readFileSync('./src/assets/story.pdf');

// const parser = new PDFParse({
//     data: dataBuffer,
// });

// const data = await parser.getText();

// console.log(data);

// const splitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 500,
//     chunkOverlap: 0,
// });

// const chunks = await splitter.splitText(data.text);

const embeddings = new MistralAIEmbeddings({
    apiKey: process.env.MISTRAL_API_KEY,
    model: 'mistral-embed',
});

// const docs = await Promise.all(
//     chunks.map(async (chunk) => {
//         const embeddedChunk = await embeddings.embedQuery(chunk);

//         return {
//             text: chunk,
//             embeddedChunk,
//         };
//     }),
// );

// console.log('docs: ', docs);

// const result = await index.upsert({
//     records: docs.map((doc, i) => ({
//         id: `doc-${i}`,
//         values: doc.embeddedChunk,
//         metadata: {
//             text: doc.text,
//         },
//     })),
// });

// console.log('result: ', result);

const queryEmbedding = await embeddings.embedQuery(
    'On the first day, what did his manager said?',
);

const queryResult = await index.query({
    vector: queryEmbedding,
    topK: 3,
    includeMetadata: true,
});

console.log(queryResult.matches);
/**
 * NOTE : Return the results in the strings fromat using the JSON.stringify()
 */
