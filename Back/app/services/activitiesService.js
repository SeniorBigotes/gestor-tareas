const Activity = require('../models/activity');

//viewActivity
async function viewDataActivity() {
    const activity = await Activity.find();
    return activity;
}

// createActivity
async function createDataActivity(body) {
    const activity = new Activity({
        type: body.type,
        title: body.title,
        description: body.description,
        end_date: body.end_date,
        status: 'active',
    })
    const response = await activity.save();
    return !response ? null : response;
}

// updateActivity
async function updateDataActivity(id, body) {
    const activity = await Activity.findByIdAndUpdate({_id: id}, {
        $set: {
            title: body.title,
            description: body.description,
            end_date: body.end_date,
            percentage: body.percentage,
            comments: body.comments,
            status: body.status
        }
    }, {new: true});
    return !activity ? null : activity;
}

module.exports = {
    viewDataActivity,
    createDataActivity,
    updateDataActivity,
}