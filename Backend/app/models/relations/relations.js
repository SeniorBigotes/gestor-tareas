const Activity = require('../activity.model');
const AuthGroup = require('../authGroup.model');
const Event = require('../event.model');
const Group = require('../group.model');
const ParticipantGroup = require('../participantsGroup.model');
const Subtask = require('../subtask.model');
const UserData = require('../userData.model');

const relation = require('./relations.module');

function relations() {
    relation.OneToMany(Activity, Subtask, 'activityID');
    relation.OneToMany(Group, Activity, 'groupID');
    relation.OneToMany(UserData, Activity, 'auth');
    relation.OneToMany(Group, Event, 'groupID');
    relation.OneToMany(UserData, Event, 'userID');
    relation.OneToMany(UserData, ParticipantGroup, 'userID');
    relation.OneToMany(Group, ParticipantGroup, 'groupID');
    relation.OneToMany(UserData, AuthGroup, 'userID');
    relation.OneToMany(Group, AuthGroup, 'groupID');
}

module.exports = relations;