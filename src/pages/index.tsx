import { useState } from "react";
import yayJpg from "../assets/yay.jpg";
import styles from "./index.less";

export default function HomePage() {
  const [userData, setUserData] = useState<{
    id: number;
    username: string;
    email: string;
  } | null>();

  const [list, setList] = useState<{ id: number; title: string }[]>([]);
  const handleRe = async () => {
    fetch("/api/login", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log("data---------", data);
        setUserData(data.user);
      });

    const res = await fetch("/api/register", {
      method: "POST",
    });
    const { notes, user } = await res.json();
    console.log("data------", notes, user);
    setList(notes);
  };
  const logOut = async () => {
    await fetch("/api/logout", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    alert("退出登录成功");
  };
  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>
      <p>
        <img src={yayJpg} width="388" />
      </p>
      <p>
        To get started, edit <code>pages/index.tsx</code> and save to reload.
      </p>
      <div>
        <div className={styles.blueBtn} onClick={handleRe}>
          register
        </div>
        <div className={styles.blueBtn} onClick={logOut}>
          log out
        </div>
        <p>notes表的数据</p>
        <ul>
          {list?.map((item) => (
            <li key={item.id}>
              <p>{item.id}</p>
              <p>{item.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
