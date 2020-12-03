import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const News = (props) => {
    let [newsData, setData] = useState([]);
    let [newsLoading, setNewsLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            const url =
                'https://newsapi.org/v2/top-headlines?q=covid&from=2020-11-10&language=en&sortBy=publishedAt&apiKey=ec4091ce10534690baa4b9f4d5ba7af2&pageSize=100';
            let getData;
            try {
                getData = await axios.get(url);
                setData(getData.data.articles);
                setNewsLoading(false);
            } catch (e) {
                console.log(e);
            }
        }
        getData();
    }, []);

    if(newsLoading){
        return <div>Loading...</div>;
    }

    console.log(newsData);

    return (
        <div>
            <h2>Latest News</h2>
            <br />
            {newsData.map((item, index) => (
                <div key={index}>
                    {item.urlToImage && <img src={item.urlToImage} width="300" alt={`${item.source.name} article`}></img>}
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
