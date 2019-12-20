'use strict';

const express = require('express');
const router = express.Router();
const wrapErrorHandler = require('./../../helpers/wrapErrorHandler');
// Controllers
const Auth = require('./../../controllers/Auth');
const Post = require('./../../controllers/Post');

// Init paramsData object. Init req.paramsData object. Used for data obtained from params through router.param
router.use((req, res, next) => {
  req.paramsData = {};
  next();
});

/* AUTH */

router.route('/auth')
  /**
   * @swagger
   * /auth:
   *   post:
   *     description: Login to the application
   *     tags: [Auth]
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: User
   *         schema:
   *           $ref: '#/definitions/User[auth]'
   *     responses:
   *       200:
   *         description: Token
   *         schema:
   *           type: object
   *           properties:
   *             token:
   *               type: string
   *       401:
   *         $ref: '#/responses/UnauthorizedError'
   */
  .post(wrapErrorHandler(Auth.authentication))
;

/**
 * AUTHORIZATION. All routes below require authorization.
 *
 * @swagger
 * securityDefinitions:
 *   ApiKeyAuth:
 *     type: apiKey
 *     in: header
 *     name: X-Access-Token
 */
router.use(wrapErrorHandler(Auth.authorization));

/* POST */

router.route('/posts')
  /**
   * @swagger
   * /posts:
   *   get:
   *     summary: Get a list of posts
   *     tags: [Posts]
   *     produces:
   *       - application/json
   *     security:
   *       - ApiKeyAuth: []
   *     responses:
   *       200:
   *         description: List posts
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/Post[view]'
   *         headers:
   *           X-Pagination-Total-Count:
   *             type: integer
   *             description: Total count
   *           X-Pagination-Current-Page:
   *             type: integer
   *             description: Current page
   *           X-Pagination-Per-Page:
   *             type: integer
   *             description: Limit per page
   *       400:
   *         $ref: '#/responses/RequestError'
   *       401:
   *         $ref: '#/responses/UnauthorizedError'
   *       500:
   *         $ref: '#/responses/Error'
   */
  .get(wrapErrorHandler(Post.list))
  /**
   * @swagger
   * /posts:
   *   post:
   *     summary: Create post
   *     tags: [Posts]
   *     produces:
   *       - application/json
   *     security:
   *       - ApiKeyAuth: []
   *     parameters:
   *       - in: body
   *         name: Post
   *         schema:
   *           $ref: '#/definitions/Post[create]'
   *     responses:
   *       200:
   *         description: Created post object
   *         schema:
   *           type: object
   *           $ref: '#/definitions/Post[view]'
   *       400:
   *         $ref: '#/responses/ValidationError'
   *       401:
   *         $ref: '#/responses/UnauthorizedError'
   *       500:
   *         $ref: '#/responses/Error'
   */
  .post(wrapErrorHandler(Post.create))
;
router.param('postId', wrapErrorHandler(Post.getPostById));
router.route('/posts/:postId')
  /**
   * @swagger
   * /posts/{postId}:
   *   get:
   *     summary: Returns a post by ID.
   *     tags: [Posts]
   *     produces:
   *       - application/json
   *     security:
   *       - ApiKeyAuth: []
   *     parameters:
   *       - in: postId
   *         name: Post ID
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Created post object
   *         schema:
   *           type: object
   *           $ref: '#/definitions/Post[view]'
   *       400:
   *         $ref: '#/responses/RequestError'
   *       401:
   *         $ref: '#/responses/UnauthorizedError'
   *       404:
   *         $ref: '#/responses/NotFoundError'
   *       500:
   *         $ref: '#/responses/Error'
   */
  .get(wrapErrorHandler(Post.detail))
  /**
   * @swagger
   * /posts/{postId}:
   *   put:
   *     summary: Put update the post
   *     tags: [Posts]
   *     produces:
   *       - application/json
   *     security:
   *       - ApiKeyAuth: []
   *     parameters:
   *       - in: postId
   *         name: Post ID
   *         required: true
   *         type: integer
   *       - in: body
   *         name: Post
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Post[update]'
   *     responses:
   *       200:
   *         description: Updated post object
   *         schema:
   *           type: object
   *           $ref: '#/definitions/Post[view]'
   *       400:
   *         $ref: '#/responses/ValidationError'
   *       401:
   *         $ref: '#/responses/UnauthorizedError'
   *       404:
   *         $ref: '#/responses/NotFoundError'
   *       500:
   *         $ref: '#/responses/Error'
   */
  .put(wrapErrorHandler(Post.put))
  /**
   * @swagger
   * /posts/{postId}:
   *   patch:
   *     summary: Patch update the post
   *     tags: [Posts]
   *     produces:
   *       - application/json
   *     security:
   *       - ApiKeyAuth: []
   *     parameters:
   *       - in: postId
   *         name: Post ID
   *         required: true
   *         type: integer
   *       - in: body
   *         name: Post
   *         schema:
   *           $ref: '#/definitions/Post[update]'
   *     responses:
   *       200:
   *         description: Updated post object
   *         schema:
   *           type: object
   *           $ref: '#/definitions/Post[view]'
   *       400:
   *         $ref: '#/responses/ValidationError'
   *       401:
   *         $ref: '#/responses/UnauthorizedError'
   *       404:
   *         $ref: '#/responses/NotFoundError'
   *       500:
   *         $ref: '#/responses/Error'
   */
  .patch(wrapErrorHandler(Post.patch))
  /**
   * @swagger
   * /posts/{postId}:
   *   delete:
   *     summary: Delete the post
   *     tags: [Posts]
   *     produces:
   *       - application/json
   *     security:
   *       - ApiKeyAuth: []
   *     parameters:
   *       - in: postId
   *         name: Post ID
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Post deleted (empty body)
   *       401:
   *         $ref: '#/responses/UnauthorizedError'
   *       404:
   *         $ref: '#/responses/NotFoundError'
   *       500:
   *         $ref: '#/responses/Error'
   */
  .delete(wrapErrorHandler(Post.delete))
;

module.exports = router;
