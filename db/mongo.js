const mongoose = require('mongoose');

const connectDb = async (mongoConfig) => {
  try {
    const connect = await mongoose.connect(mongoConfig.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(
      `Mongo DB connected to ${connect.connection.host} and database ${connect.connection.db.databaseName}`
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDb;
