import 'dotenv/config';
import app from './src/app.js';
import http from 'http';
import { initSocket } from './src/sockets/server.socket.js';

const PORT = 5000;

const httpServer = http.createServer(app);

initSocket(httpServer);

httpServer.listen(PORT, () => {
    console.log('server is running on port ', PORT);
});

import { searchWeb } from './src/services/internet.service.js';

let response = await searchWeb('What is the ram prices in ahmedadbad today');

console.log(response);
