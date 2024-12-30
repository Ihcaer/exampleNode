import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbConfig.js';

export default class User extends Model {
  static associate(models) {
    User.hasMany(models.Post, {
      foreignKey: 'authorId',
      as: 'post',
    });
  }
}
// constructor zamiast init?
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
    },
    registrationCode: {
      type: DataTypes.STRING,
    },
    creationDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);
