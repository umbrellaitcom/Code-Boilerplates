'use strict';

const Sequelize = require('sequelize');
const config = require(__dirname + '/../../config/db');
// Connection
const sequelize = new Sequelize(config.database, config.username, config.password, { ...config, logging: false });

// Require models
const Post = require("./Post");
const User = require("./User");

// Init models
const models = {
  Post: Post.init(sequelize, Sequelize),
  User: User.init(sequelize, Sequelize)
};

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => model.associate(models));

// Sync
// sequelize.sync({ force: true });

const db = {
  ...models,
  sequelize,
  Sequelize
};

module.exports = db;
