const Activity = require('../activity.model');
const Event = require('../event.model');
const Group = require('../group.model');
const Subtask = require('../subtask.model');
const UserData = require('../userData.model');

const relation = require('./relations.module');

function relations() {
    relation.OneToMany(Activity, Subtask, 'activityID');
    relation.OneToMany(Group, Activity, 'groupID');
    relation.OneToMany(UserData, Activity, 'auth');
    relation.OneToMany(Group, Event, 'groupID');
    relation.OneToMany(UserData, Event, 'userID');
    relation.ManyToMany(Group, UserData, 'participants');
    relation.ManyToMany(Group, UserData, 'authors');
}

module.exports = relations;