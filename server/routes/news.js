const express = require('express');
const router = express.Router();
const data = require('../data');
const newsData = data.news;

router.get('/:country', async (req, res) => {
    const country = req.params.country;
    let news;
    try {
        news = await newsData.getNews(country);
        res.send(news);
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
