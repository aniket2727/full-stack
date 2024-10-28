


const redis = require('redis');

// Create a Redis client
const redisClient = redis.createClient({
  url: 'redis://localhost:6379', // Replace with your Redis server URL if necessary
});

// Event listener for errors
redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

// Event listener for when Redis connection ends
redisClient.on('end', () => {
  console.log('Redis connection closed');
});

// Connect to Redis
redisClient.connect()
  .then(() => console.log('Connected to Redis'))
  .catch(err => console.error('Error connecting to Redis:', err));

module.exports = redisClient;
