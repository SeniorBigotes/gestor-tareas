const { DataTypes } = require('sequelize');

const sequelize = require('../config/sequelize');

const Activity = sequelize.define('activity', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    task: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
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
    dateUpdate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'date_update',
    },
    progress: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    complete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    auth: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // Por asignar
    groupID: {
        type: DataTypes.INTEGER,
        field: 'group_id',
    },
}, { timestamps: false });

Activity.sync();

module.exports = Activity;