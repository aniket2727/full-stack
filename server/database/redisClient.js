

const redis = require('redis');

// Create a Redis client
const redisClient = redis.createClient({
  url: 'redis://localhost:6379', // Replace with your Redis server URL if necessary
});

// Connect to Redis
redisClient.connect()
  .then(() => console.log('Connected to Redis'))
  .catch(err => console.error('Error connecting to Redis:', err));

module.exports = redisClient;
