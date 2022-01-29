module.exports = {
  async up(queryInterface) {
    try {
      await queryInterface.removeColumn(
        'users',
        'cpf',
      );
    } catch (error) {
      console.log(error.message);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'users',
      'cpf',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    );
  },
};
