import { searchWeb } from './src/services/internet.service.js';

let response = await searchWeb('What is the ram prices in ahmedadbad today');

console.log(JSON.stringify(response));
