const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureGuest } = require('../middleware/auth');

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
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.user.toDisplayJson() });
});

module.exports = router;
