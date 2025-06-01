import { NextResponse } from "next/server"; // Next.js 服务端响应工具
import { connectMongo } from "@/lib/mongoose";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("请在环境变量中设置 MONGODB_URI");
}

// 定义 Movie 模型（只定义需要的字段）
const MovieSchema = new mongoose.Schema(
  {},
  { collection: "movies", strict: false }
);
const Movie = mongoose.models.Movie || mongoose.model("Movie", MovieSchema);

// 定义 GET 请求处理函数（必须导出为 GET）
export async function GET() {
  try {
    await connectMongo();
    // 查询前10条电影数据
    const movies = await Movie.find({}).limit(10).lean();
    return NextResponse.json({
      message: "获取电影列表成功",
      data: movies,
      time: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("数据库查询错误:", error);
    return NextResponse.json(
      { message: "获取电影列表失败", error: error.message },
      { status: 500 }
    );
  }
}
