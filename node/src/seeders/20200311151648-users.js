'use strict';

const db = require('./../models');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', [{
      username: 'test-1',
      password: db.User.generateHash('umbrellapassword1')
    }, {
      username: 'test-2',
      password:  db.User.generateHash('umbrellapassword1')
    }]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', null);
  }
};
