if (process.env.NODE_ENV === 'development') {
  require('dotenv').config('/.env');
}
// const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
const swaggerUi = require('swagger-ui-express');
const { sequelize } = require('./data');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./api/swagger/swagger.yaml');

sequelize.sync();

const restaurantRouter = require('./api/routes/restaurant');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/restaurants', restaurantRouter);

module.exports = app;
