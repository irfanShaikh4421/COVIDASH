import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../App.css';
import flagUN from './../img/unitedNationsFlag.png';
import allCountries from '../data/countries.json';

const Statistics = (props) => {
    const [ countryData, setCountryData] = useState(undefined);
    const [ worldData, setWorldData ] = useState(undefined);
    const [ showWorldData, setShowWorldData] = useState(true);
    const [ loading, setLoading ] = useState(true);
    let display = null;

    useEffect(() => {
        console.log('Statistics world data useEffect fired');
        async function fetchWorld() {
            try {
                setLoading(true);
                const { data: World } = await axios.get(`https://disease.sh/v3/covid-19/all`);
                setWorldData(World);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        }
       fetchWorld();
    },
    [ ]//fires on page load
);

    const setSearch = async (newData) => {
        console.log('recieved data from getCountry');
        console.log(JSON.stringify(newData));
        setCountryData(newData);
    }

    const buildDisplay = (region) => {
        return (
            <div>
                {loading ? 
                <p>loading...</p> : 
                <div>
                    <h2>{(region && region.country) || "World"}</h2>
                    <p>{region.active} currently infected. {region.critical} in critical condition.</p>
                    {region && region.countryInfo && region.countryInfo.flag ? <img src={region.countryInfo.flag} alt="No Country Flag Found" title="Sourced from disease.sh, maybe do something with imagemagick" /> : <img src={flagUN} alt="No flag found" title="United Nations Flag" /> }
                    <hr />
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
                                <td>{region.todayDeaths}</td>
                                <td>{region.deaths}</td>
                            </tr>
                            <tr>
                                <th>Cases Contracted</th>
                                <td>{region.todayCases}</td>
                                <td>{region.cases}</td>
                            </tr>
                            <tr>
                                <th>Recoveries</th>
                                <td>{region.todayRecovered}</td>
                                <td>{region.recovered}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    
                    <hr />
                    
                </div>
            }
            </div>
        );
    }
    if(loading){
        return (loading);
    }else if(showWorldData){
        display = worldData && buildDisplay(worldData);
    }else{
        display = countryData && buildDisplay(countryData);
    }

    return (
        <div>
            <GetCountry setSearch={setSearch} setShowWorldData={setShowWorldData} setLoading={setLoading}/>
            {display}
        </div>
    );
}

const countryDropDown = allCountries.map((entry) => {
    return <option key={entry._id} value={entry.iso3}>{entry.country}</option>
});

const GetCountry = (props) => {
    const [ country, setCountry ] = useState("");

    useEffect(() => {
            console.log(`getCountry useEffect fired ${country}`);
            async function fetchData() {
                try {
                    props.setLoading(true);
                    props.setShowWorldData(false);
                    console.log(`iso3 in fetch country: ${country}`);
                    const { data: Country } = await axios.get(`https://disease.sh/v3/covid-19/countries/${country}`);
                    props.setSearch(Country);
                    props.setLoading(false);
                } catch (e) {
                    console.log(e);
                }
            }

            if (country) {
                fetchData();
            }
        },
        [ country ]//fires every time the country iso3 changes
    );

    const handleChange= async (e) =>{
        if(e.target.value){
            setCountry(e.target.value);
        }else{
            props.setShowWorldData(true);
        }
    };

    return(
        <form 
            method="POST" 
            name="searchFrom"
            onSubmit={(e) => {
				e.preventDefault();
			}}>
            <label>
                Get Specific Country Data: 
                <select onChange={handleChange}>
                    {countryDropDown}
                </select>
            </label>
            <input type="submit" value="Submit"/>
        </form>
    );
};

export default Statistics;