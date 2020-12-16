const axios = require('axios');
const bluebird = require('bluebird');
const redis = require('redis');
const flat = require('flat');
const unflatten = flat.unflatten;

const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let availableCountries = [
    'ae',//
    'ar',
    'at',
    'au',
    'be',
    'bg',
    'br',
    'ca',
    'ch',//
    'cn',//
    'co',
    'cu',
    'cz',
    'de',//
    'eg',//
    'fr',
    'gb',
    'gr',
    'hk',//
    'hu',
    'id',
    'ie',
    'il',//
    'in',
    'it',
    'jp',//
    'kr',//
    'lt',
    'lv',
    'ma',
    'mx',
    'my',
    'ng',
    'nl',//
    'no',//
    'nz',
    'ph',
    'pl',
    'pt',
    'ro',
    'rs',//
    'ru',
    'sa',
    'se',
    'sg',
    'si',
    'sk',
    'th',//
    'tr',
    'tw',
    'ua',
    'us',
    've',
    'za',
];

async function getNews(country) {
    const baseUrl = 'https://newsapi.org/v2/top-headlines';

    const q = 'q=covid';

    let countryParam;
    if (country) {
        countryParam = country.toString().toLowerCase();
    }

    let apiKey;
    console.log(countryParam);
    if(countryParam.match(/^([a-k].*)$/)){
        console.log(1);
        apiKey = 'apiKey=ec4091ce10534690baa4b9f4d5ba7af2';
    }else {
        console.log(2);
        apiKey = 'apiKey=5de6e6f3a0a8454aaaba6702acd74d00';
    }

    const url = baseUrl + '?' + q + '&country=' + countryParam + '&' + apiKey;

    let response;
    let data;
    let news = new Array();

    let validCountry = availableCountries.includes(countryParam);
    let countryCacheExists;

    if (validCountry){
        countryCacheExists = await client.existsAsync(countryParam);
        if (countryCacheExists) {
            let newsIds = await client.smembersAsync(countryParam);
            if(newsIds.length===1 && (newsIds[0]==="no data")) {
                validCountry= false;
            }
        }
    }

    if (validCountry) {
        try {
            //let countryCacheExists = await client.existsAsync(countryParam);
            if (countryCacheExists) {
                console.log(`from ${countryParam} news cache`);
                let showNews = new Array();
                let newsIds = await client.smembersAsync(countryParam);

                for (let i = 0; i < newsIds.length; i++) {
                    let indiNewsObj = await client.hgetallAsync(newsIds[i]);
                    let unflatIndiNewsObj = unflatten(indiNewsObj);
                    showNews.push(unflatIndiNewsObj);
                }

                let newsObj = {
                    tailored: true,
                    news: showNews,
                };

                return newsObj;
            } else {
                console.log(`not from ${countryParam} news cache`);
                response = await axios.get(url);
                data = response.data.articles;
                for (let i = 0; i < data.length; i++) {
                    news.push(flat(data[i]));
                }

                for (let i = 0; i < news.length; i++) {
                    for (var member in news[i]) {
                        if (news[i][member] == null) news[i][member] = '';
                    }

                    await client.hmsetAsync(news[i].url, news[i]);
                    await client.expireAsync(news[i].url, 43200);
                    await client.saddAsync(countryParam, news[i].url);
                    await client.expireAsync(countryParam, 43200);
                }

                let showNews = new Array();
                let newsIds = await client.smembersAsync(countryParam);

                if (newsIds.length === 0 ) {
                    console.log(`no ${countryParam} news data, defaulting to world news`);
                    await client.saddAsync(countryParam, "no data");
                    await client.expireAsync(countryParam, 43200);
                    let newsObject = await getNews('aa');
                    return newsObject;
                }

                for (let i = 0; i < newsIds.length; i++) {
                    let indiNewsObj = await client.hgetallAsync(newsIds[i]);
                    let unflatIndiNewsObj = unflatten(indiNewsObj);
                    showNews.push(unflatIndiNewsObj);
                }

                let newsObj = {
                    tailored: true,
                    news: showNews,
                };

                return newsObj;
            }
        } catch (e) {
            console.log(e);
        }
    } else {
        try {
            let worldCacheExists = await client.existsAsync('world');
            if (worldCacheExists) {
                console.log('from world news cache');
                let showNews = new Array();
                let newsIds = await client.smembersAsync('world');

                for (let i = 0; i < newsIds.length; i++) {
                    let indiNewsObj = await client.hgetallAsync(newsIds[i]);
                    let unflatIndiNewsObj = unflatten(indiNewsObj);
                    showNews.push(unflatIndiNewsObj);
                }

                let newsObj = {
                    tailored: false,
                    news: showNews,
                };

                return newsObj;
            } else {
                console.log('not from world news cache');
                response = await axios.get(baseUrl + '?' + q + '&' + apiKey);
                data = response.data.articles;
                for (let i = 0; i < data.length; i++) {
                    news.push(flat(data[i]));
                }

                for (let i = 0; i < news.length; i++) {
                    for (var member in news[i]) {
                        if (news[i][member] == null) news[i][member] = '';
                    }
                    await client.hmsetAsync(news[i].url, news[i]);
                    await client.expireAsync(news[i].url, 3600);
                    await client.saddAsync('world', news[i].url);
                    await client.expireAsync('world', 3600);
                }

                let showNews = new Array();
                let newsIds = await client.smembersAsync('world');

                for (let i = 0; i < newsIds.length; i++) {
                    let indiNewsObj = await client.hgetallAsync(newsIds[i]);
                    let unflatIndiNewsObj = unflatten(indiNewsObj);
                    showNews.push(unflatIndiNewsObj);
                }

                let newsObj = {
                    tailored: false,
                    news: showNews,
                };

                return newsObj;
            }
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = {
    getNews,
};
