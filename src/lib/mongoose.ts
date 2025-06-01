import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("请在环境变量中设置 MONGODB_URI");
}

let isConnected = false;

export async function connectMongo() {
  if (isConnected) return;
  await mongoose.connect(MONGODB_URI, {
    dbName: "sample_mflix", // 你的数据库名
  });
  isConnected = true;
}
