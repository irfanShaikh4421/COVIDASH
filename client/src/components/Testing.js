import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import usStates from '../data/usStates.json';
import { Link } from 'react-router-dom';
import { LocationContext } from '../LocationContext';

const TestingLocations = () => {
    let [locationsData, setData] = useState([]);

    const [ location ] = useContext(LocationContext);
    const stateIndex = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
    let [stateName, setState] = useState(usStates[stateIndex.indexOf(location.state)].slug);

    let [noData, setNoData] = useState(false);

    useEffect(() => {
        async function getData() {
           /*  const baseUrl = 'https://covid-19-testing.github.io/locations/';
            const jsonUrl = '/complete.json';

            const url = baseUrl + stateName + jsonUrl;
            let getData; */
            try {
                setNoData(false);
                //getData = await axios.get(url);
                const getData = await axios.get(`/testing/${stateName}`);
                setData(getData.data);
            } catch (e) {
                setNoData(e);
                console.log(e);
            }
        }
        getData();
    }, [stateName]);

    const getState = (e) => {
        let state = e.target.value;
        setState(state);
    };

    if (!locationsData) {
        return <h2>Loading...</h2>;
    } else if (noData) {
        return (
            <div>
                <label htmlFor="state">Select state</label>
                <select defaultValue={stateName} id="state" onChange={getState}>
                    {usStates.map((states, index) => (
                        <option key={index} value={states.slug}>
                            {states.name}
                        </option>
                    ))}
                </select>
                <h1>{noData.name}: {noData.message}.</h1>
            </div>
        );
    } else {
        return (
            <div>
                <label htmlFor="state">Select state</label>
                <select defaultValue={stateName} id="state" onChange={getState}>
                    {usStates.map((states, index) => (
                        <option key={index} value={states.slug}>
                            {states.name}
                        </option>
                    ))}
                </select>
                {locationsData.map((item, index) => (
                    <Link
                        key={index}
                        className="tota11yLink"
                        to={`/testing/${stateName}/${item.id}`}
                    >
                        <p>
                           {index+1}. {item.name}
                        </p>
                    </Link>
                ))}
            </div>
        );
    }
};

export default TestingLocations;
