import React, { useState, useEffect } from 'react';
import usStates from '../data/usStates';
const axios = require('axios');

const HospitalBeds = () => {
	const [state, setState] = useState('Alabama');
	const [currentStateData, setCurrentStateData] = useState([]);

	useEffect(() => {
		async function getData() {
			const url =
				'https://opendata.arcgis.com/datasets/1044bb19da8d4dbfb6a96eb1b4ebf629_0.geojson';

			const { data } = await axios.get(url);

			setCurrentStateData([]);

			for (let i = 0; i < data.features.length; i++) {
				if (data.features[i].properties.STATE_NAME === state) {
					setCurrentStateData((currentStateData) => [
						...currentStateData,
						data.features[i].properties,
					]);
				}
			}
		}
		getData();
	}, [state]);

	const handleChange = (e) => {
		if (e.target.value) setState(e.target.value);
	};

	return (
		<div>
			<label htmlFor="state">Select state</label>
			<select onChange={handleChange}>
				{usStates.map((state, index) => (
					<option key={index} value={state.name}>
						{state.name}
					</option>
				))}
			</select>
			<div>
				{state}
				{currentStateData.map((item, index) => (
					<div key={index}>
						<hr style={{width: '60%'}}/>
						{index + 1}. {item.HOSPITAL_NAME}
						<br />
						Address: {item.HQ_ADDRESS}
						<br />
						{item.HQ_CITY}
						<br />
						{/*item.HQ_STATE //This Item seems a bit unnecessary, as the state is selected by the user (and thus all entries on any single given page would be Identical*/}
						<br />
						<a
							href={`http://maps.google.com/?q=${
								item.HOSPITAL_NAME +
								' ' +
								item.HQ_ADDRESS +
								' ' +
								item.HQ_CITY +
								' ' +
								item.HQ_STATE
							}`}
							target="blank"
						>
							View on map
						</a>
						<br />
						Bed utilization rate: {+(item.BED_UTILIZATION * 100).toFixed(2)}%
					</div>
				))}
			</div>
		</div>
	);
};

export default HospitalBeds;
