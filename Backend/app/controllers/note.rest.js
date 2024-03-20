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

exports.createNote = async (req, res) => {
    try {
        const body = req.body;
        const newNote = await service.createNote(body);

        newNote ? sendReport(res, newNote, 201) : 
            sendError(res, 400, 'The data provided does not meet the required conditions');
    } catch(e) {
        catchError(res, e);
    }
}

exports.updateNote = async (req, res) => {
    try {
        const noteID = req.params.noteID;
        const body = req.body;
        const updateNote = await service.updateNote(noteID, body);

        if(updateNote) {
            sendReport(res, updateNote, 200);
        } else if(updateNote === 0) {
            sendError(res, 400, 'Values must not be null or undefined');
        } else {
            sendError(res, 404, 'Note not found');
        }

    } catch(e) {
        catchError(res, e);
    }
}

exports.deleteNote = async (req, res) => {
    try {
        const noteID = req.params.noteID;
        const note = await service.deleteNote(noteID);
        const message = {message: 'Note deleted successfully'};

        note ? sendReport(res, message, 200) : sendError(res, 404, 'Note not found');
    } catch(e) {
        catchError(res, e);
    }
}