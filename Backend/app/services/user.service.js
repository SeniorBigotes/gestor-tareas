const { returnData } = require('../helpers/util');
const { UserData } = require("../models");

async function viewUser(id) {
    const user = await UserData.findByPk(id);
    return returnData(user);
}

async function viewUsers() {
    const users = await UserData.findAll();
    return returnData(users);
}

module.exports = {
    viewUser,
    viewUsers,
}