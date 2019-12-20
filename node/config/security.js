module.exports = {
  secret: process.env.SECRET,
  tokenExpireTime: parseInt(process.env.TOKEN_EXPIRE_TIME, 10)
};
