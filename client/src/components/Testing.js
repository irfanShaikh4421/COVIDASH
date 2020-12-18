import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import usStates from '../data/usStates.json';
import { Link } from 'react-router-dom';
import { LocationContext } from '../LocationContext';
import { LoadingOutlined } from '@ant-design/icons';
import { Select, Typography, List, Empty } from 'antd';

const TestingLocations = () => {
	let [locationsData, setData] = useState([]);

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
	let [stateName, setState] = useState(
		usStates[stateIndex.indexOf(location.state)].slug
	);

	const { Option } = Select;
	const { Title, Text } = Typography;

	const [noData, setNoData] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function getData() {
			/*  const baseUrl = 'https://covid-19-testing.github.io/locations/';
            const jsonUrl = '/complete.json';

            const url = baseUrl + stateName + jsonUrl;
            let getData; */
			try {
				setLoading(true);
				setNoData(false);
				//getData = await axios.get(url);
				const getData = await axios.get(`/testing/${stateName}`);
				setData(getData.data);
				setLoading(false);
			} catch (e) {
				setLoading(false);
				setNoData(e);
				console.log(e);
			}
		}
		getData();
	}, [stateName]);

	const getState = (value) => {
		setState(value);
	};

	const displayData = () => {
		if (noData)
			return (
				<span className="sub-info">
					{noData.name}: {noData.message}.
				</span>
			);
		else {
			if (locationsData.length > 0) {
				if (locationsData[0].name === 'No Locations Yet')
					return (
						<span className="not-available">
							No testing locations available for selected state.
							<Empty />
						</span>
					);
				else {
					return (
						<div className="testing-list">
							<List
								size="large"
								bordered
								dataSource={locationsData}
								renderItem={(item, index) => (
									<List.Item>
										{index + 1}.&nbsp;
										<Link
											key={index}
											to={`/testing/${stateName}/${item.id}`}
											className="color-link"
										>
											{item.name}
										</Link>
									</List.Item>
								)}
							/>
						</div>
					);
				}
			}
		}
	};

	if (!locationsData) {
		return <LoadingOutlined className="loader" />;
	} else if (loading) {
		return <LoadingOutlined className="loader" />;
	} else {
		return (
			<div className="full-width">
				<Title>Testing locations</Title>
				<Text type='secondary'>SOURCE : <a style={{letterSpacing: '2px'}} target="__blank" href="https://documenter.getpostman.com/view/8854915/SzS7PR3t?version=latest"> TESTING API</a></Text> <br/><br/>
			
				
				<label>
					Select state:&nbsp;
					<Select
						showSearch
						style={{ width: 200 }}
						placeholder={stateName ? stateName : 'Choose state'}
						optionFilterProp="children"
						onChange={getState}
						value={stateName}
						filterOption={(input, option) =>
							option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
					>
						{usStates.map((states, index) => (
							<Option key={index} value={states.slug}>
								{states.name}
							</Option>
						))}
					</Select>
				</label>
				{displayData()}
			</div>
		);
	}
};

export default TestingLocations;
