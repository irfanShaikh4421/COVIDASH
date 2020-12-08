import React, { useEffect, useState } from 'react';
import countries from '../data/countries-iso2.json';
import axios from 'axios';
import '../App.css';

const News = () => {
    const [country, setCountry] = useState('in');
    const [newsData, setNewsData] = useState([]);
    const [tailored, setTailored] = useState(false);
    const [newsLoading, setNewsLoading] = useState(true);

    useEffect(() => {
        async function getNews() {
            setNewsLoading(true);

            let response = await axios.get(`/news/${country}`);
            let data = response.data.news;
            setNewsData(data);

            setNewsLoading(false);

            if (response.data.tailored === true) setTailored(true);
            else setTailored(false);
        }
        getNews();
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
                <option selected>Choose country</option>
                {countries.map((country, index) => (
                    <option key={index} value={country['alpha-2']}>
                        {country.name}
                    </option>
                ))}
            </select>
            <br />
            <br />
            <div>
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
                        <a
                            className="tota11yLink"
                            href={item.url}
                            target="blank"
                        >
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
        </div>
    );
};

export default News;
