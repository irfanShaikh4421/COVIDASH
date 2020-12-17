import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const Vaccine = () => {
    const [vaccineData, setVaccineData] = useState([]);
    const [error, setError] = useState(undefined);

    useEffect(() => {
        async function getData() {
            setError(undefined);
            //const url = 'https://disease.sh/v3/covid-19/vaccine';
            console.log("get Vaccine data useEffect launched");
            try {
                const response = await axios.get('/vaccine');
                setVaccineData(response.data.data);
            } catch (e) {
                console.log(e.toString());
                setError(e);
            }
        }
        getData();
    }, []);

    if(error){
        return (<h1>{error.name}: {error.message}</h1>);
    }

    return (
        <div>
            {vaccineData.map((item, index) => (
                <div key={index}>
                    <p>
                        {index + 1}. Mechanism: {item.mechanism}{' '}
                    </p>
                    <span className="hoverCause">
                        <p>
                            <span className="hoverResult">
                                {
                                    item.details
                                        .replace(
                                            /&nbsp;/g,
                                            ' ' /** FUN WITH REGEX*/
                                        )
                                        .replace(/&.squo;|&#39;/g, "'")
                                        .replace(/&.dquo;|&quot;/g, '"')
                                        .replace(
                                            /&ndash;/g,
                                            '-'
                                        ) /**at this point, all that're left are literally greek characters. */
                                }
                            </span>
                            |
                            {
                                ' ' /**I replaced the 'Sponsors: ' with a leading | to make the final | look less out of place. */
                            }
                            {item.sponsors.map((sponsor, index) => (
                                <span key={index}>{sponsor} | </span>
                            ))}
                        </p>

                        <p>Trial phase: {item.trialPhase}</p>
                    </span>
                    <br />
                    <br />
                </div>
            ))}
        </div>
    );
};

export default Vaccine;
