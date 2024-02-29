const { sendReport, catchError, sendError } = require('../helpers/util')

const service = require('../services/note.service');

// visualizar notas
exports.viewNotes = async (req, res) => {
    try {
        const activityID = req.params.activityID;
        const subtaskID = req.params.subtaskID;
        const notes = await service.viewNotes(activityID, subtaskID);

        notes ? sendReport(res, notes, 200) : sendError(res, 404, 'Notes not found');
    } catch(e) {
        catchError(res, e);
    }
}