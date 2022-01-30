module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'users',
    [
      {
        id: 1,
        name: 'John Doe',
        email: 'test@email.com',
        cpf: '10214569871',
        password: '9ff7b641722c30acdc058f2499d97dd8',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'John Travolta',
        email: 'test2@email.com',
        cpf: '56871569871',
        password: '082b66a712e3efe31385f3158e057496',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: 'Jym Carrey',
        email: 'test.email@email.com',
        cpf: '12358594569',
        password: 'ssf52af165f1das5f1as6df41sa65fda6f',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        name: 'Vim Diesel',
        email: 'test2.email@email.com',
        cpf: '65771256957',
        password: '20s63a2s6a6da1s52a1d56a1sa651dsa5s',
        created_at: new Date(),
        updated_at: new Date(),

      },
    ],

    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};
