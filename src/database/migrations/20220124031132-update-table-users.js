module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn(
        'users',
        'amount',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      );
    } catch (error) {
      console.log(error.message);
    }
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};
