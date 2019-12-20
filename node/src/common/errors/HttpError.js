
/**
 * @swagger
 * definitions:
 *   HttpError:
 *     type: object
 *     properties:
 *       code:
 *         type: integer
 *         default: 500
 *         enum:
 *           - 500
 *           - 400
 *           - 401
 *           - 404
 *       title:
 *         type: string
 *         default: 'Server error'
 *         enum:
 *           - 'Server error'
 *           - 'Request error'
 *           - 'Validation error'
 *           - 'Unauthorized error'
 *       message:
 *         type: string
 */
class HttpError extends Error {
  constructor (status = 500, message, previous) {
    super(message);
    this.type = 'Server error';
    this.status = status;
    this.original = previous;
  }
}


module.exports = HttpError;
