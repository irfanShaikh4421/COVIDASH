const bluebird = require('bluebird');
const redis = require('redis');

const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

function isUser(userObject){
    return ((typeof userObject === "object") && 
    (typeof userObject.state === "string") && (userObject.state.length === 2) && userObject.state.match(/^([A-W][A-Z])$/) && states.includes(userObject.state) && //some of these are redundant. But, its better to be over-prepared than under-prepared
    ((typeof userObject.countryCode === "number") && (userObject.countryCode >=0) && userObject.countryCode < 1000) ///a number Identifying the user's country, for countries-iso2.json and countries.json, which can then be used to get keys for countriesGeo and geoData
    );
}

async function getUser(userId) {
    let user = await client.getAsync(userId);//user ID comes from firebase
    if(user){
        user = JSON.parse(user);
        return user;
    }else throw ReferenceError("User with that ID Not Found");
}

async function createUser(userId) {//run on Register, and on sign in from a 3rd- party firebase service (like google or facebook)
    let user = await client.getAsync(userId);///checks if user exists yet
    if(user){//this will happen on repeat login
        return JSON.parse(user);
    }else{//when you are registering a new account
        user = {//creates a default user account, no country selected yet
            countryCode: 0,
            state: "AL"
        }
        let redisUser = JSON.stringify(user);
        await client.setAsync(userId, redisUser);
        return user;
    }
}

async function updateUser(userId, userObject){
    let user = await client.getAsync(userId);
    if(user){
        updatedUser = JSON.stringify(userObject);
        await client.setAsync(userId, updatedUser);
        return userObject;
    }else throw ReferenceError("User Id not found on server");
}

module.exports = {
    isUser,
    getUser,
    createUser,
    updateUser,
};