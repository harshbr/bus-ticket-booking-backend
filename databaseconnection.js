const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/firstdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongo db connected");
  } catch (error) {
    console.log("connection fail", error);
    process.exit(1);
  }
};

module.exports = connectdb;
