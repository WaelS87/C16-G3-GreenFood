'use strict';

const avatarsDB = require("../../data/avatars.json")

const avatars = avatarsDB.map(avatar => {
  return {
    ...avatar,
    createdAt : new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Avatars', avatars, {});

  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Avatars', null, {});

  }
};

