import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  image: {
    type: DataTypes.TEXT("long")
  },
  description: {
    type: DataTypes.TEXT("long")
  },
  status: {
    type: DataTypes.STRING(20)
  },
  position: {
    type: DataTypes.INTEGER
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  deletedAt: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'categories',
  timestamps: true //Tự động quản lý created và updated
})

export default Category;