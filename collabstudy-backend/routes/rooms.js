const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const User = require('../models/User');

// Get all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find({ isActive: true })
      .populate('creator', 'name email')
      .populate('members.user', 'name email')
      .sort({ createdAt: -1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get room by ID
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
      .populate('creator', 'name email')
      .populate('members.user', 'name email');
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new room
router.post('/', async (req, res) => {
  try {
    const { name, description, subject, capacity, isPrivate, password, creatorId, tags } = req.body;
    
    const room = new Room({
      name,
      description,
      subject,
      capacity,
      isPrivate,
      password,
      creator: creatorId,
      tags,
      members: [{
        user: creatorId,
        role: 'admin'
      }]
    });

    const savedRoom = await room.save();
    const populatedRoom = await Room.findById(savedRoom._id)
      .populate('creator', 'name email')
      .populate('members.user', 'name email');
    
    res.status(201).json(populatedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Join room
router.post('/:id/join', async (req, res) => {
  try {
    const { userId } = req.body;
    const room = await Room.findById(req.params.id);
    
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Check if user is already a member
    const existingMember = room.members.find(member => member.user.toString() === userId);
    if (existingMember) {
      return res.status(400).json({ message: 'User already in room' });
    }

    // Check capacity
    if (room.members.length >= room.capacity) {
      return res.status(400).json({ message: 'Room is full' });
    }

    room.members.push({ user: userId });
    await room.save();

    const updatedRoom = await Room.findById(room._id)
      .populate('creator', 'name email')
      .populate('members.user', 'name email');

    res.json(updatedRoom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Leave room
router.post('/:id/leave', async (req, res) => {
  try {
    const { userId } = req.body;
    const room = await Room.findById(req.params.id);
    
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    room.members = room.members.filter(member => member.user.toString() !== userId);
    await room.save();

    const updatedRoom = await Room.findById(room._id)
      .populate('creator', 'name email')
      .populate('members.user', 'name email');

    res.json(updatedRoom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update room
router.put('/:id', async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate('creator', 'name email')
     .populate('members.user', 'name email');

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete room
router.delete('/:id', async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;