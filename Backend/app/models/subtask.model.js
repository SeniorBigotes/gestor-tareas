const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Subtask = sequelize.define('subtask', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
    },
    task: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    priority: {
        type: DataTypes.ENUM('Urgente', 'Alta', 'Media', 'Baja'),
        allowNull: false,
    },
    dateStart: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'date_start',
    },
    dateEnd: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'date_end',
    },
    dateComplete: {
        type: DataTypes.DATE,
        field: 'date_complete',
    },
    complete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    activityID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'activity_id',
    },
    auth: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    assignedTo: {
        type: DataTypes.INTEGER,
        field: 'assigned_to',
    }
}, { timestamps: false });

Subtask.sync();

module.exports = Subtask;