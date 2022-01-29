module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('accounts', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        account_id: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        amount: {
          type: Sequelize.DECIMAL(10, 2),
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
    await queryInterface.dropTable('accounts');
  },
};
