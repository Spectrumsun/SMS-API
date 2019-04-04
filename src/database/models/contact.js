'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.TEXT,
    },
    name:  {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    number:  {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
    },
  }, {});
  Contact.associate = function(models) {
    Contact.hasMany(models.Message, {
      foreignKey: 'senderNumber',
      as: 'sentMessages'
    });

    Contact.hasMany(models.Message, {
      foreignKey: 'receiverNumber',
      as: 'receivedMessages'
    });
  };
  return Contact;
};