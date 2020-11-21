import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Vaccine = (props) => {
	const [vaccineData, setVaccineData] = useState([]);

	useEffect(() => {
		async function getData() {
			const url = 'https://disease.sh/v3/covid-19/vaccine';

			let response;
			try {
				response = await axios.get(url);
				setVaccineData(response.data.data);
			} catch (e) {
				console.log(e);
			}
		}
		getData();
	}, []);

	return (
		<div>
			{vaccineData.map((item, index) => (
				<div key={index}>
					<p>
						{index + 1}. Sponsors:{' '}
						{item.sponsors.map((sponsor) => (
							<span>{sponsor} | </span>
						))}
					</p>
					<p>Mechanism: {item.mechanism}</p>
					<p>Trial phase: {item.trialPhase}</p>
					<br />
					<br />
				</div>
			))}
		</div>
	);
};

export default Vaccine;
