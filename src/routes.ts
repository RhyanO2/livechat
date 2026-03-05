import { FastifyPluginAsync } from 'fastify';
import { fastifyServer } from './server';

export async function chat() {
  fastifyServer.get('/t', { websocket: true }, (socket, req) => {

    socket.on('message', (message) => {
      console.log(`IP: ${req.ip}: ${message.toString()}`);
    });

    socket.on('close', () => {
      console.log(`${req.ip} Disconnected!`);
    });
  });
}
