if (process.env.NODE_ENV === 'development') {
  require('dotenv').config('/.env');
}
// const SwaggerExpress = require('swagger-express-mw');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const { sequelize } = require('./data');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./api/swagger/swagger.yaml');

sequelize.sync();

const restaurantRouter = require('./api/routes/restaurants');
const reviewRouter = require('./api/routes/reviews');

const app = express();
app.use(express.json());
app.use(cors());
  app.use(helmet({
    frameguard: false,
  }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/restaurants', restaurantRouter);
app.use('/reviews', reviewRouter);

module.exports = app;
