const { Activity } = require("../models");

// viewActivity
async function viewActivity(id) {{
    const activity = await Activity.findByPk(id);
    return activity ? activity : null;
}}

// viewActivities
async function viewActivities() {
    const activities = await Activity.findAll();
    return activities ? activities : null;
}

// createActivity
async function createActivity(body) {
    const { task, description, dateStart, dateEnd, dateUpdate, progress, complete, auth, groupID } = body;
    const newActivity = { task, description, dateStart, dateEnd, dateUpdate, progress, complete, auth, groupID }
    
    const activity = await Activity.create(newActivity);
    return activity ? activity : null;
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