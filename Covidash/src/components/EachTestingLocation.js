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
				let hospitalData = getData.data.map((item) => {
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
	return (
		<div>
			<h2>{hospitalData.name}</h2>
			<p>{hospitalData.description}</p>
			<p>Transportation: {hospitalData.transportation}</p>
		</div>
	);
};

export default EachTestingLocation;
