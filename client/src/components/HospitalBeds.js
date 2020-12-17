import React, { useState, useEffect, useContext } from 'react';
import usStates from '../data/usStates';
import { LocationContext } from '../LocationContext';
import { LoadingOutlined } from '@ant-design/icons';
import { Select } from 'antd';

const axios = require('axios');

const HospitalBeds = () => {
	const [location] = useContext(LocationContext);
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
		usStates[stateIndex.indexOf(location.state)].name
	);
	const [loading, setLoading] = useState(true);
	const { Option } = Select;

	const [currentStateData, setCurrentStateData] = useState([]);

	useEffect(() => {
		async function getData() {
			console.log('get Hospital Beds data useEffect launched');
			try {
				setLoading(true);
				//const url ='https://opendata.arcgis.com/datasets/1044bb19da8d4dbfb6a96eb1b4ebf629_0.geojson';

				const { data } = await axios.get('/hospitals');

				setCurrentStateData([]);

				for (let i = 0; i < data.features.length; i++) {
					if (data.features[i].properties.STATE_NAME === state) {
						setCurrentStateData((currentStateData) => [
							...currentStateData,
							data.features[i].properties,
						]);
					}
				}
			} catch (e) {
				console.log(e);
			}
			setLoading(false);
		}
		getData();
	}, [state]);

	const handleChange = (value) => {
		if (value) setState(value);
	};

	return (
		<div>
			<label htmlFor="state">Select state:&nbsp;</label>
			<Select
				showSearch
				style={{ width: 200 }}
				placeholder={state ? state : 'select state'}
				optionFilterProp="children"
				onChange={handleChange}
				value={state}
				filterOption={(input, option) =>
					option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				}
			>
				{usStates.map((state, index) => (
					<Option key={index} value={state.name}>
						{state.name}
					</Option>
				))}
			</Select>
			<div>
				<br />
				{loading ? (
					<LoadingOutlined className="loader" />
				) : (
					currentStateData.map((item, index) => (
						<div key={index}>
							<hr style={{ width: '60%' }} />
							{index + 1}. {item.HOSPITAL_NAME}
							<br />
							Address: {item.HQ_ADDRESS}
							<br />
							{item.HQ_CITY}
							<br />
							<br />
							<a
								href={`http://maps.google.com/?q=${
									item.HOSPITAL_NAME +
									' ' +
									item.HQ_ADDRESS +
									' ' +
									item.HQ_CITY
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
