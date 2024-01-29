const { DataTypes } = require('sequelize');

const sequelize = require('../config/sequelize');

const Group = sequelize.define('group', {
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
    photoUrl: {
        type: DataTypes.STRING,
        field: 'photo_url',
    },
    invitationCode: {
        type: DataTypes.STRING,
        field: 'invitation_code',
    },
    creationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'creation_date',
    },
    privacy: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, { timestamps: false });

Group.sync();

module.exports = Group;