const mongoose = require('mongoose');

const changelogSchema = new mongoose.Schema({
    changeover_date: {
        type: Date,
        required: true,
    },
    change: {
        type: String,
        required: true,
    },
    activity_changed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity'
    }
});

module.exports = mongoose.model('Changelog', changelogSchema);