import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../App.css';
import flagUN from './../img/unitedNationsFlag.png';
import allCountries from '../data/countries.json';

const Statistics = () => {
    const [ countryData, setCountryData] = useState(undefined);
    const [ worldData, setWorldData ] = useState(undefined);
    const [ showWorldData, setShowWorldData] = useState(true);
    const [ loading, setLoading ] = useState(true);
    let display = null;
    const regexCommaNumbers = /\B(?=(\d{3})+(?!\d))/g;//from stackoverflow

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
                    <h2 className={region && region.continent && "titleOfSubtitle"}>{(region && region.country) || "World"}</h2>
                    {region && region.continent && <h3 className="subtitle">{region.continent}</h3> }
                    {region && region.population && <p >Population: {region.population.toString().replace(regexCommaNumbers, ",")}.</p>}
                    <p>{region.active.toString().replace(regexCommaNumbers, ",")} currently infected. &nbsp;
                    {region.critical.toString().replace(regexCommaNumbers, ",")} in critical condition.</p>
                    {region && region.countryInfo && region.countryInfo.flag ? <img src={region.countryInfo.flag} alt="No Country Flag Found" title="Sourced from disease.sh, maybe do something with imagemagick" /> : <img src={flagUN} alt="No flag found" title="United Nations Flag" /> }
                    <hr />
                {region && region.tests && <div>{region.tests.toString().replace(regexCommaNumbers, ",")}&nbsp;People have been tested for Covid.</div> }
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
                                <td>{region.todayDeaths.toString().replace(regexCommaNumbers, ",")}</td>
                                <td>{region.deaths.toString().replace(regexCommaNumbers, ",")}</td>
                            </tr>
                            <tr>
                                <th>Cases Contracted</th>
                                <td>{region.todayCases.toString().replace(regexCommaNumbers, ",")}</td>
                                <td>{region.cases.toString().replace(regexCommaNumbers, ",")}</td>
                            </tr>
                            <tr>
                                <th>Recoveries</th>
                                <td>{region.todayRecovered.toString().replace(regexCommaNumbers, ",")}</td>
                                <td>{region.recovered.toString().replace(regexCommaNumbers, ",")}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    
                    <hr />
                    <footer className="casesTracking">{region && region.updated && <div>Data last updated: &nbsp; 
                    {new Date(region.updated).toLocaleString('en-US')//Should we allow for other formats?
                }.
                    <br /> <br /></div> }
                    <Link className="tota11yLink" to="./sources">View Data Sources</Link></footer>
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

const GetCountry = ({setSearch, setLoading, setShowWorldData}) => {
    const [ country, setCountry ] = useState("");

    useEffect(() => {
            console.log(`getCountry useEffect fired ${country}`);
            async function fetchData() {
                try {
                    setLoading(true);
                    setShowWorldData(false);
                    console.log(`iso3 in fetch country: ${country}`);
                    const { data: Country } = await axios.get(`https://disease.sh/v3/covid-19/countries/${country}`);
                    setSearch(Country);
                    setLoading(false);
                } catch (e) {
                    console.log(e);
                }
            }

            if (country) {
                fetchData();
            }
        },//fires every time the country iso3 changes
        [ country, setLoading, setSearch, setShowWorldData ]//these "sets" are just passed in from parent component
    );

    const handleChange= async (e) =>{
        if(e.target.value){
            setCountry(e.target.value);
        }else{
            setShowWorldData(true);
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
                Get Specific Country Data: &nbsp;
                <select onChange={handleChange}>
                    {countryDropDown}
                </select>
            </label>
        </form>
    );
};

export default Statistics;