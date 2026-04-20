import { ChatMistralAI } from '@langchain/mistralai';
import { createAgent, HumanMessage } from 'langchain';
import { emailTool, searchTool } from './ai.tools.js';
import { rl } from '../index.js';

const model = new ChatMistralAI({
    model: 'mistral-small-latest',
    apiKey: process.env.MISTRAL_API_KEY,
});

export const mistralAiAgent = createAgent({
    model,
    tools: [emailTool, searchTool],
});

export async function startAiChat() {
    const chatHistory = [];

    while (true) {
        const userInput = await rl.question('\x1b[32mYou:\x1b[0m ');

        if (userInput.toLowerCase() === 'exit') {
            console.log('Exited...');
            rl.close();
            break;
        }

        chatHistory.push(new HumanMessage(userInput));

        const response = await mistralAiAgent.invoke({
            messages: chatHistory,
        });

        console.log('\x1b[31mMistral-response :\x1b[0m', response);

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
}
