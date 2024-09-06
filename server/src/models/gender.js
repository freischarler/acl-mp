import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';


const Gender = sequelize.define('Gender', {
    gender_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'genders',
    timestamps: false,
});

export default Gender;
