import { features } from '../data/countriesGeo.json';
import axios from 'axios';
import legendItems from '../entities/LegendItems';

class LoadCountriesTask {
    mapCountries = features;

    getCovidData = async () => {
        let response;
        try {
            response = await axios.get(
                'https://corona.lmao.ninja/v2/countries'
            );
        } catch (e) {
            console.log(e);
            return;
        }

        let { data } = response;

        if (!Array.isArray(data) && !data.length > 0) return;

        return data;
    };

    numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    setState = null;

    load = async (setState) => {
        this.setState = setState;
        let covidData = await this.getCovidData();

        console.log(covidData);
        console.log(this.mapCountries);

        for (let i = 0; i < this.mapCountries.length; i++) {
            const mapCountry = this.mapCountries[i];
            const covidCountry = covidData.find(
                (covidCountry) =>
                    covidCountry.countryInfo.iso3 ===
                    mapCountry.properties.ISO_A3
            );

            mapCountry.properties.confirmed = 0;
            mapCountry.properties.confirmedCases = '0';
            mapCountry.properties.deaths = 0;
            mapCountry.properties.totalDeaths = '0';
            mapCountry.properties.recovered = 0;
            mapCountry.properties.totalRecovered = '0';
            mapCountry.properties.lat = 0;
            mapCountry.properties.lng = 0;

            if (covidCountry != null) {
                const confirmed = Number(covidCountry.cases);
                mapCountry.properties.confirmed = confirmed;
                mapCountry.properties.confirmedCases = this.numberWithCommas(
                    confirmed
                );
                const deaths = Number(covidCountry.deaths);
                mapCountry.properties.deaths = deaths;
                mapCountry.properties.totalDeaths = this.numberWithCommas(
                    deaths
                );
                const recovered = Number(covidCountry.recovered);
                mapCountry.properties.recovered = recovered;
                mapCountry.properties.totalRecovered = this.numberWithCommas(
                    recovered
                );
                // const lat = Number(covidCountry.countryInfo.lat);
                // const lng = Number(covidCountry.countryInfo.long);
            }

            this.setCountryColor(mapCountry);
        }

        this.setState(this.mapCountries);
    };

    setCountryColor = (country) => {
        const legendItem = legendItems.find((legendItem) =>
            legendItem.isFor(country.properties.confirmed)
        );

        if (legendItem != null) {
            country.properties.color = legendItem.color;
        }
    };
}

export default LoadCountriesTask;
