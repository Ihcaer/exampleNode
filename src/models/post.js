import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbConfig.js';

export default class Post extends Model {
  static associate(models) {
    Post.belongsTo(models.User, {
      foreignKey: 'authorId',
      as: 'user',
    });
  }
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    authorId: {
      type: DataTypes.INTEGER,
    },
    mainImg: {
      type: DataTypes.TEXT,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: false,
    hooks: {
      beforeCreate: (post) => {
        if (post.category) {
          post.category = post.category.charAt(0).toUpperCase() + post.category.slice(1);
        }
      },
    },
  }
);
