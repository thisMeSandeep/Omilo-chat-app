import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Data base Connected");
  } catch (err) {
    console.log("Db connection error:", err);
    process.exit(1);
  }
};

export default connectDb;
