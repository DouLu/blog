import React, { useState } from "react";
import styles from "./create.less";
import { useNavigate } from "umi";

export default function Page() {
  const navigate = useNavigate();

  const [postInfo, setPostInfo] = useState<
    | {
        title: string;
        content: string;
        imageUrl: string;
      }
    | {}
  >({});
  const [disabled, setDisabled] = useState(true);

  const handleChange = (name: string, value: string) => {
    setPostInfo({ ...postInfo, [name]: value });
  };

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("re-----", postInfo);
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(postInfo),
    });
    const { success, message } = await res.json();
    if (success) {
      navigate("/");
    } else {
      alert(message);
    }
  };

  return (
    <div className={styles.create}>
      <h1 className={styles.title}>发表新文章</h1>
      <form onSubmit={handlePost} className={styles.postForm}>
        <div>
          <p>标题</p>
          <input
            placeholder="30字以内"
            maxLength={30}
            onChange={(e) => {
              if (e.target.value) {
                setDisabled(false);
              }
              handleChange("title", e.target.value);
            }}
          />
        </div>
        <div>
          <p>内容</p>
          <textarea
            placeholder="3000字以内"
            rows={6}
            maxLength={3000}
            onChange={(e) => {
              handleChange("content", e.target.value);
            }}
          />
        </div>
        <div>
          <p>封面图片地址</p>
          <input
            placeholder="url链接"
            onChange={(e) => {
              handleChange("imageUrl", e.target.value);
            }}
          />
        </div>
        <div className={styles.clear}>
          <button className={disabled ? `${styles.disabled}` : ""}>发表</button>
        </div>
      </form>
    </div>
  );
}
