const { DataTypes } = require('sequelize');

const sequelize = require('../config/sequelize');

const Activity = sequelize.define('activities', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    },
    dateEnd: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    dateUpdate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    progress: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    complete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
});

Activity.sync();

module.exports = Activity;