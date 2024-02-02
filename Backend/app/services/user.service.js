const { UserData } = require("../models");

async function viewUser(id) {
    const user = await UserData.findByPk(id);
    return user ? user : null;
}

async function viewUsers() {
    const users = await UserData.findAll();
    return users ? users : null;
}

module.exports = {
    viewUser,
    viewUsers,
}