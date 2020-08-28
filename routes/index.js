const express = require('express');
const router = express.Router();

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
