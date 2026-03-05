import { fastifyServer } from './server';
import type { WebSocket } from 'ws';

const clients = new Set<WebSocket>();

export async function chat() {
  fastifyServer.get('/health', (req, res) => {
    try {
      res.status(200).send({ message: 'All okay!' });
    } catch (err: any) {
      console.log(err);
    }
  });

  fastifyServer.get('/t', { websocket: true }, (socket, req) => {
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

    socket.on('error', (err: any) => {
      clients.delete(socket);
      req.log.error('ERROR', err);
    });
  });
}
