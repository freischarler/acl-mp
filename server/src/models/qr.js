// models/QRCode.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Ticket from './ticket.js';

const QRCode = sequelize.define('QRCode', {
  qr_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  ticket_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Ticket,
      key: 'ticket_id',
    },
  },
  qr_code: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'qr_codes',
  timestamps: false,
});

export default QRCode;
