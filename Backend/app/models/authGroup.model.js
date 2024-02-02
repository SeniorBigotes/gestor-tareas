const { DataTypes } = require('sequelize');

const sequelize = require('../config/sequelize');

const AuthGroup = sequelize.define('auths_group',{
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
    },
    groupID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'group_id',
    }
}, { timestamps: false })

AuthGroup.sync();

module.exports = AuthGroup;