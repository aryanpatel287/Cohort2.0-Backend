import readline from 'node:readline/promises';
import process from 'node:process';
import { ChatMistralAI } from '@langchain/mistralai';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const model = new ChatMistralAI({
    model: 'mistral-small-latest',
    apiKey: 'MISTRAL_API_KEY',
});

const chatHistory = [];

while (true) {
    const userInput = await rl.question('You: ');

    if (userInput.toLowerCase() === 'exit') {
        console.log('Exited...');
        rl.close;
        break;
    }

    chatHistory.push('user : ' + userInput);
    console.log(chatHistory);

    const response = await model.invoke(chatHistory);
    chatHistory.push('Ai: ' + response.text);
    console.log('Ai: ', response.text);
}
