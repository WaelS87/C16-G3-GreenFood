'use strict';

<<<<<<< HEAD
const usersDB = require("../../data/users.json")

const users = usersDB.map(user => {
  return {
    ...user,
    createdAt : new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Users', users, {});

  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Users', null, {});

=======
const {hashSync} = require('bcryptjs')

const users = [
  {
    name : 'admin',
    surname : 'admin',
    email : 'admin@gmail.com',
    password : hashSync("123123",10),
    avatar : null,
    rolId : 1,
    createdAt : new Date()
  },
  {
    name : 'user',
    surname : 'user',
    email : 'user@gmail.com',
    password : hashSync("123123",10),
    avatar : null,
    rolId : 2,
    createdAt : new Date()
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('Users', users, {});
    
  },

  async down (queryInterface, Sequelize) {
 
     await queryInterface.bulkDelete('Users', null, {});
     
>>>>>>> carro_wael
  }
};