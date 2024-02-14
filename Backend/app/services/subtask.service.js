const { Subtask } = require("../models");

// viewSubtasks
async function viewSubtasks(activityID) {
    const subtasks = Subtask.findAll({
        where: {
            activityID: activityID
        }
    });
    return returnData(subtasks);
}

// 
async function viewSubtask(id) {
    const subtasks = Subtask.findByPk(id);
    return returnData(subtasks);
}

// changeStatus
async function changeStatus(id, complete) {
    const subtasks = await viewSubtask(id);
    if(subtasks) {
        subtasks.complete = complete;
        await subtasks.save();
    }
    return returnData(subtasks);
}

// funcion de apoyo para retorno
function returnData(data) {
    return data ? data : null;
}

module.exports = {
    viewSubtasks,
    viewSubtask,
    changeStatus,
}