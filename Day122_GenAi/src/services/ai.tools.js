import { tool } from 'langchain';
import * as z from 'zod';
import { sendEmail } from './mail.service.js';
import { searchWeb } from './internet.service.js';
import { retrieveRelevantContext } from '../rag/Retrieval.rag.js';

const emailTool = tool(sendEmail, {
    name: 'emailTool',
    description:
        'Use this tool to send an email to someone that user asks you to send an email to. Always use this tool when user asks you to send an email to someone. But make sure to inform the user that the email will be sent using the system email address.',
    schema: z.object({
        to: z.string().describe("The recipient's email address"),
        html: z.string().describe('The HTML content of the email'),
        subject: z.string().describe('The subject of the email'),
    }),
});

const searchInternetTool = tool(searchWeb, {
    name: 'searchInternetTool',
    description:
        'Use this tool when your knowledge about a topic is insufficient to answer the user query, and you think that searching the web will help you get the information needed to answer the query. Always use this tool when you want to get information about current events or topics that are not well covered in your training data, which has a knowledge cutoff in September 2024.',
    schema: z.string().describe('The query to search on web'),
});

const retrieverTool = tool(retrieveRelevantContext, {
    name: 'retrieverTool',
    description:
        'Use this tool when the you think that there is need to retrieve relevant context for the query that user has asked. This is useful when you want to get information about the ingested data of the document and use that information to answer the user query.',
    schema: z.string().describe('The query to retrieve relevant context'),
});

export { emailTool, searchInternetTool, retrieverTool };
