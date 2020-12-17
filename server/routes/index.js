const newsRoutes = require('./news');
const userRoutes = require('./users');
const testRoutes = require('./testingLocations');
const travelRoutes = require('./travelRegulations');
const hospitalRoute = require('./hospitalBeds');
const vaccineRoute = require('./vaccine');

const constructorMethod = (app) => {
    app.use('/news/', newsRoutes);
    app.use('/user/', userRoutes);
    app.use('/testing', testRoutes);
    app.use('/travel', travelRoutes);
    app.use('/hospitals', hospitalRoute);//weird potential bug, briefly displays an "Error 404" before sending correct response
    app.use('/vaccine', vaccineRoute);

    app.use('*', (req, res) => {
        res.json({ error: 404 });
    });
};

module.exports = constructorMethod;
