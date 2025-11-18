// const redis = require('redis');

// const client = redis.createClient({
//   url: process.env.REDIS_URL || 'redis://localhost:6379'
// });

// client.on('error', (err) => console.log('Redis Client Error', err));

// const connectRedis = async () => {
//   await client.connect();
//   console.log('Redis Connected');
// };

// module.exports = { client, connectRedis };

let client = null;

const connectRedis = async () => {
  try {
    if (process.env.REDIS_URL) {
      const redis = require('redis');
      client = redis.createClient({ url: process.env.REDIS_URL });
      client.on('error', (err) => console.log('Redis Client Error', err));
      await client.connect();
      console.log('✅ Redis Connected');
    } else {
      console.log('⚠️ Redis not configured — skipping Redis connection');
    }
  } catch (err) {
    console.log('⚠️ Redis connection failed, continuing without Redis:', err.message);
  }
};

module.exports = { client, connectRedis };
