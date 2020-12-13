import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EachTestingLocation = (props) => {
	const [hospitalData, setHospitalData] = useState({});

	useEffect(() => {
		async function getData() {
			const baseUrl = 'https://covid-19-testing.github.io/locations/';
			const jsonUrl = '/complete.json';
			const state = props.match.params.state;
			const ID = props.match.params.orgID;
			const url = baseUrl + state + jsonUrl;
			let getData;
			try {
				getData = await axios.get(url);
				getData.data.forEach((item) => {
					if (item.id === ID) {
						setHospitalData(item);
					}
				});
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
					<p>
						Address: {hospitalData.physical_address[0].address_1}{' '}
						{hospitalData.physical_address[0].city}{' '}
						{hospitalData.physical_address[0].state_province}{' '}
						{hospitalData.physical_address[0].postal_code}
					</p>
					<a
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
					>
						View on map
					</a>
				</div>
			);
		}
	};

	const getPhone = () => {
		if (hospitalData.phones) {
			return (
				<p>
					Contact: {hospitalData.phones[0].number} (
					{hospitalData.phones[0].type})
				</p>
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
						<p>Regular schedule: </p>
						{schedule.map((item, key) => (
							<p key={key}>
								{weekdays[item.weekday - 1]}: {item.opens_at} to{' '}
								{item.closes_at}
							</p>
						))}
					</div>
				);
			}
		}
	};

	return (
		<div>
			<h2>{hospitalData.name}</h2>
			<hr />
			<p>{hospitalData.description}</p>
			<p>Transportation: {hospitalData.transportation}</p>
			{getAddress()}
			{getPhone()}
			{getSchedule()}
		</div>
	);
};

export default EachTestingLocation;
