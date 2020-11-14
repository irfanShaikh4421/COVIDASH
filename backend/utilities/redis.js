const redis = require('redis')
const bluebird = require('bluebird')
const config = require("../config/index")

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const redisClient = redis.createClient(config.redis);

module.exports = {
    redisClient
}