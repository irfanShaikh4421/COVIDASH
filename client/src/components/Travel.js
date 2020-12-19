import React, { useState, useEffect, useContext } from 'react';
import countriesList from '../data/geoData.json';
import countryIndexer from '../data/countries-iso2.json';
import { LocationContext } from '../LocationContext';
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';
import { Select, Typography, Card } from 'antd';

//const headers = { Authorization: `Bearer stevens85452525` };
const iso2Indexer = [4,248,8,12,16,20,24,660,10,28,32,51,533,36,40,31,44,48,50,52,112,56,84,204,60,64,68,535,70,72,74,76,86,96,100,854,108,132,116,120,124,136,140,148,152,156,162,166,170,174,178,180,184,188,384,191,192,531,196,203,208,262,212,214,218,818,222,226,232,233,748,231,238,234,242,246,250,254,258,260,266,270,268,276,288,292,300,304,308,312,316,320,831,324,624,328,332,334,336,340,344,348,352,356,360,364,368,372,833,376,380,388,392,832,400,398,404,296,408,410,414,417,418,428,422,426,430,434,438,440,442,446,450,454,458,462,466,470,584,474,478,480,175,484,583,498,492,496,499,500,504,508,104,516,520,524,528,540,554,558,562,566,570,574,807,580,578,512,586,585,275,591,598,600,604,608,612,616,620,630,634,638,642,643,646,652,654,659,662,663,666,670,882,674,678,682,686,688,690,694,702,534,703,705,90,706,710,239,728,724,144,729,740,744,752,756,760,158,762,834,764,626,768,772,776,780,788,792,795,796,798,800,804,784,826,840,581,858,860,548,862,704,92,850,876,732,887,894,716];
const validIso2 = ["PT","PW","PY","QA","AD","AE","AF","AG","AI","AL","AM","AO","AR","AT","AU","AW","AX","AZ","RO","BA","BB","RS","BD","RU","BE","BF","RW","BG","BH","BI","BJ","BL","BN","BO","SA","SB","SC","BR","BS","SD","BT","SE","SG","BW","SH","SI","BY","SJ","SK","BZ","SL","SN","SO","CA","SR","SS","CC","CD","ST","SV","CF","CG","CH","SX","SY","CI","SZ","CK","CL","CM","CN","CO","CR","TC","TD","CU","CV","TG","CW","TH","CX","CY","TJ","CZ","TL","TM","TN","TO","TR","TT","DE","TV","TW","TZ","DJ","DK","DM","DO","UA","UG","DZ","EC","US","EE","EG","UY","UZ","ER","VC","ES","VE","ET","VG","VN","VU","FI","FJ","FK","FM","FO","FR","WF","GA","GB","WS","GD","GE","GG","GH","GI","GL","GM","GN","GQ","GR","GT","GW","GY","XK","HK","HN","HR","YE","HT","HU","ID","IE","IL","IM","IN","ZA","IQ","IR","IS","IT","ZM","JE","ZW","JM","JO","JP","KE","KG","KH","KI","KM","KN","KP","KR","KW","KY","KZ","LA","LB","LC","LK","LR","LS","LT","LU","LV","LY","MA","MC","MD","ME","MF","MG","MH","MK","ML","MM","MN","MR","MT","MU","MV","MW","MX","MY","MZ","NA","NC","NE","NF","NG","NI","NL","NO","NP","NR","NU","NZ","OM","PA","PE","PF","PG","PH","PK","PL","PM"];
const locationsNotInGeoData = [60,535,254,312,336,438,446,474,175,500,275,638,674,732]; 

///took me way too long to get these, but they are important for error checking
/**
 * I had to find all iso2 values of countries.json by comparing (the string version of its) _id's with countries-iso2.json's country-codes and retrieving their corresponding alpha-2's
 * Then check which of those iso2 values where not also contained in geoData's values
 * then convert the missing iso2 values back into their equivalent integer value of countries.json's _ids
 * And several similar other tests (not mentioned here).
 *
 * Fun Fact: exluding 0, every _id integer in countries.json has an equivalent country-code string in countries-iso2.json!
 * so, with a bit of work, countries.json is essentially a child table of countries-iso2.json (which is part of the reason)
 *
 * Turns out that even with all that, some of the json data simply don't match eachother perfectly (see id 535), but they are close enough (difference is negligible, out of like 30 tests, I only found 535, & that was going to be an error case anyway), so I'm going to let it slide.
 */

const Travel = () => {
	const [location] = useContext(LocationContext);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [countryData, setCountryData] = useState(null);
	const { Option } = Select;
	const { Title } = Typography;

	const options = countriesList.map((k, i) => (
		<Option key={i} value={k.value}>
			{k.name}
		</Option>
	));

	function findCountry(countryId) {
		//countryID should be passed as location context.countryCode
		let countryIndex = null;
		countryIndex = iso2Indexer.indexOf(countryId); //getting the index of the Iso2 in iso2.json using countryId
		countryIndex = countryIndex === -1 ? 235 : countryIndex; //If countryIndex was not found in Indexer, default to the 235th entry (840/USA's index) (will only happen if location.countryCode===0)
		countryIndex = countryIndexer[countryIndex]['alpha-2']; //gets the Iso2 from iso2.json
		countryIndex = validIso2.indexOf(countryIndex); //finds the index of the corresponding country entry in geoData
		countryIndex = countryIndex === -1 ? 102 : countryIndex; //If the iso2 from iso2.json is not in the geoData, then default to the 102nd entry(102/US's index)
		return validIso2[countryIndex]; //returns the iso2 of the country in geoData
	}
	const [country, setCountry] = useState(findCountry(location.countryCode));

	function handleSelect(value) {
		setCountry(value);
	}

	useEffect(() => {
		async function grabRegulation(arg) {
			setError(undefined);
			console.log(`${arg} grabRegulation Fired`);
			try {
				setLoading(true);
				/*let {
                    data,
                } = await axios.get(
                    `https://prod.greatescape.co/api/travel/countries/${arg}/corona`,
                    { headers }
                );*/
				const { data } = await axios.get(`/travel/${arg}`);
				setLoading(false);
				setCountryData(data);
			} catch (e) {
				setError(e);
			}
		}
		grabRegulation(country);
	}, [country]);

	if (error) return <span className="error-text">ERROR: {error}.</span>;

	return (
		<div>
			<Title>Travel regulations</Title>
			<span className="sub-heading margin-small-bottom">
				Source:&nbsp;
				<a
					target="blank"
					href="https://www.notion.so/Covid-19-travel-restrictions-and-lockdown-measures-API-fc88674524014137aaae96a11ece0040"
					className="color-blue"
				>
					Travel API
				</a>
			</span>
			<label>
				Select country&nbsp;
				<Select
					showSearch
					style={{ width: 300 }}
					placeholder={country ? country : 'select country'}
					optionFilterProp="children"
					onChange={handleSelect}
					value={country}
					filterOption={(input, option) =>
						option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}
				>
					{options}
				</Select>
			</label>
			{country === 'US' &&
			locationsNotInGeoData.indexOf(location.countryCode) !== -1 ? (
				<span className="symptom-header color-gray">
					Travel Regulations for User's Preferred Country were not found,
					defaulted to United States.
				</span>
			) : null}
			{loading ? <LoadingOutlined className="loader block" /> : null}
			{!loading && countryData ? (
				<Card className="travel-card flex-column-center">
					<span className="heading block">{countryData.name}</span>
					<img
						src={`https://flagcdn.com/h240/${country.toLowerCase()}.png`}
						alt={`${countryData.name}'s Flag`}
						className="country-flag"
					/>
					<span className="sub-heading">Lockdown status:</span>
					<span className="sub-info-small">
						{countryData.lockdownInfo.lockdown}
					</span>
					<span className="sub-heading">Tourists status:</span>
					<span className="sub-info-small">
						{countryData.lockdownInfo.touristEntry}
					</span>
					<span className="sub-heading">Event Info:</span>
					<span className="sub-info-small">
						{countryData.lockdownInfo.events}
					</span>
					<span className="sub-heading">Tourist Attractions:</span>
					<span className="sub-info-small">
						{countryData.lockdownInfo.touristAttractions}
					</span>
					<span className="sub-heading">Details:</span>
					<span className="card-body">{countryData.lockdownInfo.details}</span>
					<span className="sub-heading">Tourist Info:</span>
					<span className="card-body">
						{countryData.lockdownInfo.touristInfo}
					</span>
				</Card>
			) : null}
		</div>
	);
};

export default Travel;
