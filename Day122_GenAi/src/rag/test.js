import 'dotenv/config';

import LlamaCloud from '@llamaindex/llama-cloud';
import fs from 'fs';
import { MarkItDown } from 'markitdown-ts';

const filePath = './src/assets/wp_mini_project_report_48.pdf';

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

    return result;
}

// Function to save JSON to a file
function saveResultToFile(data, filename = 'llama_output.json') {
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
saveResultToFile(await parsePdfByMarkItDown(filePath));
