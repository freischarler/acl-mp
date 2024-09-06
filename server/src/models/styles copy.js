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

const Style = sequelize.define('Style', {
    style_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'styles',
    timestamps: false,
});

export default Style;
