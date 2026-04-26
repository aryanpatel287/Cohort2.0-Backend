import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatMistralAI } from '@langchain/mistralai';
import { AIMessage, createAgent, HumanMessage, SystemMessage } from 'langchain';

const geminiModel = new ChatGoogleGenerativeAI({
    model: 'gemma-4-31b-it',
    apiKey: 'APIKEY',
});

export const geminiAgent = createAgent({
    model: geminiModel,
});

export async function generateResponse(messages) {
    console.log('generate Response func called');

    console.log('messages: ', messages);

    const mappedMessages = messages.map((message) => {
        console.log('message: ', message);

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

    console.log(response.messages[response.messages.length - 1].text);

    return response.messages[response.messages.length - 1].text;
}

const message = [
    {
        role: 'user',
        content: [
            { type: 'text', text: 'Describe the content of these images.' },
            {
                type: 'image',
                url: 'https://images.squarespace-cdn.com/content/v1/54822a56e4b0b30bd821480c/45ed8ecf-0bb2-4e34-8fcf-624db47c43c8/Golden+Retrievers+dans+pet+care.jpeg',
            },
            {
                type: 'image',
                url: 'https://i.ytimg.com/vi/uSIB1EfDGWE/maxresdefault.jpg',
            },
        ],
    },
];

generateResponse(message);
