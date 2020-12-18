import React from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../CovidMap.css';
import { Typography } from 'antd';

const CovidMap = ({ countries }) => {
	const { Title } = Typography;

	const mapStyle = {
		fillColor: 'white',
		weight: 1,
		color: 'black',
		fillOpacity: 1,
	};

	const onEachCountry = (country, layer) => {
		layer.options.fillColor = country.properties.color;
		const name = country.properties.ADMIN;
		const confirmedCases = country.properties.confirmedCases;
		const totalDeaths = country.properties.totalDeaths;
		const totalRecovered = country.properties.totalRecovered;

		layer.bindPopup(
			`<div class='flex-column'>
                <span class='sub-info'>${name}</span>
                <div class='flex-row'>
                    <span class='sub-heading-row'>Cases:</span>
                    <span class='sub-info-row'>${confirmedCases}</span>
                    <span class='sub-heading-row'>Deaths:</span>
                    <span class='sub-info-row'>${totalDeaths}</span>
                    <span class='sub-heading-row'>Recovered:</span>
                    <span class='sub-info-row'>${totalRecovered}</span>
                </div>
            </div>`
		);
	};

	return (
		<div>
			<MapContainer style={{ height: '65vh' }} zoom={3} center={[20, 0]}>
				<GeoJSON
					style={mapStyle}
					data={countries}
					onEachFeature={onEachCountry}
				/>
			</MapContainer>
			<br />
		</div>
	);
};

export default CovidMap;
