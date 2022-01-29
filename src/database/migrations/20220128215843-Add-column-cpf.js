module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn(
        'users',
        'cpf',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
          unique: true,
        },
      );
    } catch (error) {
      console.log(error.message);
    }
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(
      'users',
      'cpf',
    );
  },
};
