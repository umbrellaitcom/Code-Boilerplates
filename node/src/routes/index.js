'use strict';

const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./../swagger');

module.exports = (app) => {
  // Test ping route.
  app.get('/ping', (req, res) => {
    res.send('pong');
  });

  // API v1.
  const api = require('./api');
  app.use('/api/v1', api);

  // Swagger specs
  app.get('/api-docs.json', (req, res) => res.json(swaggerSpecs));
  // Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
};
