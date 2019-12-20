const RequestHttpError = require('./RequestHttpError');

/**
 * @swagger
 * definitions:
 *   NotFoundHttpError:
 *     allOf:
 *       - $ref: '#/definitions/RequestHttpError'
 *       - properties:
 *           code:
 *             type: integer
 *             default: 404
 *           title:
 *             type: string
 *             default: 'Request error'
 *
 */
class NotFoundHttpError extends RequestHttpError {
  constructor (message, previous) {
    super(message, previous);
    this.message = message || 'Not Found';
    this.status = 404;
  }
}


module.exports = NotFoundHttpError;
