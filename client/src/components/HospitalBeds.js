import React, { useState, useEffect, useContext } from 'react';
import usStates from '../data/usStates';
import { LocationContext } from '../LocationContext';
const axios = require('axios');

const HospitalBeds = () => {
	const [ location ] = useContext(LocationContext);
	const stateIndex = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
	const [state, setState] = useState(usStates[stateIndex.indexOf(location.state)].name);
	const [loading, setLoading] = useState(true);

	const [currentStateData, setCurrentStateData] = useState([]);

	useEffect(() => {
		async function getData() {
			setLoading(true);
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
			setLoading(false);
		}
		getData();
	}, [state]);

	const handleChange = (e) => {
		if (e.target.value) setState(e.target.value);
	};

	return (
		<div>
			<label htmlFor="state">Select state:&nbsp;</label>
			<select defaultValue={state} onChange={handleChange}>
				{usStates.map((state, index) => (
					<option key={index} value={state.name}>
						{state.name}
					</option>
				))}
			</select>
			<div>
				{state}
				{(loading ? <div>Loading...</div> :
					currentStateData.map((item, index) => (
						<div key={index}>
							<hr style={{width: '60%'}}/>
							{index + 1}. {item.HOSPITAL_NAME}
							<br />
							Address: {item.HQ_ADDRESS}
							<br />
							{item.HQ_CITY}
							<br />
							<br />
							<a
								href={`http://maps.google.com/?q=${
									item.HOSPITAL_NAME + ' ' + item.HQ_ADDRESS + ' ' + item.HQ_CITY
								}`}
								target="blank"
							>
								View on map
							</a>
							<br />
							Bed utilization rate: {+(item.BED_UTILIZATION * 100).toFixed(2)}%
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default HospitalBeds;
