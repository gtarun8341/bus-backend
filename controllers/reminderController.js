// controllers/reminderController.js

const Reminder = require('../models/Reminder');

exports.saveReminder = async (req, res) => {
    console.log(req.body,req.user._id)
    const { busRouteId, busStopId, busStopDescription, reminderTime ,busId} = req.body;
userId=req.user._id
    try {
        const newReminder = new Reminder({
            userId,
            busRouteId,
            busStopId,
            busStopDescription,
            reminderTime,
            busId,
        });

        await newReminder.save();

        res.status(201).json({
            message: 'Reminder saved successfully',
            data: newReminder
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to save reminder',
            error: error.message
        });
    }
};

exports.getReminder = async (req, res) => {
    const userId = req.user._id;

    try {
        const reminders = await Reminder.find({ userId });

        if (!reminders) {
            return res.status(404).json({ message: 'No reminders found' });
        }

        res.status(200).json({ reminders });
    } catch (error) {
        console.error('Error fetching reminders:', error);
        res.status(500).json({ message: 'Failed to fetch reminders', error: error.message });
    }
};

exports.deleteReminder = async (req, res) => {
    const reminderId = req.params.id; // Extract reminder ID from request parameters
    
    console.log('Deleting reminder with ID:', reminderId); // Log to check the ID passed
    
    try {
        // Find reminder by ID and delete it
        const deletedReminder = await Reminder.findByIdAndDelete(reminderId);
        
        console.log('Deleted reminder:', deletedReminder); // Log the deleted reminder object
        
        if (!deletedReminder) {
            console.log("Reminder not found in the database");
            return res.status(404).json({ message: 'Reminder not found' });
        }
        
        res.status(200).json({ message: 'Reminder deleted successfully', deletedReminder });
    } catch (error) {
        console.error('Error deleting reminder:', error);
        res.status(500).json({ message: 'Failed to delete reminder', error: error.message });
    }
};
