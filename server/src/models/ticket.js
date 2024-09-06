import { DataTypes, UUID } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './user.js';
import Event from './event.js';

const Ticket = sequelize.define('Ticket', {
  ticket_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id',
    },
  },
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Event,
      key: 'event_id',
    },
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  purchase_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  order_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(50),
    defaultValue: 'active',
  },
}, {
  tableName: 'tickets',
  timestamps: false,
});

export default Ticket;