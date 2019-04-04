'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    message: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    senderNumber: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    receiverNumber: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Message.associate = function (models) {
    Message.belongsTo(models.Contact, {
      as: 'sent',
      foreignKey: 'senderNumber',
      onDelete: 'CASCADE'
    });
    Message.belongsTo(models.Contact, {
      as: 'received',
      foreignKey: 'receiverNumber',
      onDelete: 'CASCADE'
    });
  };
  return Message;
};