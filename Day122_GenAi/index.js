import 'dotenv/config';
import readline from 'node:readline/promises';
import process from 'node:process';
import { startAiChat } from './services/ai.service.js';
import { searchWeb } from './services/internet.service.js';

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

startAiChat();
