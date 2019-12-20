'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('posts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING(128),
        allowNull: false
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: ''
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        }
      }
    }, {
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    });
  },

  down: (queryInterface) => {
    return  queryInterface.dropTable('posts');
  }
};
