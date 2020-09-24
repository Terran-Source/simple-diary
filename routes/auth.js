const express = require('express');
const router = express.Router();
const passport = Injector.resolve('passport');

// @desc  Auth with Google
// @route GET /auth/google
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// @desc  Google Auth callback
// @route GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/dashboard')
);

// @desc  Logout user
// @route GET /auth/logout
router.get('/logout', (req, res) => {
  if (req.isAuthenticated()) {
    req.user.logout();
    req.logOut();
    req.session.destroy();
    res.redirect('/login');
  } else res.redirect('/login');
});

module.exports = router;
