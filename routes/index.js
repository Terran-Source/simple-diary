const express = require('express');
const router = express.Router();

// @desc  Home page
// @route GET /
router.get('/', (req, res) => {
  res.redirect('/login');
});

// @desc  Landing/Login page
// @route GET /login
router.get('/login', (req, res) => {
  res.render('login', { layout: 'login' });
});

// @desc  Dashboard/Home Page
// @route GET /dashboard
router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

module.exports = router;
