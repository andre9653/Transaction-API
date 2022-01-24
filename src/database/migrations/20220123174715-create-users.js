module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('users', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING.BINARY,
          allowNull: false,
          select: false,
        },
        cpf: {
          type: Sequelize.BIGINT(12),
          allowNull: false,
          select: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          select: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          select: false,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};
