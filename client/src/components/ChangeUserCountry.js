import React, { useContext } from 'react';
import axios from 'axios';
import '../App.css';
import { AuthContext } from '../firebase/Auth';
import { LocationContext } from '../LocationContext';
import allCountries from '../data/countries.json';
import allStates from '../data/usStates.json';
import { Select } from 'antd';

const ChangeCountry = () => {
    const { currentUser } = useContext(AuthContext);
    const [location, setLocation] = useContext(LocationContext);
    const userId = currentUser.uid;
    const { Option } = Select;

    const countryDropDown = allCountries.map((entry) => (
        <Option key={entry._id} value={entry._id}>
            {entry.country}
        </Option>
    ));

    const stateDropDown = allStates.map((entry, index) => (
        <Option key={index} value={entry.abbreviation}>
            {entry.name}
        </Option>
    ));

    async function handleCountryChange(value) {
        console.log(
            `Country code: ${location.countryCode} to be replaced with: ${value}`
        );
        const countryCode = parseInt(value);
        if (countryCode !== location.countryCode) {
            const { data: response } = await axios.patch(`/user/${userId}`, {
                countryCode: countryCode,
            });
            setLocation({
                countryCode: response.countryCode,
                state: response.state,
            });
        }
    }

    async function handleStateChange(value) {
        console.log(
            `State abbr.: ${location.state} to be replaced with: ${value}`
        );
        try {
            if (value !== location.state) {
                const { data: response } = await axios.patch(
                    `/user/${userId}`,
                    {
                        state: value,
                    }
                );
                setLocation({
                    countryCode: response.countryCode,
                    state: response.state,
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            Location:&nbsp;
            <Select
                showSearch
                style={{ width: 300 }}
                optionFilterProp="children"
                onChange={handleCountryChange}
                value={location.countryCode}
                filterOption={(input, option) =>
                    option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                }
                defaultValue={location.countryCode}
            >
                {countryDropDown}
            </Select>
            {location.countryCode === 840 ? (
                <Select
                    showSearch
                    style={{ width: 300 }}
                    optionFilterProp="children"
                    onChange={handleStateChange}
                    value={location.state}
                    filterOption={(input, option) =>
                        option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                    }
                    defaultValue={location.state}
                    className="btn-right-margin"
                >
                    {stateDropDown}{' '}
                </Select>
            ) : null}
        </div>
    );
};

export default ChangeCountry;
