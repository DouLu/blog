import React from "react";
import styles from "./login.less";
import { useNavigate } from "umi";

export default function Page() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [disabled, setDisabled] = React.useState(true);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (e?.nativeEvent?.submitter?.className?.startsWith("disabled")) {
      // alert("请输入用户名和密码");
      return;
    }
    // 这里可以添加登录逻辑，例如调用 API 进行验证
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const { success, user, message } = await res.json();
    if (success) {
      alert("登录成功");
      navigate("/"); // 登录成功后跳转到主页
    } else {
      alert(`登录失败，用户名或密码错误。${message}`);
    }
  };
  return (
    <div>
      <h1 className={styles.title}>Page login</h1>
      <div className={styles.loginForm}>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              const value = e.target.value;
              setUsername(value);
              setDisabled(!(value && password));
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              const value = e.target.value;
              setPassword(value);
              setDisabled(!(username && value));
            }}
          />
          <button
            className={`${disabled ? styles.disabled : ""}`}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
