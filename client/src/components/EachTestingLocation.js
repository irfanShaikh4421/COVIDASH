import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Card, Button, Divider } from 'antd';

const EachTestingLocation = (props) => {
	const [hospitalData, setHospitalData] = useState({});

	const { Title } = Typography;

	useEffect(() => {
		async function getData() {
			//const baseUrl = 'https://covid-19-testing.github.io/locations/';
			//const jsonUrl = '/complete.json';
			const state = props.match.params.state;
			const ID = props.match.params.orgID;
			//const url = baseUrl + state + jsonUrl;
			//let getData;
			try {
				//getData = await axios.get(url);
				console.log(state);
				const { data: getData } = await axios.get(`/testing/${state}/${ID}`);
				console.log(getData);
				setHospitalData(getData);
				/*getData.data.forEach((item) => {
					if (item.id === ID) {
						setHospitalData(item);
					}
				});*/
			} catch (e) {
				console.log(e);
			}
		}
		getData();
	}, [props.match.params.state, props.match.params.orgID]);

	const getAddress = () => {
		if (hospitalData.physical_address) {
			return (
				<div>
					<span className="sub-heading">Address:</span>

					<span className="sub-info">
						{hospitalData.physical_address[0].address_1}{' '}
						{hospitalData.physical_address[0].city}{' '}
						{hospitalData.physical_address[0].state_province}{' '}
						{hospitalData.physical_address[0].postal_code}
					</span>
					<Button
						href={`http://maps.google.com/?q=${
							hospitalData.name +
							' ' +
							hospitalData.physical_address[0].address_1 +
							' ' +
							hospitalData.physical_address[0].city +
							' ' +
							hospitalData.physical_address[0].state_province
						}`}
						target="blank"
						size={'small'}
						style={{ margin: '-5px 0 10px 0' }}
					>
						View on map
					</Button>
				</div>
			);
		}
	};

	const getPhone = () => {
		if (hospitalData.phones) {
			return (
				<>
					<span className="sub-heading">Contact:</span>
					<span className="sub-info">
						{hospitalData.phones[0].number} ({hospitalData.phones[0].type})
					</span>
				</>
			);
		}
	};

	const getSchedule = () => {
		const weekdays = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		];

		if (hospitalData.regular_schedule) {
			const schedule = hospitalData.regular_schedule;
			if (hospitalData.regular_schedule.length === 0) {
				return;
			} else {
				return (
					<div>
						<span className="sub-heading">Regular schedule:</span>
						{schedule.map((item, key) => (
							<span key={key} className="schedule">
								{weekdays[item.weekday - 1]}: {item.opens_at} to{' '}
								{item.closes_at}
							</span>
						))}
					</div>
				);
			}
		}
	};

	return (
		<div className="full-width-card">
			<Card className="flex-column">
				<Title>{hospitalData.name}</Title>
				<span className="card-date">{hospitalData.description}</span>
				<Divider />
				<span className="sub-heading">Available transportation modes:</span>
				<span className="sub-info">{hospitalData.transportation}</span>
				{getAddress()}
				{getPhone()}
				{getSchedule()}
			</Card>
		</div>
	);
};

export default EachTestingLocation;
