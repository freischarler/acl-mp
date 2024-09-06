// models/registrations.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Registration = sequelize.define('Registration', {
  registration_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  order_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'user_id',
    },
  },
  event_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'events',
      key: 'event_id',
    },
  },
  gender_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'genders',
      key: 'gender_id',
    },
  },
  category_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'category_id',
    },
  },
  team_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'team_id',
    },
  },
  weight_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'weights',
      key: 'weight_id',
    },
  },
  age_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'ages',
      key: 'age_id',
    },
  },
  style_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'styles',
      key: 'style_id',
    },
  },
  status: {
    type: DataTypes.STRING(50),
    defaultValue: 'pending',
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  registration_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'registrations',
  timestamps: false,
});

export default Registration;