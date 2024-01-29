const { json } = require('express');
const activityService = require('../services/activitiesService');

// visualizar las tareas
exports.viewActivity = async (req, res) => {
    try {
        const activity = await activityService.viewDataActivity();
        if(!activity) res.json({message: 'No activities registered'});
        res.json(activity);
    } catch (e) {
        json.status(500).json({message: 'Error in the request', error: e.message});
    }
}

// crear tareas
exports.createActivity = async (req, res) => {
    try {
        const body = req.body;
        const activity = await activityService.createDataActivity(body);
        res.json({message: `Activity with id ${activity.id} successfully created`});
    } catch (e) {
        res.status(500).json({message: 'Error when creating the activity', error: e.message});
    }
}

// actualizar tareas
exports.updateActivity = async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const activity = await activityService.updateDataActivity(id, body);
        if(!activity) res.status(404).json({message: 'Activity not found'});
        res.json({message: `Activity with id ${activity.id} has been updated`});
    } catch(e) {
        res.status(500).json({message: 'Error updating activity', error: e.message});
    }
}