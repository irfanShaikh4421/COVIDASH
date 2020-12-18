import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './firebase/Auth';
import axios from 'axios';

export const LocationContext = React.createContext();

export const LocationProvider = ({children}) => {
    const { currentUser } = useContext(AuthContext);
    const [ location, setLocation ] = useState({
        countryCode: 0,
        state: "AL"
    });
    const [loadingLocation, setLoadingLocation] = useState(true);

    useEffect(() => {
        async function fetchUserLocation() {
            try{
                setLoadingLocation(true);
                if(currentUser){
                    const {data: response} = await axios.post(`/user/${currentUser.uid}`);
                    setLocation({countryCode: response.countryCode, state: response.state});
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

    return (
        <LocationContext.Provider value={[location, setLocation]}>
            {children}
        </LocationContext.Provider>
    )
};

