const Serializer = require('./../helpers/serializer');
const db = require('./../models');

/**
 * @swagger
 * definitions:
 *   Post[view]:
 *     properties:
 *       id:
 *         type: integer
 *       userId:
 *         type: integer
 *       title:
 *         type: string
 *       body:
 *         type: string
 *   Post[create]:
 *     required:
 *       - title
 *       - body
 *     properties:
 *       title:
 *         type: string
 *       body:
 *         type: string
 *   Post[update]:
 *     required:
 *       - title
 *       - body
 *     properties:
 *       title:
 *         type: string
 *       body:
 *         type: string
 */
module.exports = new Serializer(db.Post, {
  id: ['view'],
  userId: ['view'],
  title: ['view', 'create', 'update'],
  body: ['view', 'create', 'update']
}, {
  user: () => require('./user')
});
