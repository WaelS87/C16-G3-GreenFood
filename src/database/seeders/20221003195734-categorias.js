'use strict';

const categories = [
  {
    name : "Dietetica",
    createdAt : new Date()
  },
  {
    name : "Veggie",
    createdAt : new Date()
  },
  {
    name : "Snacks",
    createdAt : new Date()
  },
  {
    name : "Suplementos",
    createdAt : new Date()
  },
  {
    name : "Varios",
    createdAt : new Date()
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Categories', categories, {});

  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Categories', null, {});

  }
};
