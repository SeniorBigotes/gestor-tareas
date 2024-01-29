const { DataTypes } = require('sequelize');

const sequelize = require('../config/sequelize');

const Event = sequelize.define('event', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    userID: {
        type: DataTypes.INTEGER,
        field: 'user_id',
    },
    groupID: {
        type: DataTypes.INTEGER,
        field: 'group_id',
    }
}, { timestamps: false });

Event.sync();

module.exports = Event;