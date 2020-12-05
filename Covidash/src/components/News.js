import React, { useEffect, useState } from 'react';
import countries from '../data/countries-iso2.json';
import axios from 'axios';
import '../App.css';

const News = () => {
    const [country, setCountry] = useState('af');
    const [newsData, setData] = useState([]);
    const [tailored, setTailored] = useState(false);
    const [newsLoading, setNewsLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            const baseUrl = 'https://newsapi.org/v2/top-headlines';

            const q = 'q=covid';

            let countryParam;
            if (country) {
                countryParam = country.toLowerCase();
            }

            const apiKey = 'apiKey=ec4091ce10534690baa4b9f4d5ba7af2';

            const url =
                baseUrl + '?' + q + '&country=' + countryParam + '&' + apiKey;

            let response;
            try {
                response = await axios.get(url);

                if (!response.data.articles.length) {
                    setTailored(false);
                    response = await axios.get(
                        baseUrl + '?' + q + '&' + apiKey
                    );
                    setData(response.data.articles);
                } else {
                    setTailored(true);
                    setData(response.data.articles);
                }
                setNewsLoading(false);
            } catch (e) {
                console.log(e);
            }
        }
        getData();
    }, [country]);

    if (newsLoading) {
        return <div>Loading...</div>;
    }

    const handleChange = (e) => {
        if (e.target.value) setCountry(e.target.value);
    };

    return (
        <div>
            <label htmlFor="state">Select country &nbsp;&nbsp;</label>
            <select onChange={handleChange}>
                {countries.map((country, index) => (
                    <option key={index} value={country['alpha-2']}>
                        {country.name}
                    </option>
                ))}
            </select>
            <br />
            <br />
            <h1>Latest News</h1>
            <br />
            {tailored ? (
                <h2>News for your region</h2>
            ) : (
                <h2>
                    Sorry, no news found for your region - here are some top
                    news for COVID-19
                </h2>
            )}
            <br />
            {newsData.map((item, index) => (
                <div key={index}>
                    {item.urlToImage && (
                        <img
                            src={item.urlToImage}
                            width="300"
                            alt={`${item.source.name} article`}
                        ></img>
                    )}
                    <br />
                    <a className="tota11yLink" href={item.url} target="blank">
                        {item.title}
                    </a>
                    <br />
                    {new Date(item.publishedAt).toLocaleString('en-US')}
                    <br />
                    {item.description}
                    <br />
                    {item.content}
                    <br />
                    <hr />
                    <br />
                </div>
            ))}
        </div>
    );
};

export default News;
