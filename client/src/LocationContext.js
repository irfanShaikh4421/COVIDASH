import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './firebase/Auth';
import axios from 'axios';

export const LocationContext = React.createContext();

export const LocationProvider = ({children}) => {
    const { currentUser } = useContext(AuthContext);
    const [error, setError] = useState(undefined);
    const [ location, setLocation ] = useState({
        countryCode: 0,
        state: "AL"
    });
    const [loadingLocation, setLoadingLocation] = useState(true);

    useEffect(() => {
        async function fetchUserLocation() {
            try{
                setLoadingLocation(true);
                setError(undefined);
                if(currentUser){
                    try{
                        const {data: response} = await axios.post(`/user/${currentUser.uid}`);
                        setLocation({countryCode: response.countryCode, state: response.state});
                    }catch(e){
                        console.error(e);
                        console.log("Failed to obtain user's location data from backend, defaulting to Earth/Alabama");
                        setError(e);
                        setLocation({countryCode: 0, state: 'AL'});
                    }
                }else{
                    setLocation({countryCode: 0, state: "AL"});
                }
                setLoadingLocation(false);
            }catch(e){
                console.log(e);
            }
        };
        fetchUserLocation();
    }, [currentUser]);//launches whenever the user signs in

    if(loadingLocation) return <div>Loading Location Data...</div>;

    if(error){
        return (
            <div>
                <h1>{error.name}: {error.message}</h1>
                <span>Failed to retrieve User Location Data from backend, defaulting to Earth/Alabama.</span>
                <br />
                <hr />
                <br />
                <LocationContext.Provider value={[location, setLocation]}>
                    {children}
                </LocationContext.Provider>
            </div>
        )
    }

    return (
        <LocationContext.Provider value={[location, setLocation]}>
            {children}
        </LocationContext.Provider>
    )
};

