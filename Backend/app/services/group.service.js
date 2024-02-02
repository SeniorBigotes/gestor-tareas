const { Group, ParticipantGroup } = require("../models");

// viewGroup
async function viewGroup(id) {
    const group = await Group.findByPk(id);
    return returnData(group);
}

// viewGroups
async function viewGroups() {
    const groups = await Group.findAll();
    return returnData(groups);
}

// viewParticipants
async function viewParticipants(id) {
    const participants = await ParticipantGroup.findAll({
        where: {groupID: id},
});
    return returnData(participants);
}

// funcion de apoyo para retorno
function returnData(data) {
    return data ? data : null;
}

module.exports = {
    viewGroup,
    viewGroups,
    viewParticipants,
}