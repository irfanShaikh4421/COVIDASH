import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    AreaChart,
    Area,
    Sector,
    Cell,
    Legend,
} from 'recharts';

function Charts() {
    const [chartArr, setChartArr] = useState([]);
    const [countriesData, setData] = useState([]);
    const [countryIndex, setIndex] = useState('0');
    const [state, setState] = useState({ activeIndex: 0 });

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

            const chartDataArr = [];

            for (let i = 0; i < keys.length; i++) {
                const chartObj = {
                    date: keys[i],
                    cases: casesValues[i],
                    deaths: deathsValues[i],
                    recovered: recoveredValues[i],
                    active:
                        casesValues[i] - recoveredValues[i] - deathsValues[i],
                };

                chartDataArr.push(chartObj);
            }

            setChartArr(chartDataArr);
        }

        getData();
    }, [countryIndex]);

    const DataFormater = (number) => {
        if (number > 1_000_000_000) {
            return (number / 10_000_00_000).toString() + 'B';
        } else if (number > 1_000_000) {
            return (number / 1_000_000).toString() + 'M';
        } else if (number > 1_000) {
            return (number / 1_000).toString() + 'K';
        } else {
            return number.toString();
        }
    };

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

                <linearGradient id="recovered" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0088FE" stopOpacity={0} />
                </linearGradient>

                <linearGradient id="active" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00C49F" stopOpacity={0} />
                </linearGradient>

                <linearGradient id="deaths" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E3242B" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#E3242B" stopOpacity={0} />
                </linearGradient>
            </defs>

            <XAxis dataKey="date" />
            <YAxis tickFormatter={DataFormater} />
            <CartesianGrid strokeDasharray="3 3" />

            <Tooltip
                formatter={(value) => new Intl.NumberFormat('en').format(value)}
            />

            <Area
                type="monotone"
                dataKey="cases"
                stroke="orange"
                fillOpacity={1}
                fill="url(#cases)"
            />

            <Area
                type="monotone"
                dataKey="recovered"
                stroke="#0088FE"
                fillOpacity={1}
                fill="url(#recovered)"
            />

            <Area
                type="monotone"
                dataKey="active"
                stroke="#00C49F"
                fillOpacity={1}
                fill="url(#active)"
            />

            <Area
                type="monotone"
                dataKey="deaths"
                stroke="#E3242B"
                fillOpacity={1}
                fill="url(#deaths)"
            />
        </AreaChart>
    );

    let renderPieChart;

    if (chartArr.length > 0) {
        const COLORS = ['#0088FE', '#00C49F', '#E3242B'];

        const data = [
            {
                name: 'Active',
                value:
                    chartArr[29].cases -
                    chartArr[29].recovered -
                    chartArr[29].deaths,
            },
            { name: 'Recovered', value: chartArr[29].recovered },
            { name: 'Deaths', value: chartArr[29].deaths },
        ];

        const RADIAN = Math.PI / 180;

        const renderActiveShape = ({
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            startAngle,
            endAngle,
            fill,
            payload,
            percent,
            value,
        }) => {
            const sin = Math.sin(-RADIAN * midAngle);
            const cos = Math.cos(-RADIAN * midAngle);
            const sx = cx + (outerRadius + 10) * cos;
            const sy = cy + (outerRadius + 10) * sin;
            const mx = cx + (outerRadius + 30) * cos;
            const my = cy + (outerRadius + 30) * sin;
            const ex = mx + (cos >= 0 ? 1 : -1) * 22;
            const ey = my;
            const textAnchor = cos >= 0 ? 'start' : 'end';

            const regexCommaNumbers = /\B(?=(\d{3})+(?!\d))/g;

            return (
                <g>
                    <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                        {payload.name}
                    </text>

                    <Sector
                        cx={cx}
                        cy={cy}
                        innerRadius={innerRadius}
                        outerRadius={outerRadius}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        fill={fill}
                    />

                    <Sector
                        cx={cx}
                        cy={cy}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        innerRadius={outerRadius + 6}
                        outerRadius={outerRadius + 10}
                        fill={fill}
                    />

                    <path
                        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                        stroke={fill}
                        fill="none"
                    />

                    <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />

                    <text
                        x={ex + (cos >= 0 ? 1 : -1) * 12}
                        y={ey}
                        textAnchor={textAnchor}
                        fill="#333"
                    >
                        {value.toString().replace(regexCommaNumbers, ',')}
                    </text>

                    <text
                        x={ex + (cos >= 0 ? 1 : -1) * 12}
                        y={ey}
                        dy={18}
                        textAnchor={textAnchor}
                        fill="#999"
                    >
                        {`(${(percent * 100).toFixed(2)}%)`}
                    </text>
                </g>
            );
        };

        const getInitialState = () => {
            return {
                activeIndex: 0,
            };
        };

        const onPieEnter = (data, index) => {
            getInitialState();

            setState({
                activeIndex: index,
            });
        };

        renderPieChart = (
            <PieChart width={800} height={400}>
                <Pie
                    activeIndex={state.activeIndex}
                    activeShape={renderActiveShape}
                    data={data}
                    dataKey="value"
                    cx={300}
                    cy={200}
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    onMouseEnter={onPieEnter}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
            </PieChart>
        );
    }

    let renderBarChart;
    let countryObj = [];

    if (countriesData.length > 0) {
        let allCountriesArr = [];

        for (let i in countriesData) {
            let cases = Object.values(countriesData[i].timeline.cases);
            let recovered = Object.values(countriesData[i].timeline.recovered);
            let deaths = Object.values(countriesData[i].timeline.deaths);
            let country = countriesData[i].country;

            countryObj = {
                cases: cases[29],
                recovered: recovered[29],
                deaths: deaths[29],
                country: country,
            };

            allCountriesArr.push(countryObj);
        }

        let values = [];

        for (let i in allCountriesArr) {
            values.push(allCountriesArr[i].cases);
        }

        let getFive = values.sort((a, b) => b - a).slice(0, 5);

        let topFive = [];

        for (let i in getFive) {
            for (let j in allCountriesArr) {
                if (getFive[i] === allCountriesArr[j].cases)
                    topFive.push(allCountriesArr[j]);
            }
        }

        let data = [];

        if (topFive.length > 0) {
            for (let i = 0; i < topFive.length; i++) {
                let value = {
                    name: topFive[i].country,
                    cases: topFive[i].cases,
                    recovered: topFive[i].recovered,
                    deaths: topFive[i].deaths,
                    active:
                        topFive[i].cases -
                        topFive[i].recovered -
                        topFive[i].deaths,
                };

                data.push(value);
            }
        }

        renderBarChart = (
            <BarChart
                width={600}
                height={300}
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={DataFormater} />

                <Tooltip
                    formatter={(value) =>
                        new Intl.NumberFormat('en').format(value)
                    }
                />
                <Legend />

                <Bar dataKey="active" stackId="a" fill="#0088FE" />
                <Bar dataKey="recovered" stackId="a" fill="#00C49F" />
                <Bar dataKey="deaths" stackId="a" fill="#E3242B" />
            </BarChart>
        );
    }

    const handleChange = (e) => {
        if (e.target.value) setIndex(e.target.value);
    };

    return (
        <div className="chart">
            <label>
                Choose country:&nbsp;
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
            {renderBarChart}
            <br />
            {renderPieChart}
            <br />
            {renderAreaChart}
            <br />
        </div>
    );
}

export default Charts;
