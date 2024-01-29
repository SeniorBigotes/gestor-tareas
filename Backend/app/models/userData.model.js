const { DataTypes } = require('sequelize');

const sequelize = require("../config/sequelize");

const UserData = sequelize.define('user', {
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
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name',
    },
    maidenName: {
        type: DataTypes.STRING,
        field: 'maiden_name',
    },
    gender: {
        type: DataTypes.ENUM('Hombre', 'Mujer', 'Otro'),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
    },
    photoUrl: {
        type: DataTypes.STRING,
        field: 'photo_url',
    },
    specialization: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    registrationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'registration_date',
    },
    lastConnection: {
        type: DataTypes.DATE,
        field: 'last_connection',
    },
    notifications: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, { timestamps: false });

UserData.sync();

module.exports = UserData;