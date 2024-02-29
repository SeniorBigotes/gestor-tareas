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

module.exports = {
    viewNotes,
}