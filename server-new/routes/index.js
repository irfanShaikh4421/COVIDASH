const newsRoutes = require('./news');

const constructorMethod = (app) => {
    app.use('/', newsRoutes);

    app.use('*', (req, res) => {
        res.json({ error: 404 });
    });
};

module.exports = constructorMethod;
