const { returnData } = require("../helpers/util");
const { Op } = require('sequelize');
const Note = require("../models/note.model");

// viewNotes
async function viewNotes(activityID, subtaskID) {
    const notes = await Note.findAll({
        where: {
            [Op.or]: [
                {activityID: activityID === 0 ? null : activityID},
                {subtaskID: subtaskID === 0 ? null : subtaskID}
            ],
        },
        order: [['id', 'DESC']]
    });

    return returnData(notes);
}

// createNote
async function createNote(body) {
    let data = null;
    const verifyNotes = body.note.trim() === '' ? false : true;
    const verifyActivity = body.activityID === 0 ? false : true;
    const verifySubtask = body.subtaskID === 0 ? false : true;
    const verifyAuth = !body.authID ? false : true;

    if(verifyNotes && verifyAuth && (verifyActivity || verifySubtask)) {
        const {note, activityID, subtaskID, authID} = body;
        const newNote = await Note.create({
            note: note.trim(),
            activityID: activityID === 0 ? null : activityID,
            subtaskID: subtaskID === 0 ? null : subtaskID,
            authID: authID
        });
        data = newNote;
    }

    return returnData(data);
}

module.exports = {
    viewNotes,
    createNote
}