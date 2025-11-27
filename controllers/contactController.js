const Message = require('../models/Message');

// @desc    Send a contact message
// @route   POST /api/contact
// @access  Public
const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = await Message.create({
      name,
      email,
      message
    });

    res.status(201).json({
      message: 'Message sent successfully',
      data: newMessage
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all messages (Admin)
// @route   GET /api/contact
// @access  Private
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendMessage,
  getMessages
};
