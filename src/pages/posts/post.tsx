import React, { useEffect } from "react";
import styles from "./post.less";
import { useParams } from "umi";

export default function Page() {
  const { postId } = useParams();
  const [post, setPost] = React.useState<{
    id: number;
    title: string;
    content: string;
    imageUrl: string;
  }>();

  const fetchPost = async () => {
    const res = await fetch(`/api/posts/${postId}`, {
      method: "GET",
    });
    const { success, data } = await res.json();
    if (success) {
      setPost(data);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className={styles.post}>
      <h1 className={styles.title}>{post?.title}</h1>
      <div className={styles.content}>{post?.content}</div>
      {post?.imageUrl && <img src={post.imageUrl} alt={post.title} />}
    </div>
  );
}
