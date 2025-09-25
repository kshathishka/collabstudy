const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/chat/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname))
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 25 * 1024 * 1024 // 25MB limit
  }
});

// Get messages for a room
router.get('/room/:roomId', async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const skip = (page - 1) * limit;

    const messages = await Message.find({ 
      room: req.params.roomId,
      isDeleted: false 
    })
      .populate('sender', 'name email avatar')
      .populate('replyTo')
      .populate('reactions.user', 'name')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip(skip);
    
    res.json(messages.reverse()); // Reverse to show oldest first
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send message
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const messageData = {
      content: req.body.content,
      sender: req.body.senderId,
      room: req.body.roomId,
      messageType: req.body.messageType || 'text'
    };

    if (req.body.replyTo) {
      messageData.replyTo = req.body.replyTo;
    }

    if (req.file) {
      messageData.fileUrl = `/uploads/chat/${req.file.filename}`;
      messageData.fileName = req.file.originalname;
      messageData.fileSize = req.file.size;
      messageData.messageType = req.file.mimetype.startsWith('image/') ? 'image' : 'file';
    }

    const message = new Message(messageData);
    const savedMessage = await message.save();
    
    const populatedMessage = await Message.findById(savedMessage._id)
      .populate('sender', 'name email avatar')
      .populate('replyTo')
      .populate('reactions.user', 'name');
    
    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Edit message
router.put('/:id', async (req, res) => {
  try {
    const { content } = req.body;
    
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { 
        content,
        isEdited: true,
        editedAt: new Date()
      },
      { new: true }
    ).populate('sender', 'name email avatar')
     .populate('replyTo')
     .populate('reactions.user', 'name');

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete message
router.delete('/:id', async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { 
        isDeleted: true,
        content: 'This message was deleted'
      },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add reaction to message
router.post('/:id/react', async (req, res) => {
  try {
    const { userId, emoji } = req.body;
    const message = await Message.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Check if user already reacted with this emoji
    const existingReaction = message.reactions.find(
      reaction => reaction.user.toString() === userId && reaction.emoji === emoji
    );

    if (existingReaction) {
      // Remove reaction
      message.reactions = message.reactions.filter(
        reaction => !(reaction.user.toString() === userId && reaction.emoji === emoji)
      );
    } else {
      // Add reaction
      message.reactions.push({ user: userId, emoji });
    }

    await message.save();
    
    const updatedMessage = await Message.findById(message._id)
      .populate('sender', 'name email avatar')
      .populate('reactions.user', 'name');

    res.json(updatedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get message by ID
router.get('/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)
      .populate('sender', 'name email avatar')
      .populate('replyTo')
      .populate('reactions.user', 'name');
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;