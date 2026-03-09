import { useEffect, useState } from "react";
import yayJpg from "../assets/yay.jpg";
import styles from "./index.less";
import { useNavigate } from "umi";

export default function HomePage() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<{
    id: number;
    username: string;
    email: string;
  } | null>();
  const [posts, setPosts] = useState<
    { id: number; title: string; imageUrl: string }[]
  >([]);

  const refresh = async () => {
    const resUserInfo = await fetch("/api/user", {
      method: "GET",
    });
    const dataUserInfo = await resUserInfo.json();
    if (dataUserInfo.success) {
      setUserInfo(dataUserInfo.data);
    } else {
      setUserInfo(null);
    }
    const res = await fetch("/api/posts", {
      method: "GET",
    });
    const { success, data } = await res.json();
    if (success) {
      setPosts(data);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleRegister = async () => {
    navigate("/register");
  };

  const handleLogin = async () => {
    navigate("/login");
  };

  const logOut = async () => {
    await fetch("/api/logout", {
      method: "GET",
    });
    alert("退出登录成功");
    refresh();
  };
  return (
    <div className={styles.home}>
      <div className={`${styles.navs} ${styles.clear}`}>
        {userInfo ? (
          <div>
            <span>欢迎，{userInfo.username}</span>
            <button onClick={logOut}>退出登录</button>
            <button
              onClick={() => {
                navigate("/posts/create");
              }}
            >
              发表文章
            </button>
          </div>
        ) : (
          <div>
            <button onClick={handleRegister}>注册</button>
            <button onClick={handleLogin}>登录</button>
          </div>
        )}
      </div>
      <div className={styles.container}>
        <div className={`${styles.user} ${styles.clear}`}>
          {userInfo ? (
            <div className={styles.userInfo}>
              <h1>用户信息</h1>
              <p>用户名：{userInfo?.username}</p>
              <p>邮箱：{userInfo?.email}</p>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className={`${styles.posts} ${styles.clear}`}>
          {posts?.map((post) => (
            <div
              onClick={() => {
                navigate(`/posts/${post.id}`);
              }}
              key={post.id}
              className={`${styles.post} ${styles.clear}`}
            >
              <h2>{post.title}</h2>
              <img src={post.imageUrl} alt={post.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
