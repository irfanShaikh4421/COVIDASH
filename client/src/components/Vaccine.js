import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const Vaccine = () => {
    const [vaccineData, setVaccineData] = useState([]);

    useEffect(() => {
        async function getData() {
            const url = 'https://disease.sh/v3/covid-19/vaccine';

            let response;
            try {
                response = await axios.get(url);
                setVaccineData(response.data.data);
            } catch (e) {
                console.log(e);
            }
        }
        getData();
    }, []);

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
                                        ) /**at this point, all that're left are literally greek to me. */
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
