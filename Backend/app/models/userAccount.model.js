const { DataTypes } = require('sequelize');

const sequelize = require('../config/sequelize');

const UserAccount = sequelize.define('account', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        field: 'user_name',
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        field: 'is_verified',
    }
}, { timestamps: false });

UserAccount.sync();

module.exports = UserAccount;