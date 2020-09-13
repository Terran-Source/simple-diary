const passport = require('passport');
Injector.add('passport', passport);
const userService = Injector.resolve('userService');
const app = Injector.resolve('app');

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
