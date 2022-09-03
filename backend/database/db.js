const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://weatherapp:12345@cluster0.ljobuqg.mongodb.net/?retryWrites=true&w=majority', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`DB connected`);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
};
module.exports = connectDb;
