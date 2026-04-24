import { Server } from 'socket.io';
import { generateResponse, startAiChat, streamAiChat } from '../services/ai.service.js';

let io;

export function initSocket(httpServer) {
    io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_ORIGINS,
            credentials: true,
        },
    });

    console.log('Socket.io server is running');

    io.on('connection', (socket) => {
        console.log('A user connected: ' + socket.id);

        listenMessage(socket);
    });
}

export function getIO() {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
}

function listenMessage(socket) {
    socket.on('message', async (msg) => {
        console.log(
            `[${new Date().toISOString()}] Received from ${socket.id}:`,
            msg,
        );
        const aiReply = await streamAiChat(msg);
        socket.emit('aiReply', aiReply);
    });
}
