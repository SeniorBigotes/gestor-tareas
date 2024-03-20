const { returnData } = require("../helpers/util");
const { Op } = require('sequelize');
const Note = require("../models/note.model");

async function viewNote(noteID) {
    const note = await Note.findByPk(noteID);
    return returnData(note);
}

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

// updateNote
async function updateNote(noteID, body) {
    let verify;
    const data = await viewNote(noteID);

    if(data) {
        verify = Object.values(body).every(value => value === null || value === undefined);

        if(!verify) {
            const { note } = body;
            data.note = note;
            await data.save();
        } else {
            data = 0;
        }
    }

    return returnData(data);
}

// deleteNote
async function deleteNote(noteID) {
    const note = await viewNote(noteID);
    if(!note) return false;
    await note.destroy();
    return true;
}

module.exports = {
    viewNotes,
    createNote,
    updateNote,
    deleteNote,
}