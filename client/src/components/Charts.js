import React from 'react';
//import axios from 'axios';
//import { LocationContext } from '../LocationContext';
//import allCountries from '../data/countries.json';
import '../App.css';
import {
    //LineChart,
    //Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    //Legend,
    AreaChart,
    //linearGradient,
    Area,
} from 'recharts';

function Charts(props) {
    const regexCommaNumbers = /\B(?=(\d{3})+(?!\d))/g; //from stackoverflow
    const { chartArr, dataFound } = props;

    //const [ location ] = useContext(LocationContext);
    //const [chartArr, setChartArr] = useState([]);
    //const [countriesData, setData] = useState([]);
    //const [countryIndex, setIndex] = useState(location.countryCode);
    //const [ dataFound, setDataFound ] = useState(true);

    /*useEffect(() => {
        async function getData(countryNumber) {
            //const url = 'https://disease.sh/v3/covid-19/historical';
            const url = `https://disease.sh/v3/covid-19/historical/${countryNumber}?lastdays=all`;
            try{
                const { data } = await axios.get(url);
                console.log(data);
                //setData(data);
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
                getData('all');
            }
        }
        
        if(regionCode) {
            setDataFound(true);
            getData(regionCode);
        } else {
            getData('all');
        }
    }, [regionCode]);*/

    const renderAreaChart = (
        <div className="chartDiv">
            <AreaChart
                width={800}
                height={280}
                data={chartArr}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="cases" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="orange" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="orange" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="deaths" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="red" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="red" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="recovered" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="green" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="green" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis width={100} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip formatter={(value) => {
                    return value.toString().replace(regexCommaNumbers, ',');
                }}/>
                <Area
                    type="monotone"
                    dataKey="cases"
                    stroke="orange"
                    fillOpacity={1}
                    fill="url(#cases)"
                />
                <Area
                    type="monotone"
                    dataKey="deaths"
                    stroke="red"
                    fillOpacity={1}
                    fill="url(#deaths)"
                />
                <Area
                    type="monotone"
                    dataKey="recovered"
                    stroke="green"
                    fillOpacity={1}
                    fill="url(#recovered)"
                />
            </AreaChart>
        </div>
    );

    /*const handleChange = (e) => {
        setIndex(parseInt(e.target.value));
    };*/
    console.log(dataFound);
    return (
        <div className="chart">
            {/*<label>
                Choose country: &nbsp;
                <br />
                <select defaultValue={regionCode} onChange={handleChange}>
                    {allCountries.map((item, key) => (
                        <option key={key} value={item._id}>
                            {item.country}
                        </option>
                    ))}
                </select>
            </label>*/}
            {dataFound ? 
                <div><br />{renderAreaChart}</div> : 
                <div><br />No recent historical data found for the creation of this country's Chart.<br /></div>}
            
        </div>
    );
}

export default Charts;
