/// Connect to a database
///
/// Currently supported
/// - mongo
const connectDb = async (dbConfig) => {
  var currentDbConfig = dbConfig[dbConfig.type];
  switch (dbConfig.type) {
    case 'mongo':
      console.log(`Trying to connect ${dbConfig.type} database...`);
      return await require(`./${dbConfig.type}`)(currentDbConfig);
    default:
      throw `Database of type ${dbConfig.type} is not supported yet`;
  }
};

module.exports = connectDb;
