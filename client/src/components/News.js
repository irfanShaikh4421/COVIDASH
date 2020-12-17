import React, { useEffect, useState, useContext } from 'react';
import countries from '../data/countries-iso2.json';
import { LocationContext } from '../LocationContext';
import axios from 'axios';
import '../App.css';

const iso2Indexer = [4, 248, 8, 12, 16, 20, 24, 660, 10, 28, 32, 51, 533, 36, 40, 31, 44, 48, 50, 52, 112, 56, 84, 204, 60, 64, 68, 535, 70, 72, 74, 76, 86, 96, 100, 854, 108, 132, 116, 120, 124, 136, 140, 148, 152, 156, 162, 166, 170, 174, 178, 180, 184, 188, 384, 191, 192, 531, 196, 203, 208, 262, 212, 214, 218, 818, 222, 226, 232, 233, 748, 231, 238, 234, 242, 246, 250, 254, 258, 260, 266, 270, 268, 276, 288, 292, 300, 304, 308, 312, 316, 320, 831, 324, 624, 328, 332, 334, 336, 340, 344, 348, 352, 356, 360, 364, 368, 372, 833, 376, 380, 388, 392, 832, 400, 398, 404, 296, 408, 410, 414, 417, 418, 428, 422, 426, 430, 434, 438, 440, 442, 446, 450, 454, 458, 462, 466, 470, 584, 474, 478, 480, 175, 484, 583, 498, 492, 496, 499, 500, 504, 508, 104, 516, 520, 524, 528, 540, 554, 558, 562, 566, 570, 574, 807, 580, 578, 512, 586, 585, 275, 591, 598, 600, 604, 608, 612, 616, 620, 630, 634, 638, 642, 643, 646, 652, 654, 659, 662, 663, 666, 670, 882, 674, 678, 682, 686, 688, 690, 694, 702, 534, 703, 705, 90, 706, 710, 239, 728, 724, 144, 729, 740, 744, 752, 756, 760, 158, 762, 834, 764, 626, 768, 772, 776, 780, 788, 792, 795, 796, 798, 800, 804, 784, 826, 840, 581, 858, 860, 548, 862, 704, 92, 850, 876, 732, 887, 894, 716];
//const iso2Indexer = [32, 36, 40, 56, 76, 100, 124, 156, 170, 192, 203, 818, 250, 276, 300, 344, 348, 356, 360, 372, 376, 380, 392, 410, 428, 440, 458, 484, 504, 528, 554, 566, 578, 608, 616, 620, 642, 643, 682, 688, 702, 703, 705, 710, 752, 756, 158, 764, 792, 804, 784, 826, 840, 862];

const News = () => {
    const [ location ] = useContext(LocationContext);
    const [newsData, setNewsData] = useState([]);
    const [tailored, setTailored] = useState(false);
    const [newsLoading, setNewsLoading] = useState(true);
    const [error, setError] = useState(undefined);

    function findCountry(countryId){//countryID should be passed as location context.countryCode
        let countryIndex = null;
        if (countryId === 0 ) {
            return 'zz';//'zz' signifies that world news is the originally desired return data
        }
        countryIndex = iso2Indexer.indexOf(countryId);//getting the index of the Iso2 in iso2.json using countryId
        if(countryIndex === -1){//if not in iso2.json, then default to the World
            return 'aa';//this will result in an output of world news, but 'aa' specificly will signify that the desired data was not originally the world data (and is not contained in the iso2) 
        }else{
            return countries[countryIndex]["alpha-2"];//the user's preferred  country's iso2
        }
    }

    const [country, setCountry] = useState(findCountry(location.countryCode));

    useEffect(() => {
        async function getNews() {
            setNewsLoading(true);
            try{
                let response = await axios.get(`/news/${country}`);
                let data = response.data.news;
                setNewsData(data);
                if (response.data.tailored === true) setTailored(true);
            else setTailored(false);
            }catch(e){
                console.log(e);
                setError(e);
            }

            setNewsLoading(false);
        }
        getNews();
    }, [country]);

    if(error){
        return <h1>{error.name}: {error.message}</h1>;
    }

    if (newsLoading) {
        return <div>Loading...</div>;
    }

    const handleChange = (e) => {
        if (e.target.value) setCountry(e.target.value);
    };

    return (
        <div>
            <label htmlFor="state">Select country: &nbsp;&nbsp;</label>
            <select defaultValue={country} onChange={handleChange}>
                <option value="zz">Planet Earth</option>
                {countries.map((country, index) => (
                    <option key={index} value={country['alpha-2']}>
                        {country.name}
                    </option>
                ))}
            </select>
            <br />
            <br />
            <div>
                <h1>Latest Covid News</h1>
                <hr style={{width: '27%'}} />
                {tailored ? (
                    <h2>News for region</h2>
                ) : (country==="zz") ? 
                        <h2>News for World</h2> :
                        <h2>
                            Sorry, no recent news found for the desired region - here is the top
                            news for COVID-19 from around the world
                        </h2>
                }
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
