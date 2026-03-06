import Fastify from 'fastify';
import { fastifyWebsocket } from '@fastify/websocket';
import { chat } from './routes';

export const fastifyServer = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
});

fastifyServer.register(fastifyWebsocket);
fastifyServer.register(chat);

fastifyServer.listen({ port: 3000, host: '0.0.0.0' }).then(() => {
  console.log();
});
