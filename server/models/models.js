const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Player = sequelize.define(
  'Player',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    nickName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    registrationDate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);
