const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Get notifications for user
router.get('/user/:userId', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const notifications = await Notification.find({ recipient: req.params.userId })
      .populate('sender', 'name email avatar')
      .populate('data.roomId', 'name')
      .populate('data.sessionId', 'title')
      .populate('data.noteId', 'title')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip(skip);
    
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get unread notifications count
router.get('/user/:userId/unread-count', async (req, res) => {
  try {
    const count = await Notification.countDocuments({ 
      recipient: req.params.userId,
      isRead: false 
    });
    
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create notification
router.post('/', async (req, res) => {
  try {
    const notification = new Notification(req.body);
    const savedNotification = await notification.save();
    
    const populatedNotification = await Notification.findById(savedNotification._id)
      .populate('sender', 'name email avatar')
      .populate('data.roomId', 'name')
      .populate('data.sessionId', 'title')
      .populate('data.noteId', 'title');
    
    res.status(201).json(populatedNotification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Mark notification as read
router.put('/:id/read', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { 
        isRead: true,
        readAt: new Date()
      },
      { new: true }
    ).populate('sender', 'name email avatar')
     .populate('data.roomId', 'name')
     .populate('data.sessionId', 'title')
     .populate('data.noteId', 'title');

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json(notification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Mark all notifications as read for user
router.put('/user/:userId/read-all', async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.params.userId, isRead: false },
      { 
        isRead: true,
        readAt: new Date()
      }
    );

    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete notification
router.delete('/:id', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;