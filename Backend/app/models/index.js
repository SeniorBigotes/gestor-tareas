const Activity = require('./activity.model');
const Subtask = require('./subtask.model');
const UserData = require('./userData.model');

const relations = require('./relations/relations');
const Group = require('./group.model');
const Event = require('./event.model');

relations();

module.exports = {
    Activity,
    Subtask,
    UserData,
    Group,
    Event
}