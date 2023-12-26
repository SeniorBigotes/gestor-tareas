const mongoose = require('mongoose');

const substaskSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        index: true,
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
    comments: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'progressing', 'completed']
    }
}, {timestamps: true});

module.exports = mongoose.model('Substask', substaskSchema);