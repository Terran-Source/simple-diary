const mongoose = require('mongoose');

/**
 * Connect to a remote mongo db.
 * @param {Object} mongoConfig
 * @param {string} mongoConfig.uri - The Database connection-string uri.
 */
const connectDb = async (mongoConfig) => {
  try {
    const connect = await mongoose.connect(mongoConfig.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    process.logger.info(
      `Mongo DB connected to ${connect.connection.host} and database ${connect.connection.db.databaseName}`
    );
    return connect;
  } catch (error) {
    process.logger.error({ err: error }, error.message);
    process.exit(1);
  }
};

module.exports = connectDb;