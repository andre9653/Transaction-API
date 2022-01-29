module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('transactions', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        value: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        user_id_payment: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        user_id_receiver: {
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
    await queryInterface.dropTable('transactions');
  },
};
