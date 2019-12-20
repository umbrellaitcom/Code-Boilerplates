const Serializer = require('./../helpers/serializer');
const db = require('./../models');

/**
 * @swagger
 * definitions:
 *   User[auth]:
 *     required:
 *       - username
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 */
module.exports = new Serializer(db.User, {
  id: false,
  username: ['auth'],
  password: ['auth']
}, {
  posts: () => require('./post')
});
