// models/Reminder.js

const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    busRouteId: {
        type: String,
        required: true
    },
    busStopId: {
        type: String,
        required: true
    },
    busStopDescription: {
        type: String,
        required: true
    },
    reminderTime: {
        type: Number,
        required: true
    },
    busId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;
