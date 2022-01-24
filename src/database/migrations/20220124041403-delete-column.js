module.exports = {
  async up(queryInterface) {
    try {
      await queryInterface.removeColumn(
        'users',
        'amount',
      );
    } catch (error) {
      console.log(error.message);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'users',
      'amount',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    );
  },
};
