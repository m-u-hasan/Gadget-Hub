const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    if (error.message.includes('SSL alert number 80')) {
      console.error('👉 TIP: This usually means your IP address is NOT whitelisted in MongoDB Atlas.');
      console.error('👉 ACTION: Go to Atlas -> Network Access -> Add Current IP Address.');
    }
    process.exit(1);
  }
};

module.exports = connectDB;
