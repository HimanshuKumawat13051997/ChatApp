import mongoose from "mongoose";

let isConnected = false;

export const ConnectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Already Connected");
    return;
  }

  try {
    await mongoose.connect(process.env.Mongo_URI, {
      dbName: "ChatApp",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log("DB Connected");
  } catch (error) {
    console.log(error);
  }
};
