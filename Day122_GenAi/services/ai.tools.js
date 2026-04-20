import { tool } from 'langchain';
import * as z from 'zod';
import { sendEmail } from './mail.service.js';
import { searchWeb } from './internet.service.js';

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

const searchTool = tool(searchWeb, {
    name: 'searchTool',
    description: 'Use this tool to search for the latest information on web',
    schema: z.string().describe('The query to search on web'),
});

export { emailTool, searchTool };
