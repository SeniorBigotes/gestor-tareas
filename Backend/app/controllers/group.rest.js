const groupService = require('../services/group.service');
const { sendReport, catchError } = require('../helpers/util');

exports.viewGroup = async (req, res) => {
    try {
        const id = req.params.id;
        const group = await groupService.viewGroup(id);

        sendReport(res, group, 200, 'Group not found');

    } catch(e) {
        catchError(res, e);
    }
}

exports.viewGroups = async (req, res) => {
    try {
        const groups = await groupService.viewGroups();

        sendReport(res, groups, 200, 'Group not found')

    } catch(e) {
        catchError(res, e);
    }
}

exports.viewParticipants = async (req, res) => {
    try {
        const id = req.params.id;
        const participants = await groupService.viewParticipants(id);

        sendReport(res, participants, 200, 'Group not found');
    } catch(e) {
        catchError(res, e);
    }
}