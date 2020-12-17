import React, { useEffect, useState } from 'react';
import CovidMap from './CovidMap';
import Legend from './Legend';
import LoadCountriesTask from '../tasks/LoadCountriesTask';
import legendItems from '../entities/LegendItems';
import { LoadingOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const OutBreak = () => {
    const [countries, setCountries] = useState([]);
    const legendItemsRev = [...legendItems].reverse();

    const { Title, Text } = Typography;

    const load = () => {
        let loadCountriesTask = new LoadCountriesTask();
        loadCountriesTask.load((countries) => setCountries(countries));
    };

    useEffect(load, []);

    return (
        <div className="full-width flex-column">
            <Title>Outbreak map</Title>
            <Text className="symptom-header">
                Click on each country to see the statistics
            </Text>
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
