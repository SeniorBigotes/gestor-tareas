const { DataTypes } = require('sequelize');

const sequelize = require('../config/sequelize');

const ParticipantGroup = sequelize.define('participants_group',{
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

ParticipantGroup.sync();

module.exports = ParticipantGroup;