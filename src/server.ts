import Fastify from 'fastify';
import { fastifyWebsocket } from '@fastify/websocket';
import cors from '@fastify/cors';
import { chat } from './routes';

export const fastifyServer = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
});

fastifyServer.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});
fastifyServer.register(fastifyWebsocket);
fastifyServer.register(chat);

fastifyServer.listen({ port: 3000, host: '0.0.0.0' }).then(() => {
  console.log();
});
