const axios = require('axios');
const bluebird = require('bluebird');
const redis = require('redis');

const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

async function getVaccine() {
    let vaccineCacheExists = await client.existsAsync('vaccines');
        if(vaccineCacheExists) {
            try{ 
                console.log(`get vaccines from cache`);
                let vaccines = await client.getAsync('vaccines');
                vaccines = JSON.parse(vaccines);
                return vaccines;
            }catch(e) {
                console.log(e);
                throw EvalError("Something went wrong with redis");
            }
        }else {
            try {
                console.log(`get vaccines from source`);
                const {data: response} = await axios.get('https://disease.sh/v3/covid-19/vaccine');
                await client.setAsync('vaccines', JSON.stringify(response));
                await client.expireAsync('vaccines', 86400);//API's source charts are updated weekly, so I set it to expire after a day
                return response;
            } catch (e) {
                console.log(e);
                throw EvalError("Something went wrong with redis or axios");
            }
        }
}

module.exports = getVaccine;