import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../App.css';
import flagUN from './../img/unitedNationsFlag.png';
import allCountries from '../data/countries.json';
import allStates from '../data/usStates.json';
import { LocationContext } from '../LocationContext';
import Charts from './Charts';

const Statistics = () => {
    const regexCommaNumbers = /\B(?=(\d{3})+(?!\d))/g; //from stackoverflow

    const buildDisplay = (region, loading, chartArr, chartDataFound) => {
        return (
            <div>
                {loading ? (
                    <p>loading...</p>
                ) : (
                    <div>
                        <h1
                            className={
                                region && region.continent && 'titleOfSubtitle'
                            }
                        >
                            {(region && region.country) ||
                                (region && region.state) ||
                                'World'}
                        </h1>
                        {region && region.continent ? (
                            <h2 className="subtitle">{region.continent}</h2>
                        ) : null}
                        {region && region.population ? (
                            <p>
                                Population:{' '}
                                {region.population
                                    .toString()
                                    .replace(regexCommaNumbers, ',')}
                                .
                            </p>
                        ) : null}
                        {region && region.active ? (
                            <p>
                                {region.active
                                    .toString()
                                    .replace(regexCommaNumbers, ',')}{' '}
                                currently infected. &nbsp;
                                {region &&
                                (region.critical || region.critical === 0) ? (
                                    `${region.critical
                                        .toString()
                                        .replace(
                                            regexCommaNumbers,
                                            ','
                                        )} in critical condition.`
                                ) : (
                                    <></>
                                )}
                            </p>
                        ) : null}
                        {region &&
                        region.countryInfo &&
                        region.countryInfo.flag ? (
                            <img
                                src={region.countryInfo.flag}
                                alt="No Country Flag Found"
                                title="Sourced from disease.sh, maybe do something with imagemagick"
                            />
                        ) : (
                            !(region && region.state) && (
                                <img
                                    src={flagUN}
                                    alt="No flag found"
                                    title="United Nations Flag"
                                />
                            )
                        )}
                        {region && !region.state ? <hr /> : null}
                        {region && region.tests ? (
                            <div>
                                {region.tests
                                    .toString()
                                    .replace(regexCommaNumbers, ',')}
                                &nbsp;People have been tested for Covid.
                            </div>
                        ) : null}

                        {(region &&
                            region.state &&
                            region.recovered) ? (
                                <div>
                                    {region.recovered
                                        .toString()
                                        .replace(regexCommaNumbers, ',')}
                                    &nbsp;People have recovered from Covid.
                                </div> /**States don't have critical field, nor the daily recoveries, but they do contain overall recoveries*/
                            ) : chartDataFound ? null : <p>No Historical Chart data found for this country, displaying relevant data table instead.</p>}
                        {chartArr && chartDataFound ? 
                        <Charts chartArr={chartArr} dataFound={chartDataFound} /> :
                        <table>
                            <thead>
                                <tr>
                                    <th />
                                    <th>Today</th>
                                    <th>Overall</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Deaths</th>
                                    <td>
                                        {region.todayDeaths
                                            .toString()
                                            .replace(regexCommaNumbers, ',')}
                                    </td>
                                    <td>
                                        {region.deaths
                                            .toString()
                                            .replace(regexCommaNumbers, ',')}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Cases Contracted</th>
                                    <td>
                                        {region.todayCases
                                            .toString()
                                            .replace(regexCommaNumbers, ',')}
                                    </td>
                                    <td>
                                        {region.cases
                                            .toString()
                                            .replace(regexCommaNumbers, ',')}
                                    </td>
                                </tr>
                                {!(region && region.state) ? (
                                    <tr>
                                        <th>Recoveries</th>
                                        <td>
                                            {region.todayRecovered
                                                .toString()
                                                .replace(
                                                    regexCommaNumbers,
                                                    ','
                                                )}
                                        </td>
                                        <td>
                                            {region.recovered
                                                .toString()
                                                .replace(
                                                    regexCommaNumbers,
                                                    ','
                                                )}
                                        </td>
                                    </tr>
                                ) : (
                                    <></>
                                )}
                            </tbody>
                        </table>}
                        <br />

                        <hr />
                        <footer className="casesTracking">
                            {region && region.updated && (
                                <div>
                                    Data last updated: &nbsp;
                                    {new Date(region.updated).toLocaleString(
                                        'en-US'
                                    )}
                                    .
                                    <br /> <br />
                                </div>
                            )}
                            <a className="tota11yLink" href="https://disease.sh/">disease.sh</a>
                        </footer>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div>
            <GetCountry
                buildCountry= {buildDisplay}
            />
        </div>
    );
};



const GetState = ({ buildState }) => {
    const [ location ] = useContext(LocationContext);
    const stateIndex = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
    const [state, setState] = useState(allStates[stateIndex.indexOf(location.state)].name);
    const [stateData, setStateData] = useState(undefined);
    const [loading, setLoading] = useState(true);

    const stateDropDown = allStates.map((entry, index) => (
        <option key={index} value={entry.name}>
            {entry.name}
        </option>
    ));

    
    useEffect(() => {
        console.log('get state useeffect fired');
        async function fetchData() {
            try {
                setLoading(true);
                const { data: State } = await axios.get(
                    `https://disease.sh/v3/covid-19/states/${state}`
                );
                setStateData(State);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        }
        if (state) {
            fetchData();
        }
    }, [state]);

    function handleSelect(e) {
        setState(e.target.value);
        console.log(`State selected: ${e.target.value} `);
    }

    return (
        <div>
            {' '}
            <br /> <hr />
            <select defaultValue={state} onChange={handleSelect}>{stateDropDown}</select>
            {!loading && buildState(stateData, loading)}
        </div>
    );
};

const GetCountry = ({ buildCountry }) => {
    const [ location ] = useContext(LocationContext);
    const [loading, setLoading] = useState(true);
   
    /*function findIso3(targetValue) {
        if (targetValue > 0) {
            for(let i = 0; i<allCountries.length; i++) {
                if(allCountries[i]._id === targetValue){
                    return allCountries[i].iso3;
                }
            }
        }
        return "";
    }
    const defaultCountry = findIso3(location.countryCode);*/

    const [country, setCountry] = useState(location.countryCode);
    const [countryData, setCountryData] = useState(undefined);
    const [ chartArr, setChartArr ] = useState([]);
    const [ chartDataFound, setDataFound ] = useState(true);
    let display;

    useEffect(
        () => {
            async function getStatsData() {
                try {
                    setLoading(true);
                    //setShowWorldData(false);
                    //console.log(`iso3 in fetch country: ${country || "Planet Earth"}`);
                    if(country){
                        const { data: Country } = await axios.get(
                            `https://disease.sh/v3/covid-19/countries/${country}`
                        );
                        console.log(`recieved ${country} data from getCountry useEffect`);
                        //console.log(JSON.stringify(Country));
                        setCountryData(Country);
                        setLoading(false);
                    }else{
                        const { data: World } = await axios.get(
                            `https://disease.sh/v3/covid-19/all`
                        );
                        console.log('recieved world data from getCountry useEffect');
                        //console.log(JSON.stringify(World));
                        setCountryData(World);
                        setLoading(false);
                    }
                } catch (e) {
                    console.log(e);
                }
            }

            async function getChartData(countryNumber) {
                const url = `https://disease.sh/v3/covid-19/historical/${countryNumber}?lastdays=all`;
                try{
                    const { data } = await axios.get(url);
                    console.log(data);
                    if(data && data.message) throw EvalError("No recent historical data found for this country. Displaying world data instead.");
                    
                    let keys, casesValues, deathsValues, recoveredValues;
                    if(countryNumber !== 'all'){
                        keys = Object.keys(data.timeline.cases);
                        casesValues = Object.values(
                            data.timeline.cases
                        );
                        deathsValues = Object.values(
                            data.timeline.deaths
                        );
                        recoveredValues = Object.values(
                            data.timeline.recovered
                        );
                    }else{//world
                        keys = Object.keys(data.cases);
                        casesValues = Object.values(data.cases);
                        deathsValues = Object.values(data.deaths);
                        recoveredValues = Object.values(data.recovered);
                    }
                    
                    const chartArr = [];
    
                    for (let i = 0; i < keys.length; i++) {
                        const chartObj = {
                            date: keys[i],
                            cases: casesValues[i],
                            deaths: deathsValues[i],
                            recovered: recoveredValues[i],
                        };
                        chartArr.push(chartObj);
                    }
    
                    setChartArr(chartArr);
                }catch(e) {
                    console.log(e);
                    setDataFound(false);
                    //getChartData('all');
                }
            }

            if (typeof country === "number") {
                getStatsData();
            }
            console.log(country)
            if(country) {
                setDataFound(true);
                getChartData(country);
            } else {
                setDataFound(true);
                getChartData('all');
            }
        }, 
        [country]
    );

    const handleChange = (e) => {
        const defaultValue = parseInt(e.target.value);
        setCountry(defaultValue);
    };

    if(loading){
        return <p>Loading Country data...</p>
    }else {
        display = countryData && buildCountry(countryData, false, chartArr, chartDataFound);
    }

    //modified to match Travel.js' dropdown
    const countryDropDown = allCountries.map((entry) => (
        <option key={entry._id} value={entry._id}>
            {entry.country}
        </option>
    ));

    return (
        <div>
            <form
                method="POST"
                name="searchFrom"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <label>
                    Get Location Specific Data: &nbsp;
                    <select value={country} onChange={handleChange}>{countryDropDown}</select>
                </label>
            </form>
            {display}
            {countryData &&
                countryData.countryInfo &&
                countryData.countryInfo._id === 840 /**America */ && (
                    <GetState buildState={buildCountry} />
            )}
        </div>
    );
};

export default Statistics;
