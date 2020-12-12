const axios = require('axios');
const bluebird = require('bluebird');
const redis = require('redis');

const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

function isUser(userObject){
    console.log("IN USERS.js DATA file on the server, need to update images type check for imageMagick");
    return ((typeof userObject === "object") &&
    //(typeof userObject.userName === "string") &&
    ((typeof userObject.countryCode === "number") && (userObject.countryCode >=0)) &&///a number Identifying the user's country, for countries-iso2.json and countries.json, which can then be used to get keys for countriesGeo and geoData
    true)//IMAGE MAGICK TYPE CHECK GOES HERE)
}

async function getUser(userId) {
    let user = await client.getAsync(userId);//user ID comes from firebase
    if(user){
        user = JSON.parse(user);
        return user;
    }else throw ReferenceError("User with that ID Not Found");
}

async function createUser(userId/*, userName*/) {//run on Register, and on sign in from a 3rd- party firebase service (like google or facebook)
    let user = await client.getAsync(userId);///checks if user exists yet
    if(user){//this will happen on repeated login to a third-party
        return JSON.parse(user);
    }else{//when you are registering a new account
        user = {//creates a default user account, no country selected yet
  //          userName: userName,
            countryCode: 0,
            image: 'https://raw.githubusercontent.com/disease-sh/API/master/public/assets/img/virus.png'
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
        await client.msetAsync(userId, updatedUser);
        return userObject;
    }else throw ReferenceError("User Id not found on server");
}

module.exports = {
    isUser,
    getUser,
    createUser,
    updateUser,
};