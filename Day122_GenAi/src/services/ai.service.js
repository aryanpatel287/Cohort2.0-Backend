import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatMistralAI } from '@langchain/mistralai';
import { AIMessage, createAgent, HumanMessage, SystemMessage } from 'langchain';
import { emailTool, searchInternetTool } from './ai.tools.js';

const geminiModel = new ChatGoogleGenerativeAI({
    model: 'gemma-4-31b-it',
    apiKey: process.env.GEMINI_API_KEY,
});

export const geminiAgent = createAgent({
    model: geminiModel,
    tools: [emailTool, searchInternetTool],
});

const mistralModel = new ChatMistralAI({
    model: 'mistral-medium-latest',
    apiKey: process.env.MISTRAL_API_KEY,
});

export const mistralAgent = createAgent({
    model: mistralModel,
    tools: [emailTool, searchInternetTool],
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

    return response.messages[response.messages.length - 1].text;
}

export async function generateChatTitle(message) {
    const response = await geminiModel.invoke([
        new SystemMessage(`You are a helpful assistant that generates concise and descriptive titles for chat conversations. 
        User will provide you the first message of a chat conversation, your task is to create a title that accurately reflects the main topic or theme of the conversation. The title should be brief, ideally no more than 2-4 words, and should capture the essence of the discussion in a clear and engaging way.    
            `),
        new HumanMessage(
            `Generate a concise and descriptive title for a chat conversation based on the following message:
            "${message}". `,
        ),
    ]);

    return response.text;
}

export async function startAiChat(message) {
    const chatHistory = [];
    chatHistory.push(new HumanMessage(message));

    const response = await geminiAgent.invoke({
        messages: chatHistory,
    });

    // console.log('\x1b[31mGemma-response :\x1b[0m', response.messages);

    /**
     * NOTE : in the agent.invoke it accepts only messages as the object.
     * So if you make a different variable then you have to pass it { messages: [ variableName ] }
     * Or we can just a variable named as the messages=[] and then pass it directly
     */

    chatHistory.push(response.messages[response.messages.length - 1]);

    console.log(
        `\x1b[34m[AI]\x1b[0m ${response.messages[response.messages.length - 1].text}`,
    );

    return response.messages[response.messages.length - 1].text;
}

// export async function streamAiChat(message) {
//     const chatHistory = [];

//     chatHistory.push(new HumanMessage(message));

//     const stream = await geminiAgent.stream(
//         {
//             messages: chatHistory,
//         },
//         { streamMode: 'values' },
//     );

//     for await (const chunk of stream) {
//         // Each chunk contains the full state at that point
//         const latestMessage = chunk.messages.at(-1);
//         if (latestMessage?.content) {
//             console.log(`Agent: ${latestMessage.content}`);
//             return latestMessage.content;
//         } else if (latestMessage?.tool_calls) {
//             const toolCallNames = latestMessage.tool_calls.map((tc) => tc.name);
//             console.log(`Calling tools: ${toolCallNames.join(', ')}`);
//             return toolCallNames.join(', ');
//         }
//     }
// }
export async function streamAiChat(message, onChunk) {
    const stream = await geminiAgent.stream(
        { messages: [new HumanMessage(message)] },
        { streamMode: 'values' },
    );

    let finalText = '';

    for await (const chunk of stream) {
        const latest = chunk.messages?.at(-1);
        if (!latest) continue;
        if (latest.tool_calls && latest.tool_calls.length > 0) {
            console.log(
                'Calling tools:',
                latest.tool_calls.map((t) => t.name).join(', '),
            );
            continue;
        }

        const content = latest.content;
        const text =
            typeof content === 'string'
                ? content
                : Array.isArray(content)
                    ? content.map((p) => p.text || '').join('')
                    : '';

        if (text) {
            finalText = text;
            if (onChunk) onChunk(text);
        }
    }

    return finalText;
}
