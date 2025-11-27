const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(sendMessage)
  .get(protect, getMessages);

module.exports = router;
