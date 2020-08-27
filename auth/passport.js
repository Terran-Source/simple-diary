const passport = require('passport');
const googleAuth = require('./google');
const { getUserId } = require('./common');

/**
 *
 * @param {Express} app - an Express app
 */
const enablePassportAuth = (/*Express*/ app, /*Mongoose */ mongoose) => {
  const User = require('../models/User')(mongoose);

  googleAuth(passport, mongoose, process.appConfig.google);

  passport.serializeUser((user, done) => done(null, getUserId(user)));

  passport.deserializeUser((userId, done) => {
    User.findOne({ userId }, (err, user) => done(err, user));
  });

  app.use(passport.initialize());
  app.use(passport.session());
};

module.exports = enablePassportAuth;
