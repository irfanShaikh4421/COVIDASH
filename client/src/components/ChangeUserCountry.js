import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../App.css';
import { AuthContext } from '../firebase/Auth';
import { LocationContext } from '../LocationContext';
import allCountries from '../data/countries.json';
import allStates from '../data/usStates.json';

const ChangeCountry = () => {
    const { currentUser } = useContext(AuthContext);
    const [ location, setLocation ] = useContext(LocationContext);
    //const [loading, setLoading] = useState(true);
    //const [userCountry, setUserCountry] = useState(0);
    const [userImage, setUserImage] = useState(undefined);
    //const [userState, setUserState] = useState("AL");
    const userId = currentUser.uid;

    /*useEffect(() => {
        async function fetchUserInfo() {
            try{
                setLoading(true);
                const {data: response} = await axios.get(`/user/${userId}`);
                setUserCountry(response.countryCode);
                setUserState(response.state);
                setUserImage(response.image);///should be eventually replaced with IRfan's stuff
                setLoading(false);
            }catch(e){
                console.log(e);
            };
        };
        fetchUserInfo();
    }, []);*/

    const countryDropDown = allCountries.map((entry) => (
        <option key={entry._id} value={entry._id}>
            {entry.country}</option>
    ));

    const stateDropDown = allStates.map((entry, index) => (
        <option key={index} value={entry.abbreviation}>
            {entry.name}
        </option>
    ));

    /*if(loading){
        return <p>Loading user info...</p>
    };*/

    async function handleCountryChange(elem) {
        console.log(`Country code: ${location.countryCode} to be replaced with: ${elem.target.value}`);
        const countryCode = parseInt(elem.target.value);
        if(countryCode !== location.countryCode) {
            const {data: response} = await axios.patch(`/user/${userId}`, 
                {countryCode: countryCode}
            );
            setLocation({
                countryCode: response.countryCode,
                state: response.state
            });
        }
    }

    async function handleStateChange(elem) {
        console.log(`State abbr.: ${location.state} to be replaced with: ${elem.target.value}`);
        try{
            if(elem.target.value !== location.state) {
                const {data: response} = await axios.patch(`/user/${userId}`, 
                    {state: elem.target.value}
                );
                setLocation({
                    countryCode: response.countryCode,
                    state: response.state
                });
            }
        }catch(e){
            console.log(e);
        }
    }

    return (
        <div>
            <img src={userImage} alt="PLACEHOLDER TILL IMAGEMAGICK" /> <br /> <hr />
            User's Location: <select defaultValue={location.countryCode} onChange={handleCountryChange}>{countryDropDown}</select>
            {(location.countryCode===840) ? <select defaultValue={location.state} onChange={handleStateChange}>{stateDropDown} </select> : null}
        </div>
    )

}

export default ChangeCountry;
