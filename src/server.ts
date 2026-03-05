import Fastify from 'fastify';
import { fastifyWebsocket } from '@fastify/websocket';
import { chat } from './routes';

export const fastifyServer = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
});

fastifyServer.register(fastifyWebsocket);
fastifyServer.register(chat);

fastifyServer.listen({ port: 3000, host: '0.0.0.0' }).then(() => {
  console.log({});
});
