import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../App.css';
import flagUN from './../img/unitedNationsFlag.png';
import allCountries from '../data/countries.json';
import allStates from '../data/usStates.json';
import { LocationContext } from '../LocationContext';
import { LoadingOutlined } from '@ant-design/icons';
import { Select, Typography, Card, Statistic, Row, Col } from 'antd';

const Statistics = () => {
	const regexCommaNumbers = /\B(?=(\d{3})+(?!\d))/g; //from stackoverflow

	const { Title } = Typography;

	const buildDisplay = (region, loading) => {
		return (
			<div>
				{loading ? (
					<LoadingOutlined className="loader" />
				) : (
					<div>
						<div className="flex-row align-center">
							<div className="inline-block">
								<Title level={2} className="inline-block margin-tb">
									{(region && region.country) ||
										(region && region.state) ||
										'World'}
								</Title>
								{region && region.continent ? (
									<span className="small-text color-gray">
										{region.continent}
									</span>
								) : null}
							</div>
							<div className="inline">
								{region && region.countryInfo && region.countryInfo.flag ? (
									<img
										src={region.countryInfo.flag}
										alt="No country flag found"
										title="Sourced from disease.sh"
										className="country-flag-2"
									/>
								) : (
									!(region && region.state) && (
										<img
											src={flagUN}
											alt="No flag found"
											title="United Nations Flag"
											className="country-flag-2"
										/>
									)
								)}
							</div>
						</div>
						<Row gutter={[40, 30]}>
							<Col className="gutter-row full-width" sm={24} md={10} lg={10}>
								<Card className="flex-column" title="Today">
									<div className="flex-row space-between">
										<Statistic
											title="Cases"
											value={region.todayCases
												.toString()
												.replace(regexCommaNumbers, ',')}
											valueStyle={{ color: '#255F85' }}
										/>
										{!(region && region.state) ? (
											<Statistic
												title="Recovered"
												value={region.todayRecovered
													.toString()
													.replace(regexCommaNumbers, ',')}
												valueStyle={{ color: '#3e673c' }}
											/>
										) : null}
										<Statistic
											title="Deaths"
											value={region.todayDeaths
												.toString()
												.replace(regexCommaNumbers, ',')}
											valueStyle={{ color: '#ba1b1d' }}
										/>
									</div>
								</Card>
							</Col>
							<Col className="gutter-row full-width" sm={24} md={14} lg={14}>
								<Card className="flex-column" title="Overall">
									<div className="flex-responsive space-between">
										<Statistic
											title="Cases"
											value={region.cases
												.toString()
												.replace(regexCommaNumbers, ',')}
											valueStyle={{ color: '#255F85' }}
										/>
										{!(region && region.state) ? (
											<Statistic
												title="Recovered"
												value={region.recovered
													.toString()
													.replace(regexCommaNumbers, ',')}
												valueStyle={{ color: '#3e673c' }}
											/>
										) : null}
										<Statistic
											title="Deaths"
											value={region.deaths
												.toString()
												.replace(regexCommaNumbers, ',')}
											valueStyle={{ color: '#ba1b1d' }}
										/>
									</div>
								</Card>
							</Col>
						</Row>
						<Row gutter={[40, 30]}>
							<Col className="gutter-row full-width" sm={24}>
								<Card className="flex-column" title="Interesting numbers">
									<div className="flex-responsive space-between">
										{region && region.population ? (
											<Statistic
												title="Population"
												value={region.population
													.toString()
													.replace(regexCommaNumbers, ',')}
												valueStyle={{ color: '#255F85' }}
											/>
										) : null}
										{region && region.tests ? (
											<Statistic
												title="Total tested"
												value={region.tests
													.toString()
													.replace(regexCommaNumbers, ',')}
												valueStyle={{ color: '#3E673C' }}
											/>
										) : null}
										{region && region.active ? (
											<>
												<Statistic
													title="Active cases"
													value={region.active
														.toString()
														.replace(regexCommaNumbers, ',')}
													valueStyle={{ color: '#F76819' }}
												/>
												{region &&
												(region.critical || region.critical === 0) ? (
													<Statistic
														title="Critical cases"
														value={region.critical
															.toString()
															.replace(regexCommaNumbers, ',')}
														valueStyle={{ color: '#BA1B1D' }}
													/>
												) : null}
											</>
										) : null}
									</div>
								</Card>
							</Col>
						</Row>
						{region && region.updated && (
							<span className="sub-heading">
								Updated at: {new Date(region.updated).toLocaleString('en-US')}
							</span>
						)}
					</div>
				)}
			</div>
		);
	};

	return (
		<div className="full-width">
			<GetCountry buildCountry={buildDisplay} />
		</div>
	);
};

const GetState = ({ buildState }) => {
	const [location] = useContext(LocationContext);
	const { Option } = Select;

	const stateIndex = [
		'AL',
		'AK',
		'AZ',
		'AR',
		'CA',
		'CO',
		'CT',
		'DE',
		'FL',
		'GA',
		'HI',
		'ID',
		'IL',
		'IN',
		'IA',
		'KS',
		'KY',
		'LA',
		'ME',
		'MD',
		'MA',
		'MI',
		'MN',
		'MS',
		'MO',
		'MT',
		'NE',
		'NV',
		'NH',
		'NJ',
		'NM',
		'NY',
		'NC',
		'ND',
		'OH',
		'OK',
		'OR',
		'PA',
		'RI',
		'SC',
		'SD',
		'TN',
		'TX',
		'UT',
		'VT',
		'VA',
		'WA',
		'WV',
		'WI',
		'WY',
	];
	const [state, setState] = useState(
		allStates[stateIndex.indexOf(location.state)].name
	);
	const [stateData, setStateData] = useState(undefined);
	const [loading, setLoading] = useState(true);

	const stateDropDown = allStates.map((entry, index) => (
		<Option key={index} value={entry.name}>
			{entry.name}
		</Option>
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

	function handleSelect(value) {
		setState(value);
		console.log(`State selected: ${value} `);
	}

	return (
		<div>
			Select state: &nbsp;
			<Select
				showSearch
				style={{ width: 200 }}
				placeholder={state}
				optionFilterProp="children"
				onChange={handleSelect}
				value={state}
				filterOption={(input, option) =>
					option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				}
			>
				{stateDropDown}
			</Select>
			{!loading && buildState(stateData, loading)}
		</div>
	);
};

const GetCountry = ({ buildCountry }) => {
	const [location] = useContext(LocationContext);
	const [loading, setLoading] = useState(true);
	const { Option } = Select;

	function findIso3(targetValue) {
		if (targetValue > 0) {
			for (let i = 0; i < allCountries.length; i++) {
				if (allCountries[i]._id === targetValue) {
					return allCountries[i].iso3;
				}
			}
		}
		return '';
	}
	const defaultCountry = findIso3(location.countryCode);

	const [country, setCountry] = useState(defaultCountry);
	const [countryData, setCountryData] = useState(undefined);
	let display;

	useEffect(
		() => {
			async function fetchData() {
				try {
					setLoading(true);
					//setShowWorldData(false);
					//console.log(`iso3 in fetch country: ${country || "Planet Earth"}`);
					if (country) {
						const { data: Country } = await axios.get(
							`https://disease.sh/v3/covid-19/countries/${country}`
						);
						console.log(`recieved ${country} data from getCountry useEffect`);
						//console.log(JSON.stringify(Country));
						setCountryData(Country);
						setLoading(false);
					} else {
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

			if (typeof country === 'string') {
				fetchData();
			}
		}, //fires every time the country iso3 changes
		[country]
	);

	const handleChange = (value) => {
		setCountry(value);
	};

	if (loading) {
		return <LoadingOutlined className="loader" />;
	} else {
		display = countryData && buildCountry(countryData);
	}

	//modified to match Travel.js' dropdown
	const countryDropDown = allCountries.map((entry) => (
		<Option key={entry._id} value={entry.iso3}>
			{entry.country}
		</Option>
	));

	const { Title } = Typography;

	return (
		<div>
			<Title>Statistics</Title>
			<span className="sub-heading margin-small-bottom">
				Source:&nbsp;
				<a target="blank" href="https://disease.sh" className="color-blue">
					Disease.sh
				</a>
			</span>
			<form
				method="POST"
				name="searchFrom"
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<label>
					Get location specific data: &nbsp;
					<Select
						showSearch
						style={{ width: 250 }}
						placeholder={country ? country : 'Planet Earth'}
						optionFilterProp="children"
						onChange={handleChange}
						value={country}
						filterOption={(input, option) =>
							option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
					>
						{countryDropDown}
					</Select>
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
