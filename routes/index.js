const express = require('express');
const router = express.Router();

// @desc  Landing/Login page
// @route GET /
router.get('/', (req, res) => {
  res.render('login');
});

// @desc  Dashboard/Home Page
// @route GET /dashboard
router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

module.exports = router;
