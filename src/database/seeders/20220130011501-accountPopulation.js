module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'accounts',
    [
      {
        account_id: '123564898',
        amount: 10000,
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        account_id: '123456792',
        amount: 120000,
        user_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        account_id: '651984965',
        amount: 150000,
        user_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        account_id: '749486132',
        amount: 5000,
        user_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],

    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('accounts', null, {}),
};
