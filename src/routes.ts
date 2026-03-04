import { FastifyPluginAsync } from 'fastify';
import { fastifyServer } from './server';

export async function chat() {
  fastifyServer.get('/t', { websocket: true }, (socket, req) => {
    // socket

    socket.on('message', (message) => {
      console.log(`Message coming from:(${req.ip})`);
    });
  });
}
