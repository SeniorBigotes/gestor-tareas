const { Subtask } = require("../models");

async function viewSubtasks(activityID) {
    const subtasks = Subtask.findAll({
        where: {
            activityID: activityID
        }
    });
    return returnData(subtasks);
}

// funcion de apoyo para retorno
function returnData(data) {
    return data ? data : null;
}

module.exports = {
    viewSubtasks,
}