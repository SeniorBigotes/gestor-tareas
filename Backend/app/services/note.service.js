const { returnData } = require("../helpers/util");
const Note = require("../models/note.model");

// viewNotes
async function viewNotes(activityID, subtaskID) {
    const notes = await Note.findAll({
        where: {
            [Op.or]: [
                {activityID: activityID || null},
                {subtaskID: subtaskID || null}
            ]
        }
    });

    return returnData(notes);
}

module.exports = {
    viewNotes,
}