const newsRoutes = require('./news');
const photoRoutes = require('./photo');

const constructorMethod = (app) => {
    app.use('/', newsRoutes);
    app.use('/photo', photoRoutes);

    app.use('*', (req, res) => {
        res.json({ error: 404 });
    });
};

module.exports = constructorMethod;
