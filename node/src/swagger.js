const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  // List of files to be processed.
  apis: [
    // Models
    './src/serializers/*.js',
    // Paths
    './src/routes/api/*.js',
    // Error models
    './src/common/errors/*HttpError.js',
    // Error responses
    './src/helpers/errorHandler.js'
  ],
  swaggerDefinition: {
    host: process.env.HOST_BACKEND || 'localhost:3000',
    basePath: '/api/v1/',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'Code sample Node.js',
      description: 'Swagger: swagger-jsdoc + swagger-ui-express',
      swagger: '2.0',
      version: '0.0.1'
    },
  },
};
const specs = swaggerJSDoc(options);

module.exports = specs;
