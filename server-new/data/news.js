const axios = require('axios');
const bluebird = require('bluebird');
const redis = require('redis');
const flat = require('flat');
const unflatten = flat.unflatten;

const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let availableCountries = [
    'ae',
    'ar',
    'at',
    'au',
    'be',
    'bg',
    'br',
    'ca',
    'ch',
    'cn',
    'co',
    'cu',
    'cz',
    'de',
    'eg',
    'fr',
    'gb',
    'gr',
    'hk',
    'hu',
    'id',
    'ie',
    'il',
    'in',
    'it',
    'jp',
    'kr',
    'lt',
    'lv',
    'ma',
    'mx',
    'my',
    'ng',
    'nl',
    'no',
    'nz',
    'ph',
    'pl',
    'pt',
    'ro',
    'rs',
    'ru',
    'sa',
    'se',
    'sg',
    'si',
    'sk',
    'th',
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

    const apiKey = 'apiKey=ec4091ce10534690baa4b9f4d5ba7af2';

    const url = baseUrl + '?' + q + '&country=' + countryParam + '&' + apiKey;

    let response;
    let data;
    let news = new Array();

    if (availableCountries.includes(countryParam)) {
        try {
            let countryCacheExists = await client.existsAsync(countryParam);
            if (countryCacheExists) {
                console.log(`from ${countryParam} cache`);
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
                console.log(`not from ${countryParam} cache`);
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
                    await client.saddAsync(countryParam, news[i].url);
                }

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
            }
        } catch (e) {
            console.log(e);
        }
    } else {
        try {
            let worldCacheExists = await client.existsAsync('world');
            if (worldCacheExists) {
                console.log('from world cache');
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
                console.log('not from world cache');
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
                    await client.saddAsync('world', news[i].url);
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
