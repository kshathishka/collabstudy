const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/notes/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname))
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt|mp4|mp3/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Files of this type are not allowed!');
    }
  }
});

// Get all notes
router.get('/', async (req, res) => {
  try {
    const { roomId, subject, authorId } = req.query;
    let query = {};
    
    if (roomId) query.room = roomId;
    if (subject) query.subject = new RegExp(subject, 'i');
    if (authorId) query.author = authorId;

    const notes = await Note.find(query)
      .populate('author', 'name email')
      .populate('room', 'name')
      .populate('sharedWith.user', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get note by ID
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
      .populate('author', 'name email')
      .populate('room', 'name description')
      .populate('sharedWith.user', 'name email')
      .populate('likes', 'name');
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new note
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const noteData = {
      ...req.body,
      author: req.body.authorId
    };

    if (req.file) {
      noteData.fileUrl = `/uploads/notes/${req.file.filename}`;
      noteData.fileType = path.extname(req.file.originalname).slice(1);
    }

    const note = new Note(noteData);
    const savedNote = await note.save();
    
    const populatedNote = await Note.findById(savedNote._id)
      .populate('author', 'name email')
      .populate('room', 'name')
      .populate('sharedWith.user', 'name email');
    
    res.status(201).json(populatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Like/Unlike note
router.post('/:id/like', async (req, res) => {
  try {
    const { userId } = req.body;
    const note = await Note.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    const likeIndex = note.likes.indexOf(userId);
    
    if (likeIndex > -1) {
      // Unlike
      note.likes.splice(likeIndex, 1);
    } else {
      // Like
      note.likes.push(userId);
    }

    await note.save();
    
    const updatedNote = await Note.findById(note._id)
      .populate('author', 'name email')
      .populate('likes', 'name');

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Share note
router.post('/:id/share', async (req, res) => {
  try {
    const { userIds, permission = 'read' } = req.body;
    const note = await Note.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    userIds.forEach(userId => {
      const existingShare = note.sharedWith.find(share => 
        share.user.toString() === userId
      );
      
      if (!existingShare) {
        note.sharedWith.push({ user: userId, permission });
      }
    });

    await note.save();
    
    const updatedNote = await Note.findById(note._id)
      .populate('author', 'name email')
      .populate('sharedWith.user', 'name email');

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update note
router.put('/:id', upload.single('file'), async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.fileUrl = `/uploads/notes/${req.file.filename}`;
      updateData.fileType = path.extname(req.file.originalname).slice(1);
    }

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('author', 'name email')
     .populate('room', 'name')
     .populate('sharedWith.user', 'name email');

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete note
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Download note
router.get('/:id/download', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    
    if (!note || !note.fileUrl) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Increment download count
    note.downloads += 1;
    await note.save();

    const filePath = path.join(__dirname, '..', note.fileUrl);
    res.download(filePath);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;