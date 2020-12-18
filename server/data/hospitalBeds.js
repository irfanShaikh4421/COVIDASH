const axios = require('axios');
const bluebird = require('bluebird');
const redis = require('redis');

const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const stateNames = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', "District of Columbia", "Puerto Rico"];

async function cacheStateBeds(data){
    console.log('caching all states beds');
    for (let i = 0; i < data.features.length; i++) {
        if(data.features[i].properties.STATE_NAME){//avoids the nulls
            await client.sadd(`hospitalBeds/${data.features[i].properties.STATE_NAME}`,JSON.stringify(data.features[i].properties));
        }
    }
    for (let i = 0; i<stateNames.length; i++){
        await client.expireAsync(`hospitalBeds/${stateNames[i]}`, 3600);
    }
    console.log('Cached all states beds');
}

async function getStateBeds(stateName) {
    if(!stateNames.includes(stateName)) throw SyntaxError("invalid State Name param");

    let stateHospitalCacheExists = await client.existsAsync(`hospitalBeds/${stateName}`);

    if(stateHospitalCacheExists){
        console.log(`get ${stateName} hospital beds from cache`);
        let stateHospitalBeds = await client.smembersAsync(`hospitalBeds/${stateName}`);
        let response = new Array();
        for(let i=0; i<stateHospitalBeds.length; i++){
            response.push(JSON.parse(stateHospitalBeds[i]));
        }
        return response;
    }else {
        console.log(`get all hospital beds from source`);
        const url = 'https://opendata.arcgis.com/datasets/1044bb19da8d4dbfb6a96eb1b4ebf629_0.geojson';
        const { data } = await axios.get(url);
        return {source: data};
    }
}

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
    getStateBeds,
    cacheStateBeds,
}