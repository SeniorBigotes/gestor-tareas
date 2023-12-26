const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['task', 'project'],
        default: 'task'
    },
    title: {
        type: String,
        required: true,
        max: 30
    },
    description: {
        type: String,
        maxlength: 70
    },
    end_date: {
        type: Date,
        required: true,
        index: true,
    },
    percentage: {
        type: Number,
        default: 0
    },
    comments: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['active', 'progressing', 'completed'],
        default: 'active',
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    substasks: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Substasks'
    }
}, {timestamps: true});

module.exports = mongoose.model('Activity', activitySchema);