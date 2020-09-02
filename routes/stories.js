const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
const storyService = injector.resolve('storyService');

// @desc  Add stories page
// @route GET /stories/add
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('stories/add');
});

module.exports = router;
