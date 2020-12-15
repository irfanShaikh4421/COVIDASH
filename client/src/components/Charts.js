import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    AreaChart,
    linearGradient,
    Area,
} from 'recharts';

function Charts() {
    const [chartArr, setChartArr] = useState([]);
    const [countriesData, setData] = useState([]);
    const [countryIndex, setIndex] = useState('0');

    useEffect(() => {
        async function getData() {
            const url = 'https://disease.sh/v3/covid-19/historical';

            const { data } = await axios.get(url);

            setData(data);

            const keys = Object.keys(data[countryIndex].timeline.cases);
            const casesValues = Object.values(
                data[countryIndex].timeline.cases
            );
            const deathsValues = Object.values(
                data[countryIndex].timeline.deaths
            );
            const recoveredValues = Object.values(
                data[countryIndex].timeline.recovered
            );

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
        }
        getData();
    }, [countryIndex]);

    const renderAreaChart = (
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
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
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
    );

    const handleChange = (e) => {
        if (e.target.value) setIndex(e.target.value);
    };

    return (
        <div class="chart">
            <label>
                Choose country: &nbsp;
                <br />
                <select onChange={handleChange}>
                    {countriesData.map((item, key) => (
                        <option key={key} value={key}>
                            {item.country} {item.province}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            {renderAreaChart}
        </div>
    );
}

export default Charts;
