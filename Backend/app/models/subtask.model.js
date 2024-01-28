const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Activity = require('./activity.model');

const Subtask = sequelize.define('subtasks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    },
    dateEnd: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    dateComplete: {
        type: DataTypes.DATE,
    },
    complete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    activityID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

Subtask.belongsTo(Activity, {
    foreignKey: 'activityID',
    as: 'activity',
});

Subtask.sync();

module.exports = Subtask;