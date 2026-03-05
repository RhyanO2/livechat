"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chat = chat;
const server_1 = require("./server");
const clients = new Set();
async function chat() {
    server_1.fastifyServer.get('/health', (req, res) => {
        try {
            res.status(200).send({ message: 'All okay!' });
        }
        catch (err) {
            console.log(err);
        }
    });
    server_1.fastifyServer.get('/t', { websocket: true }, (socket, req) => {
        clients.add(socket);
        console.log(`Connected total: ${clients.size}`);
        socket.on('message', (message) => {
            const text = message.toString();
            console.log(`IP: ${req.ip}: ${text}`);
        });
        socket.on('close', () => {
            clients.delete(socket);
            console.log(`${req.ip} Disconnected!`);
            console.log(`Connected total: ${clients.size}`);
        });
        socket.on('error', (err) => {
            clients.delete(socket);
            req.log.error('ERROR', err);
        });
    });
}
