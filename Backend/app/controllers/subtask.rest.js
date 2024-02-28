const { sendReport, catchError, sendError } = require('../helpers/util')

const service = require('../services/subtask.service');

// visualizar todas las tareas
exports.viewSubtasks = async(req, res) => {
    try {
        const id = req.params.id;
        const subtasks = await service.viewSubtasks(id);

        subtasks ? sendReport(res, subtasks, 200) : sendError(res, 404, 'Subtasks not found');

    } catch(e) {
        catchError(res, e);
    }
}

exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const subtasks = await service.changeStatus(id, body);

        subtasks? sendReport(res, subtasks, 200) : sendError(res, 404, 'Subtask not found');

    } catch(e) {
        catchError(res, e);
    }
}

exports.updateSubtask = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const subtask = await service.updateSubtask(id, body);

        if(subtask === null) {
            sendError(res, 404, 'Subtask not found');
        } else if(subtask === false) {
            sendError(res, 400, 'Values must not be null or undefined')
        } else {
            sendReport(res, subtask, 200);
        }
    } catch(e) {
        catchError(res, e);
    }
}

exports.createSubtask = async (req, res) => {
    try {
        const body = req.body;
        const newSubtask = await service.createSubtask(body);

        newSubtask ? sendReport(res, newSubtask, 201)
        : sendError(res, 400, 'Error when creating, there must be no null values')
    } catch(e) {
        catchError(res, e);
    }
}