import 'dotenv/config';
import app from './src/app.js';
import http from 'http';
import { initSocket } from './src/sockets/server.socket.js';

const PORT = 3000;

const httpServer = http.createServer(app);

initSocket(httpServer);

httpServer.listen(PORT, () => {
    console.log('server is running on port ', process.env.SERVER_PORT);
});
