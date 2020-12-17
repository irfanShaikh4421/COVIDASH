import React, { useEffect, useState } from 'react';
import CovidMap from './CovidMap';
import Legend from './Legend';
import LoadCountriesTask from '../tasks/LoadCountriesTask';
import legendItems from '../entities/LegendItems';
import { LoadingOutlined } from '@ant-design/icons';

const OutBreak = () => {
	const [countries, setCountries] = useState([]);
	const legendItemsRev = [...legendItems].reverse();

	const load = () => {
		let loadCountriesTask = new LoadCountriesTask();
		loadCountriesTask.load((countries) => setCountries(countries));
	};

	useEffect(load, []);

	return (
		<div>
			<h2>OutBreak Map</h2>
			<br />
			{countries.length === 0 ? (
				<LoadingOutlined className="loader" />
			) : (
				<div>
					<CovidMap countries={countries} />
					<Legend legendItems={legendItemsRev} />
				</div>
			)}
		</div>
	);
};

export default OutBreak;
