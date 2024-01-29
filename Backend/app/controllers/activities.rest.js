const { json } = require('express');
const activityService = require('../services/activities.service');

// visualizar actividad
exports.viewActivity = async (req, res) => {
    try {
        const id = req.params.id
        const activities = await activityService.viewActivity(id);
   
        !activities ? res.status(404).json({message: 'Activity not found'}) :
        res.status(200).send(activities);
   
    } catch (e) {
        res.status(500).json({message: `Answer error: ${e.message}`});
    }
}

// visualizar actividades
exports.viewActivities = async (req, res) => {
    try {
        const activities = await activityService.viewActivities();
   
        !activities ? res.json({message: 'No registered activities'}) :
        res.status(200).send(activities);
   
    } catch (e) {
        res.status(500).json({message: `Answer error: ${e.emssage}`});
    }
}

// crear una actividad
exports.createActivity = async (req, res) => {
    try {
        const newActivity = await activityService.createActivity(req.body);

        !newActivity ? res.status(500).json({message: 'Failed to create the activity'}) :
        res.status(201).json({message: `Activity with id ${newActivity.id} successfully created`});

    } catch (e) {
        res.status(500).json({message: `Failure to create: ${e.message}`});
    }
}

// actualizar una actividad
exports.updateActivity = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const activity = await activityService.updateActivity(id, body);

        !activity ? res.status(404).json({message: 'Activity not found'}) :
        res.status(200).json({message: `Activity with id ${activity.id} has been updated`});

    } catch (e) {
        res.status(500).json({ message: `Failure to update: ${e.message}` });
    }
}