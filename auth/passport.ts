import passport from 'passport';
Injector.add('passport', passport);
const userService = Injector.resolve('UserService');
const app = Injector.resolve('app');
import googleAuth from './google';

const enablePassportAuth = (): void => {
  passport.serializeUser((user: any, done: done) => {
    done(null, user.userId);
  });

  passport.deserializeUser((userId, done) => {
    userService.findOne({ userId }, done);
  });

  googleAuth();

  app.use(passport.initialize());
  app.use(passport.session());
};

export default enablePassportAuth;
export { passport };
