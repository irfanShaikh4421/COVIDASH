const newsRoutes = require('./news');
const userRoutes = require('./users');
const testRoutes = require('./testingLocations');
const travelRoutes = require('./travelRegulations');

const constructorMethod = (app) => {
    app.use('/news/', newsRoutes);
    app.use('/user/', userRoutes);
    app.use('/testing', testRoutes);
    app.use('/travel', travelRoutes);

    app.use('*', (req, res) => {
        res.json({ error: 404 });
    });
};

module.exports = constructorMethod;
