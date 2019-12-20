const debugDb = require('debug')('app:db');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const routes = require('./routes');
const app = express();
const db = require('./models');
const errorHandler = require('./helpers/errorHandler');
const NotFoundHttpError = require('./common/errors/NotFoundHttpError');

// Check db connection
db.sequelize
  .authenticate()
  .then(() => {
    debugDb('Connection has been established successfully.');
  })
  .catch(err => {
    debugDb('Unable to connect to the database:', err);
  })
;

// CORS
if (process.env.HOST_FRONTEND) {
  const cors = require('cors');
  const corsOptions = {
    origin: `https://${process.env.HOST_FRONTEND}`,
    optionsSuccessStatus: 200
  };
  app.use(cors(corsOptions));
}

// Logger
app.use(logger('dev'));

// Encode
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static
app.use(express.static(path.join(__dirname, 'public')));

// App Routes
routes(app);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(new NotFoundHttpError());
});

// Error handler
app.use(errorHandler);

module.exports = app;
