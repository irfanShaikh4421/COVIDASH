const axios = require('axios');
const bluebird = require('bluebird');
const redis = require('redis');

const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

async function getBeds(){
    let hospitalCacheExists = await client.existsAsync('hospitalBeds');
    try{
        if(hospitalCacheExists) {
            console.log(`get hospital beds from cache`);
            let hospitalBeds = await client.getAsync('hospitalBeds');
            hospitalBeds = JSON.parse(hospitalBeds);
            return hospitalBeds;
        }else {
            console.log(`get hospital beds from source`);
            const url = 'https://opendata.arcgis.com/datasets/1044bb19da8d4dbfb6a96eb1b4ebf629_0.geojson';
            const { data } = await axios.get(url);
            await client.setAsync('hospitalBeds', JSON.stringify(data));//lots of data from this api. Like 218,000 lines alot.
            await client.expireAsync('hospitalBeds', 3600);//this api was last updated today, so I set the redis cache to 1 hour
            return data;
        }
    }catch (e) {
        console.log(e);
        throw EvalError("something went wrong with redis or axios");
    }
}

module.exports = {
    getBeds,
}