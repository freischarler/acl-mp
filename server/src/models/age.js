import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/db.js';

const Age = sequelize.define('Age', {
    age_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    min_age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    max_age: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'ages',
    timestamps: false,
});

export default Age;