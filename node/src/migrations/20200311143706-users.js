'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING(64),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false
      }
    }, {
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    });
  },

  down: (queryInterface) => {
    return  queryInterface.dropTable('users');
  }
};
