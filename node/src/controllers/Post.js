const db = require('./../models');
const postSerializer = require('./../serializers/post');
const NotFoundHttpError = require('./../common/errors/NotFoundHttpError');

class PostController {
  static async list (req, res) {
    // TODO: Parser query parameter
    const page = !isNaN(req.query.page) ? parseInt(req.query.page, 10) : 0;
    const limit = !isNaN(req.query.limit) ? parseInt(req.query.limit, 10) : 10;
    const offset = limit * parseInt(page, 10);

    const result = await db.Post.findAndCountAll({
      offset,
      limit
    });

    res.set({
      'X-Pagination-Total-Count': result.count,
      'X-Pagination-Current-Page': page,
      'X-Pagination-Per-Page': limit
    });
    res.json(postSerializer.serialize(result.rows, [ 'view' ]));
  }

  static async detail (req, res) {
    res.json(postSerializer.serialize(req.paramsData.post, [ 'view' ]));
  }

  static async create (req, res) {
    // Deserialize request body data
    const data = postSerializer.deserialize(req.body, [ 'create' ]);
    // Set current user
    data.userId = req.user.id;
    const post = await db.Post.create(data);

    res.json(postSerializer.serialize(post, [ 'view' ]));
  }

  static async put (req, res) {
    const post = req.paramsData.post;

    // Deserialize update data
    const data = postSerializer.deserialize(req.body, [ 'update' ], true);
    await post.update(data);

    res.json(postSerializer.serialize(post, [ 'view' ]));
  }

  static async patch (req, res) {
    const post = req.paramsData.post;

    // Deserialize update data
    const data = postSerializer.deserialize(req.body, [ 'update' ]);
    await post.update(data);

    res.json(postSerializer.serialize(post, [ 'view' ]));
  }

  static async delete (req, res) {
    const post = req.paramsData.post;
    await post.destroy();

    return res.json();
  }

  static async getPostById (req, res, next, postId) {
    const post = await db.Post.findByPk(postId);
    if (post === null) {
      throw new NotFoundHttpError();
    }

    req.paramsData.post = post;
    next();
  }
}

module.exports = PostController;
