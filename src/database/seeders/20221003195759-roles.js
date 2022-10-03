'use strict';

const rols = [
  {
    name : "Administrador",
    createdAt : new Date()
  },
  {
    name : "Usuario",
    createdAt : new Date()
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Rols', rols, {});

  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Rols', null, {});

  }
};
