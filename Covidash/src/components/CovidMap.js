import React from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../CovidMap.css';

const CovidMap = ({ countries }) => {
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
            `${name}
            Cases: ${confirmedCases}
            Deaths: ${totalDeaths}
            Recovered: ${totalRecovered}`
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
