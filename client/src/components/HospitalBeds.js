import React, { useState, useEffect, useContext } from 'react';
import usStates from '../data/usStates';
import { LocationContext } from '../LocationContext';
import { LoadingOutlined } from '@ant-design/icons';
import { Select, Typography, Card, Button, Row, Col } from 'antd';

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
	const { Title } = Typography;

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

	const displayData = () => {
		return (
			<div className="top-margin">
				<Row gutter={[40, 30]}>
					{currentStateData.map((item, index) => (
						<Col
							className="gutter-row full-width"
							sm={24}
							md={12}
							lg={8}
							key={index}
						>
							<Card className="flex-column">
								<span className="sub-info">{item.HOSPITAL_NAME}</span>
								<span className="sub-heading">Bed utilization rate:</span>
								<span className="sub-info">
									{+(item.BED_UTILIZATION * 100).toFixed(2)}%
								</span>
								<span className="sub-heading">Address:</span>
								<span className="sub-info-small">
									{item.HQ_ADDRESS} {item.HQ_CITY}
								</span>
								<Button
									href={`http://maps.google.com/?q=${
										item.HOSPITAL_NAME +
										' ' +
										item.HQ_ADDRESS +
										' ' +
										item.HQ_CITY
									}`}
									target="blank"
									size={'small'}
								>
									View on map
								</Button>
							</Card>
						</Col>
					))}
				</Row>
			</div>
		);
	};

	return (
		<div className="flex-column full-width">
			<Title>Hospital's bed utilization</Title>
			<label>
				Select state:&nbsp;
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
			</label>
			<div>
				{loading ? <LoadingOutlined className="loader" /> : displayData()}
			</div>
		</div>
	);
};

export default HospitalBeds;
