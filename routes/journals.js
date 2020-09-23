const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
const journalService = Injector.resolve('journalService');

// @desc  Add journals page
// @route GET /journals/add
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('journals/add');
});

module.exports = router;
