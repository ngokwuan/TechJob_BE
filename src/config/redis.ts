import { createClient } from 'redis';

export const redis = createClient({
  username: 'default',
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    keepAlive: true,

    reconnectStrategy: (retries) => {
      return Math.min(retries * 100, 3000);
    },
  },
});

redis.on('error', (err) => console.error('Redis Error:', err));
export const connectRedis = async () => {
  await redis.connect();
};
export default redis;
