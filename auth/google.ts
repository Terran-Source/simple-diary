import { Strategy as googleStrategy } from 'passport-google-oauth20';
import { getUserId } from './common';
import { isProd } from '../logger/common';
const userService = Injector.resolve('userService');
const passport = Injector.resolve('passport');
const googleConfig = Injector.resolve('googleConfig');

const googleAuth = (): void => {
  passport.use(
    new googleStrategy(
      {
        clientID: googleConfig.clientId,
        clientSecret: googleConfig.clientSecret,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done: done) => {
        const userId = getUserId(profile);

        if (!isProd) {
          Logger.info({ profile });
        }

        try {
          await userService.findOne(
            { userId },
            async (err: any, user: any): Promise<void> => {
              if (err) {
                done(err, user);
              }
              if (user) {
                user.newLogin();
                await user.save();
                done(null, user);
              } else {
                await userService.create(
                  {
                    userId,
                    providerId: profile.id,
                    provider: profile.provider,
                    displayName: profile.displayName,
                    userName: profile.username,
                    name: profile.name
                      ? {
                          firstName: profile.name.givenName,
                          lastName: profile.name.familyName,
                          middleName: profile.name.middleName,
                        }
                      : null,
                    locale: profile._json.locale,
                    emails: profile.emails
                      ? profile.emails.map((email) => email.value)
                      : null,
                    images: profile.photos
                      ? profile.photos.map((photo) => photo.value)
                      : null,
                  },
                  done
                );
              }
            }
          );
        } catch (error) {
          Logger.error({ err: error }, error.message);
          done(error.message, null);
        }
      }
    )
  );
};

export default googleAuth;
