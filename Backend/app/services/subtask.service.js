const { Subtask } = require("../models");

// ver subtarea por ID
async function viewSubtask(id) {
    const subtasks = await Subtask.findByPk(id);
    return returnData(subtasks);
}

// viewSubtasks
async function viewSubtasks(activityID) {
    const subtasks = await Subtask.findAll({
        where: { activityID: activityID },
        order: [['date_start', 'DESC']]
    });
    return returnData(subtasks);
}

// changeStatus
async function changeStatus(id, body) {
    const subtask = await viewSubtask(id);
    if(subtask) {
        subtask.complete = body.complete;
        subtask.dateComplete = body.dateComplete;
        await subtask.save();
    }
    return returnData(subtask);
}

async function updateSubtask(id, body) {
    const subtask = await viewSubtask(id);
    let data = subtask;
    if(subtask) {
        let verify = Object.values(body).every(value => value !== null && value !== undefined);
        
        if(verify) {
            const {task, dateStart, dateEnd, assignedTo, priority} = body;

            subtask.task = task;
            subtask.dateStart = dateStart;
            subtask.dateEnd = dateEnd;
            subtask.assignedTo = assignedTo === 0 ? null : assignedTo;
            subtask.priority = priority;

            await subtask.save();
        } else {
            data = false;
        }
    }

    return returnData(data);
}

// funcion de apoyo para retorno
function returnData(data) {
    return data ? data : null;
}

module.exports = {
    viewSubtasks,
    viewSubtask,
    changeStatus,
    updateSubtask,
}