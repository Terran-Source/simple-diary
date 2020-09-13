const passport = require('passport');
injector.add('passport', passport);
const userService = injector.resolve('userService');
const app = injector.resolve('app');

const enablePassportAuth = () => {
  passport.serializeUser((user, done) => {
    done(null, user.userId);
  });

  passport.deserializeUser((userId, done) => {
    userService.findOne({ userId }, done);
  });

  require('./google')();

  app.use(passport.initialize());
  app.use(passport.session());
};

module.exports = enablePassportAuth;
