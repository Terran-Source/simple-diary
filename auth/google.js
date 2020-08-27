const googleStrategy = require('passport-google-oauth20').Strategy;
const { getUserId } = require('./common');
const { isProd } = require('../logger/common');

/**
 *
 * @param {PassportStatic} passport - Passport object used in the app
 */
const googleAuth = (
  /*PassportStatic*/ passport,
  /*Mongoose */ mongoose,
  googleConfig
) => {
  const User = require('../models/User')(mongoose);

  passport.use(
    new googleStrategy(
      {
        clientID: googleConfig.clientId,
        clientSecret: googleConfig.clientSecret,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const userId = getUserId(profile);

        if (!isProd) {
          process.logger.info({ profile });
        }

        try {
          await User.findOne({ userId }, async (err, user) => {
            if (err) {
              done(err, user);
            }
            if (user) {
              user.lastLoggedOn = Date.now();
              await user.save();
              done(null, user);
            } else {
              await User.create(
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
          });
        } catch (error) {
          process.logger.error({ err: error }, error.message);
          done(error.message, null);
        }
      }
    )
  );
};

module.exports = googleAuth;
