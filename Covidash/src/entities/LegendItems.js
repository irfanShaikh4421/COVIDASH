import LegendItem from './LegendItem';

const legendItems = [
    new LegendItem(
        '1,000,000 +',
        '#741f1f',
        (cases) => cases >= 1000000,
        'white'
    ),
    new LegendItem(
        '500,000 - 999,999',
        '#9c2929',
        (cases) => cases >= 500000 && cases < 1000000,
        'white'
    ),
    new LegendItem(
        '200,000 - 499,999',
        '#c57f7f',
        (cases) => cases >= 200000 && cases < 500000
    ),
    new LegendItem(
        '50,000 - 199,999',
        '#d8aaaa',
        (cases) => cases >= 50000 && cases < 200000
    ),
    new LegendItem(
        '0 - 49,999',
        '#ebd4d4',
        (cases) => cases > 0 && cases < 50000
    ),
    new LegendItem('No Data', '#ffffff', (cases) => true),
];

export default legendItems;
