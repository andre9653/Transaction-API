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
        amount: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        account_payer_id: {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
            model: 'accounts',
            key: 'account_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        account_receiver_id: {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
            model: 'accounts',
            key: 'account_id',
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
