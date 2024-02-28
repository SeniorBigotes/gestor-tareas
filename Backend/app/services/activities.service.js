const { returnData } = require('../helpers/util');
const { Activity } = require("../models");

// viewActivity
async function viewActivity(id) {{
    const activity = await Activity.findByPk(id);
    return returnData(activity);
}}

// viewActivities
async function viewActivities() {
    const activities = await Activity.findAll({
        order: [ ['date_update', 'DESC'] ]
    });
    return returnData(activities);
}

// createActivity
async function createActivity(body) {
    const { task, description, dateStart, dateEnd, dateUpdate, progress, complete, auth, groupID } = body;
    const newActivity = { task, description, dateStart, dateEnd, dateUpdate, progress, complete, auth, groupID }
    
    const activity = await Activity.create(newActivity);

    return returnData(activity);
}

// updateActivity
async function updateActivity(id, body) {
    const activity = await viewActivity(id);
    if(!activity) return null;
    await activity.update(body);
    
    return activity;
}

module.exports = {
    viewActivity,
    viewActivities,
    createActivity,
    updateActivity,
}