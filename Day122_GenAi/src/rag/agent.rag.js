import 'dotenv/config';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { HumanMessage, AIMessage } from '@langchain/core/messages';

import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { createAgent } from 'langchain';
import {
    emailTool,
    retrieverTool,
    searchInternetTool,
} from '../services/ai.tools.js';

const geminiModel = new ChatGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
    model: 'gemma-4-31b-it',
});



const geminiAgent = createAgent({
    model: geminiModel,
    tools: [retrieverTool, searchInternetTool, emailTool],
});

export async function queryRagAgent(messages) {
    console.log('generate Response func called');

    const mappedMessages = messages.map((message) => {
        if (message.role == 'user') {
            return new HumanMessage(message.content);
        }
        if (message.role == 'ai') {
            return new AIMessage(message.content);
        }
    });

    const response = await geminiAgent.invoke({
        messages: mappedMessages,
    });

    return response.messages[response.messages.length - 1].text;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const chatHistory = [];

async function startChat() {
    console.log('\x1b[35m=== Chat started! Type "exit" to quit ===\x1b[0m');
    const askQuestion = () => {
        rl.question('\x1b[36mMe:\x1b[0m ', async (userInput) => {
            if (userInput.toLowerCase() === 'exit') {
                rl.close();
                return;
            }

            chatHistory.push({ role: 'user', content: userInput });

            try {
                const responseText = await queryRagAgent(chatHistory);
                chatHistory.push({ role: 'ai', content: responseText });
                console.log(`\x1b[32mAI:\x1b[0m ${responseText}\n`);
            } catch (error) {
                console.error('\x1b[31mError:\x1b[0m', error.message, '\n');
            }

            askQuestion();
        });
    };

    askQuestion();
}

// Run the chat interface if this file is executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    startChat();
}
