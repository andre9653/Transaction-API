module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('amounts', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        amount: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
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
    await queryInterface.dropTable('amounts');
  },
};
