import { FastifyInstance } from 'fastify';
import { fastifyServer } from './server';
import type { WebSocket } from 'ws';

const clients = new Set<WebSocket>();

export async function chat(fastify: FastifyInstance) {
  fastify.get('/health', (req, res) => {
    try {
      res.status(200).send({ message: 'All okay!' });
    } catch (err: any) {
      console.log(err);
    }
  });

  fastify.get('/t', { websocket: true }, (socket, req) => {
    clients.add(socket);

    console.log(`Connected total: ${clients.size}`);

    socket.on('message', (message) => {
      const text = message.toString();
      // console.log(`IP: ${req.ip}: ${text}`);
      for (const client of clients) {
        if (client.readyState === 1) {
          client.send(`(${req.ip}): ${text}`);
        }
      }
    });

    socket.on('close', () => {
      clients.delete(socket);
      console.log(`${req.ip} Disconnected!`);
      console.log(`Connected total: ${clients.size}`);
    });

    socket.on('error', (err: any) => {
      clients.delete(socket);
      req.log.error('ERROR', err);
    });
  });
}
