import 'dotenv/config';
import readline from 'node:readline/promises';
import process from 'node:process';
import { HumanMessage, AIMessage, tool, createAgent } from 'langchain';
import { ChatMistralAI } from '@langchain/mistralai';
import { sendEmail } from './mail.service.js';
import * as z from 'zod';

const emailTool = tool(
    sendEmail, //note : the function here is the action the tool will perform and it should always return a string or a number
    {
        name: 'emailTool',
        description: 'Use this tool to send an email',
        schema: z.object({
            to: z.string().describe("The recipient's email address"),
            html: z.string().describe('The HTML content of the email'),
            subject: z.string().describe('The subject of the email'),
        }),
    },
);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const model = new ChatMistralAI({
    model: 'mistral-small-latest',
    apiKey: process.env.MISTRAL_API_KEY,
});

const agent = createAgent({
    model,
    tools: [emailTool],
});

const chatHistory = [];

while (true) {
    const userInput = await rl.question('\x1b[32mYou:\x1b[0m ');

    if (userInput.toLowerCase() === 'exit') {
        console.log('Exited...');
        rl.close();
        break;
    }

    chatHistory.push(new HumanMessage(userInput));

    const response = await agent.invoke({
        messages: chatHistory,
    });

    /**
     * NOTE : in the agent.invoke it accepts only messages as the object.
     * So if you make a different variable then you have to pass it { messages: [ variableName ] }
     * Or we can just a variable named as the messages=[] and then pass it directly
     */

    chatHistory.push(response.messages[response.messages.length - 1]);

    console.log(
        `\x1b[34m[AI]\x1b[0m ${response.messages[response.messages.length - 1].content}`,
    );
}
