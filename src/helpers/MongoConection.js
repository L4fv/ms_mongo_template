const mongoose = require("mongoose");
const Logger = require("../helpers/logger");

mongoose.Promise = Promise;

mongoose.connection.on("connected", () => {
  Logger.info("MongoDB Connected!");
});

mongoose.connection.on("reconnected", () => {
  Logger.info("MongoDB Connection Reestablished");
});

mongoose.connection.on("disconnected", () => {
  Logger.info("MongoDB Connection Disconnected");
});

mongoose.connection.on("close", () => {
  Logger.info("MongoDB Connection Closed");
});

mongoose.connection.on("error", (error) => {
  Logger.error("MongoDB ERROR: " + error);
  process.exit(1);
});

const connectMongo = async () => {
  const { MONGO_TYPE, MONGOGB_NAME, MONGOGB_HOST, MONGO_USER, MONGO_PASS } = process.env;
  const connectionUri = `${MONGO_TYPE}://${MONGOGB_HOST}/${MONGOGB_NAME}`;
  //const connectionUri = `${MONGO_TYPE}://${MONGO_USER}:${MONGO_PASS}@${MONGOGB_HOST}/${MONGOGB_NAME}`;
  await mongoose.connect(connectionUri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectMongo;
