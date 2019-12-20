const securityConfig = require('./../../config/security');
const jwt = require('jsonwebtoken');
const db = require('./../models');
const userSerializer = require('./../serializers/user');
const UnauthorizedHttpError = require('./../common/errors/UnauthorizedHttpError');

class Auth {
  static async authorization (req, res, next) {
    const token = req.headers['x-access-token'];

    let decoded;
    try {
      decoded = jwt.verify(token, securityConfig.secret);
    } catch (err) {
      throw new UnauthorizedHttpError('Invalid or expired token');
    }
    // Find user by token payload
    const user = await db.User.findByPk(decoded.id);
    if (user === null) {
      throw new UnauthorizedHttpError('User not found');
    }
    // Set current user
    req.user = user;

    return next();
  }

  static async authentication(req, res) {
    const authData = userSerializer.deserialize(req.body, [ 'auth' ]);

    const user = await db.User.findOne({
      where: {
        username: authData.username
      }
    });
    if (user === null) {
      throw new UnauthorizedHttpError('User not found');
    }
    if (!user.validatePassword(authData.password)) {
      throw new UnauthorizedHttpError('Incorrect password');
    }

    const exp = (Math.floor(Date.now() / 1000) + securityConfig.tokenExpireTime);
    const token = jwt.sign({
      id: user.id,
      username: user.username,
      exp
    }, securityConfig.secret, { algorithm: 'HS256' });

    res.json({ token });
  }
}

module.exports = Auth;
