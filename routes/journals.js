const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
const journalService = Injector.resolve('JournalService');

// @desc  Add journals page
// @route GET /journals/add
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('journals/add');
});

// @desc  Add journals page
// @route POST /journals/add
router.post('/', ensureAuthenticated, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await journalService.create(req.body);
    res.redirect('/dashboard');
  } catch (error) {
    Logger.error({ err: error }, error.message);
    res.render('error/500');
  }
});

module.exports = router;
