const casual = require('casual');

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'users',
    [
      {
        id: 1,
        name: casual.name,
        email: casual.email,
        cpf: Date.now().toString().substring(0, 11),
        password: casual.password,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: casual.name,
        email: casual.email,
        cpf: Date.now().toString().substring(0, 11),
        password: casual.password,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: casual.name,
        email: casual.email,
        cpf: Date.now().toString().substring(0, 11),
        password: casual.password,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        name: casual.name,
        email: casual.email,
        cpf: Date.now().toString().substring(0, 11),
        password: casual.password,
        created_at: new Date(),
        updated_at: new Date(),

      },
    ],

    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};
