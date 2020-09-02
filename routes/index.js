const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureGuest } = require('../middleware/auth');
const storyService = injector.resolve('storyService');

// @desc  Home page
// @route GET /
router.get('/', ensureAuthenticated, (req, res) => {
  res.redirect('/dashboard');
});

// @desc  Landing/Login page
// @route GET /login
router.get('/login', ensureGuest, (req, res) => {
  res.render('login', { layout: 'login' });
});

// @desc  Dashboard/Home Page
// @route GET /dashboard
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
  try {
    res.render('dashboard', {
      user: req.user.toDisplayJson(),
      stories: await storyService.userStories(req.user._id),
    });
  } catch (error) {
    process.logger.error({ err: error }, error.message);
    res.render('error/500');
  }
});

module.exports = router;
