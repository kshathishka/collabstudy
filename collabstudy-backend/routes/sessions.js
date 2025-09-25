const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

// Get all sessions
router.get('/', async (req, res) => {
  try {
    const { roomId } = req.query;
    let query = {};
    if (roomId) query.room = roomId;

    const sessions = await Session.find(query)
      .populate('room', 'name')
      .populate('host', 'name email')
      .populate('attendees.user', 'name email')
      .sort({ startTime: 1 });
    
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get session by ID
router.get('/:id', async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate('room', 'name description')
      .populate('host', 'name email')
      .populate('attendees.user', 'name email');
    
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new session
router.post('/', async (req, res) => {
  try {
    const session = new Session(req.body);
    const savedSession = await session.save();
    
    const populatedSession = await Session.findById(savedSession._id)
      .populate('room', 'name description')
      .populate('host', 'name email')
      .populate('attendees.user', 'name email');
    
    res.status(201).json(populatedSession);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Join session
router.post('/:id/join', async (req, res) => {
  try {
    const { userId } = req.body;
    const session = await Session.findById(req.params.id);
    
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Check if user is already attending
    const existingAttendee = session.attendees.find(attendee => 
      attendee.user.toString() === userId
    );
    
    if (existingAttendee) {
      existingAttendee.joinedAt = new Date();
      existingAttendee.status = 'attending';
    } else {
      session.attendees.push({
        user: userId,
        status: 'attending',
        joinedAt: new Date()
      });
    }

    await session.save();
    
    const updatedSession = await Session.findById(session._id)
      .populate('room', 'name description')
      .populate('host', 'name email')
      .populate('attendees.user', 'name email');

    res.json(updatedSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update session
router.put('/:id', async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate('room', 'name description')
     .populate('host', 'name email')
     .populate('attendees.user', 'name email');

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.json(session);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete session
router.delete('/:id', async (req, res) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);
    
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.json({ message: 'Session deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;