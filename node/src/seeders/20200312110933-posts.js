'use strict';

const db = require('./../models');

function generateText(maxLength) {
  const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  const length = Math.round(Math.random() * (maxLength - 4) + 4);
  const start = Math.round(Math.random() * text.length - length - 1);

  return text.substr(start, length);
}

module.exports = {
  async up (queryInterface) {
    const users = await db.User.findAll();

    const promises = [];
    users.forEach((user) => {
      for (let i = 0; i < 20; i++) {
        const title = generateText(64);
        const body = generateText(255);

        promises.push(queryInterface.bulkInsert('posts', [{
          title,
          body,
          userId: user.id
        }]));
      }
    });

    return Promise.all(promises);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', null);
  }
};
