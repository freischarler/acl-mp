import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Eventprice = sequelize.define('EventPrice', {
  price_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  event_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'events', // name of your event model
      key: 'event_id'
    }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  valid_from: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  valid_to: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'event_prices',
  timestamps: false
});

export default Eventprice;