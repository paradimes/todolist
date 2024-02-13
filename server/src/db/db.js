require("dotenv").config();
const mongoose = require("mongoose");

let conn = null;
const MONGODB_URI = process.env.MONGODB_URI;

exports.connect = async function () {
  if (conn == null) {
    conn = mongoose
      .connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
      })
      .then(() => {
        console.log("Connected to MongoDB.");
        return mongoose;
      })
      .catch((err) => {
        console.error("Error:", err);
        throw err;
      });

    await conn;
  }
  return conn;
};
