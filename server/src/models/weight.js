import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

/*    
    await queryInterface.createTable('weights', {
      weight_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
    
    await queryInterface.createTable('ages', {
      age_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });

    await queryInterface.createTable('styles', {
      style_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });

    */

const Weight = sequelize.define('Weight', {
    weight_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'weights',
    timestamps: false,
});

export default Weight;