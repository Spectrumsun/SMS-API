'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      message: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      senderNumber: {
        type: Sequelize.TEXT,
        onDelete: 'cascade',
        allowNull: true,
        references: {
          model: 'Contacts',
          key: 'id',
          as: 'sent',
        },
      },
      receiverNumber: {
        type: Sequelize.TEXT,
        onDelete: 'cascade',
        allowNull: false,
        references: {
          model: 'Contacts',
          key: 'id',
          as: 'received',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Messages');
  }
};