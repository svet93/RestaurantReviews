if (process.env.NODE_ENV === 'development') {
  require('dotenv').config('/.env');
}
// const SwaggerExpress = require('swagger-express-mw');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const { sequelize } = require('./data');

const swaggerDocument = YAML.load('./api/swagger/swagger.yaml');

sequelize.sync();

const passport = require('./api/helpers/passport');

const restaurantRouter = require('./api/routes/restaurants');
const reviewRouter = require('./api/routes/reviews');
const userRouter = require('./api/routes/users');
const authRouter = require('./api/routes/auth');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet({
  frameguard: false,
}));
app.use(passport.initialize());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/auth', authRouter);
app.use('/restaurants', passport.authenticate('jwt'), restaurantRouter);
app.use('/reviews', passport.authenticate('jwt'), reviewRouter);
app.use('/users', passport.authenticate('jwt'), userRouter);

module.exports = app;
