import React, { useState, useEffect, useContext } from 'react';
import usStates from '../data/usStates';
import { LocationContext } from '../LocationContext';
import { LoadingOutlined } from '@ant-design/icons';
import { Select, Typography, Card, Button, Row, Col } from 'antd';

const axios = require('axios');

const HospitalBeds = () => {
	const [location] = useContext(LocationContext);
	const stateIndex = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
	const [state, setState] = useState(
		usStates[stateIndex.indexOf(location.state)].name
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(undefined);
	const { Option } = Select;
	const { Title } = Typography;

	const [currentStateData, setCurrentStateData] = useState([]);

	useEffect(() => {
		async function getData() {
			console.log('get Hospital Beds data useEffect launched');
			try {
				setLoading(true);
				//const url ='https://opendata.arcgis.com/datasets/1044bb19da8d4dbfb6a96eb1b4ebf629_0.geojson';

				const { data } = await axios.get(`/hospitals/${state}`);

				if (data && data.source) {
					setCurrentStateData([]);
					for (let i = 0; i < data.source.features.length; i++) {
						if (data.source.features[i].properties.STATE_NAME === state) {
							setCurrentStateData((currentStateData) => [
								...currentStateData,
								data.source.features[i].properties,
							]);
						}
					}
				} else {
					setCurrentStateData(data);
				}
			} catch (e) {
				console.log(e);
				setError(e);
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
							<Card hoverable className="flex-column news-card">
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
			<span className="sub-heading margin-small-bottom">
				Source:&nbsp;
				<a
					target="blank"
					href="https://opendata.arcgis.com"
					className="color-blue"
				>
					ArcGIS hub
				</a>
			</span>
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
					className="margin-bottom"
				>
					{usStates.map((state, index) => (
						<Option key={index} value={state.name}>
							{state.name}
						</Option>
					))}
					<Option key={50} value="District of Columbia">
						District of Columbia
					</Option>
					<Option key={51} value="Puerto Rico">
						Puerto Rico
					</Option>
				</Select>
			</label>
			<div>
				{error ? (
					<span className="sub-info">
						{error.name}: {error.message}
					</span>
				) : loading ? (
					<LoadingOutlined className="loader" />
				) : (
					displayData()
				)}
			</div>
		</div>
	);
};

export default HospitalBeds;
