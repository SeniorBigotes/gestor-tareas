const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Note = sequelize.define('note', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
    },
    note: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    activityID: {
        type: DataTypes.INTEGER,
        field: 'activity_id',
    },
    subtaskID: {
        type: DataTypes.INTEGER,
        field: 'subtask_id',

    },
    authID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'auth_id',
    }
}, { timestamps: false });

Note.sync();

module.exports = Note;