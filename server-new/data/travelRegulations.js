const axios = require('axios');
const bluebird = require('bluebird');
const redis = require('redis');

const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const geoDataIso = ['PT', 'PW', 'PY', 'QA', 'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AR', 'AT', 'AU', 'AW', 'AX', 'AZ', 'RO', 'BA', 'BB', 'RS', 'BD', 'RU', 'BE', 'BF', 'RW', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BN', 'BO', 'SA', 'SB', 'SC', 'BR', 'BS', 'SD', 'BT', 'SE', 'SG', 'BW', 'SH', 'SI', 'BY', 'SJ', 'SK', 'BZ', 'SL', 'SN', 'SO', 'CA', 'SR', 'SS', 'CC', 'CD', 'ST', 'SV', 'CF', 'CG', 'CH', 'SX', 'SY', 'CI', 'SZ', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'TC', 'TD', 'CU', 'CV', 'TG', 'CW', 'TH', 'CX', 'CY', 'TJ', 'CZ', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'DE', 'TV', 'TW', 'TZ', 'DJ', 'DK', 'DM', 'DO', 'UA', 'UG', 'DZ', 'EC', 'US', 'EE', 'EG', 'UY', 'UZ', 'ER', 'VC', 'ES', 'VE', 'ET', 'VG', 'VN', 'VU', 'FI', 'FJ', 'FK', 'FM', 'FO', 'FR', 'WF', 'GA', 'GB', 'WS', 'GD', 'GE', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GQ', 'GR', 'GT', 'GW', 'GY', 'XK', 'HK', 'HN', 'HR', 'YE', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'ZA', 'IQ', 'IR', 'IS', 'IT', 'ZM', 'JE', 'ZW', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KP', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MH', 'MK', 'ML', 'MM', 'MN', 'MR', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM'];

async function getRegulations(iso2) {
    if(!iso2.match(/^([A-Z][A-Z])$/)) throw SyntaxError("Country param must be a valid iso2 (Two uppercase letters)");
    if(!geoDataIso.includes(iso2)) throw ReferenceError("Country Iso-2 not found in geoData");
    let regulationsCacheExists = await client.existsAsync(`regulations/${iso2}`);
    if(regulationsCacheExists) {
        let regulations = await client.getAsync(`regulations/${iso2}`);
        regulations = JSON.parse(regulations);
        return regulations;
    }else {
        try{
            let {data} = await axios.get(
                `https://prod.greatescape.co/api/travel/countries/${iso2}/corona`,
                {headers: { Authorization: `Bearer stevens85452525` }});
            await client.setAsync(`regulations/${iso2}`, JSON.stringify(data));
            await client.expireAsync(`regulations/${iso2}`,3600);//1 hour, this api can update fairly often (last update was yesterday)
            return data;
        }catch(e){
            console.log(e);
            throw EvalError("Something went wrong with axios or redis")
        }
    }
};

module.exports = {
    getRegulations,
}