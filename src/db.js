const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const db_url = process.env.MONGODB_STRING;
    if (!db_url) {
      throw new Error('db_url must be defined');
    }
    const conn = await mongoose.connect(db_url);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;