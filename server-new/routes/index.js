const newsRoutes = require('./news');
const userRoutes = require('./users');

const constructorMethod = (app) => {
    app.use('/news/', newsRoutes);
    app.use('/user/', userRoutes);

    app.use('*', (req, res) => {
        res.json({ error: 404 });
    });
};

module.exports = constructorMethod;
