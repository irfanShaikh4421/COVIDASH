const axios = require('axios');
const bluebird = require('bluebird');
const redis = require('redis');

const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

validStates = ['alabama', 'alaska', 'arizona', 'arkansas', 'california', 'colorado', 'connecticut', 'delaware', 'florida', 'georgia', 'hawaii', 'idaho', 'illinois', 'indiana', 'iowa', 'kansas', 'kentucky', 'louisiana', 'maine', 'maryland', 'massachusetts', 'michigan', 'minnesota', 'mississippi', 'missouri', 'montana', 'nebraska', 'nevada', 'new-hampshire', 'new-jersey', 'new-mexico', 'new-york', 'north-carolina', 'north-dakota', 'ohio', 'oklahoma', 'oregon', 'pennsylvania', 'rhode_island', 'south-carolina', 'south_dakota', 'tennessee', 'texas', 'utah', 'vermont', 'virginia', 'washington', 'west-virginia', 'wisconsin', 'wyoming'];

async function getTestState(stateName) {
    if(!validStates.includes(stateName)) throw SyntaxError("Not a valid stateName!");
    let stateCacheExists = await client.existsAsync(`testing/${stateName}`);
    if(stateCacheExists){
        let state = await client.getAsync(`testing/${stateName}`);
        state = JSON.parse(state);
        return state;
    }else{
        const baseUrl = 'https://covid-19-testing.github.io/locations/';
        const jsonUrl = '/complete.json';
        const url = baseUrl + stateName + jsonUrl;
        try {
            const {data: state} = await axios.get(url);
            const redisStorage = JSON.stringify(state);
            await client.setAsync(`testing/${stateName}`, redisStorage);
            await client.expireAsync(`testing/${stateName}`, 604800);//I set it to expire in a week, but honestly, it'll never change, this api hasn't changed in 8 months
            return state;
        } catch (e) {
            console.log(e);
            throw EvalError("Something went wrong with either Axios or redis");
        }
    }

}

async function getTestHospital(stateName, hospitalId) {
    /// don't even need to perform a query, just use the already cached state data
    if(!validStates.includes(stateName)) throw SyntaxError("Not a valid stateName!");
    if(!hospitalId.match(/^([1-3]?[0-9])$/)) throw RangeError("hospital Ids, as a rule can only be a number in the range of 0-39");
    let stateCacheExists = await client.existsAsync(`testing/${stateName}`);
    let state;
    if(stateCacheExists){
        state = await client.getAsync(`testing/${stateName}`);
        state = JSON.parse(state);
    }else{
        state = await getTestState(stateName);
    }
    for (const item of state){
        if(item.id === hospitalId){
            return item;
        }
    };
    throw SyntaxError("Not an existing hospital Id for this state");
    
}

module.exports = {
    getTestState,
    getTestHospital,
};