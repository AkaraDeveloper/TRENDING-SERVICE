//============================<<--- CONNECTIONM TO REDIS CACHE --->>==================================
//--- Refactored at 1 octuber 2023
//--------------------------------
const redis = require("redis");

const redisClient = redis.createClient({
    url: 'redis://cache.akarahub.tech:6379'
});
(async () => await redisClient.connect())();
redisClient.on('ready', () => console.log("<< ----👌|= Connection to cache is completed ✔ "));
redisClient.on('error', (err) => console.log("<< ---🤢 |= The connection to the cache has been raised error 💥"));
module.exports = {
    redisClient
}