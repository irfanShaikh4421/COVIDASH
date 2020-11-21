import React, { useEffect, useState } from 'react';
import axios from 'axios';
import usStates from '../data/usStates.json';
import { Link } from 'react-router-dom';

const TestingLocations = (props) => {
	let [locationsData, setData] = useState([]);
	let [stateName, setState] = useState('alabama');
	let [noData, setNoData] = useState(false);

	useEffect(() => {
		async function getData() {
			const baseUrl = 'https://covid-19-testing.github.io/locations/';
			const jsonUrl = '/complete.json';

			const url = baseUrl + stateName + jsonUrl;
			let getData;
			try {
				setNoData(false);
				getData = await axios.get(url);
				setData(getData.data);
			} catch (e) {
				setNoData(true);
				console.log(e);
			}
		}
		getData();
	}, [stateName]);

	const getState = (e) => {
		let state = e.target.value;
		setState(state);
	};

	if (!locationsData) {
		return <h2>Loading...</h2>;
	} else if (noData) {
		return (
			<div>
				<label htmlFor="state">Select state</label>
				<select id="state" onChange={getState}>
					{usStates.map((states, index) => (
						<option key={index} value={states.slug}>
							{states.name}
						</option>
					))}
				</select>
				<h2>No data for this selected...</h2>
			</div>
		);
	} else {
		return (
			<div>
				<label htmlFor="state">Select state</label>
				<select id="state" onChange={getState}>
					{usStates.map((states, index) => (
						<option key={index} value={states.slug}>
							{states.name}
						</option>
					))}
				</select>
				{locationsData.map((item, index) => (
					<Link to={`/testing/${stateName}/${item.id}`}>
						<p key={index}>
							{item.id} {item.name}
						</p>
					</Link>
				))}
			</div>
		);
	}
};

export default TestingLocations;
