// models/categories.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Categories = sequelize.define('Category', {
  category_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
}, {
  tableName: 'categories',
  timestamps: false,
});

export default Categories;