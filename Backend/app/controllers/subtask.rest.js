const { sendReport, catchError } = require('../helpers/util')
const { Subtask } = require('../models');

const service = require('../services/subtask.service');

// visualizar todas las tareas
exports.viewSubtasks = async(req, res) => {
    try {
        const id = req.params.id;
        const subtasks = await service.viewSubtasks(id);

        sendReport(res, subtasks, 200, 'Subtask not found');

    } catch(e) {
        catchError(res, e);
    }
}