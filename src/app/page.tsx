import Image from "next/image";
import styles from "./page.module.css";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/movies");
  const data = await res.json();
  console.log("接口返回数据：", data); // 服务端控制台输出

  return (
    <ul>
      {data.data.map((item: any) => (
        <li key={item._id}>{item.title}</li>
      ))}
    </ul>
  );
}
