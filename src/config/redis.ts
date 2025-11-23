import { createClient } from 'redis';

export const redis = createClient({
  username: 'default',
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

redis.on('error', (err) => {
  console.error('Redis Error:', err);
});

await redis.connect();

export default redis;
