import { connectMongo } from "@/lib/mongoose";
import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
  {},
  { collection: "movies", strict: false }
);
const Movie = mongoose.models.Movie || mongoose.model("Movie", MovieSchema);

interface IMovie {
  _id: string;
  title: string;
}

export default async function Home() {
  await connectMongo();
  const movies = (await Movie.find({}).limit(10).lean()) as unknown as IMovie[];

  return (
    <ul>
      {movies.map((item) => (
        <li key={item._id}>{item.title}</li>
      ))}
    </ul>
  );
}
