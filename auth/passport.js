const passport = require('passport');
injector.add('passport', passport);
const { getUserId } = require('./common');
const userService = injector.resolve('userService');
const app = injector.resolve('app');

const enablePassportAuth = () => {
  require('./google')();

  passport.serializeUser((user, done) => done(null, getUserId(user)));

  passport.deserializeUser((userId, done) => {
    userService.findOne({ userId }, (err, user) => done(err, user));
  });

  app.use(passport.initialize());
  app.use(passport.session());
};

module.exports = enablePassportAuth;
