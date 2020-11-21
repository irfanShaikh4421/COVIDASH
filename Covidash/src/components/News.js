import React, { useEffect, useState } from 'react';
import axios from 'axios';

const News = (props) => {
    let [newsData, setData] = useState([]);

    useEffect(() => {
        async function getData() {
            const url =
                'https://newsapi.org/v2/top-headlines?q=covid&from=2020-11-10&language=en&sortBy=publishedAt&apiKey=ec4091ce10534690baa4b9f4d5ba7af2&pageSize=100';
            let getData;
            try {
                getData = await axios.get(url);
                setData(getData.data.articles);
            } catch (e) {
                console.log(e);
            }
        }
        getData();
        console.log(newsData);
    }, []);

    return (
        <div>
            <h2>Latest News</h2>
            <br />
            {newsData.map((item, index) => (
                <p key={index}>
                    <img src={item.urlToImage} width="300"></img>
                    <br />
                    <a href={item.url} target="blank">
                        {item.title}
                    </a>
                    <br />
                    {item.publishedAt}
                    <br />
                    {item.description}
                    <br />
                    {item.content}
                    <br />
                    <br />
                </p>
            ))}
        </div>
    );
};

export default News;
