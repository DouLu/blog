import type { UmiApiRequest, UmiApiResponse } from "umi";
import { createClient } from "@supabase/supabase-js";
// import { signToken } from '@/utils/jwt';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    // 查用户信息
    const userId = req?.cookies?.token;
    let userInfo;
    if (userId) {
      try {
        const { data } = await supabase
          .from("users")
          .select()
          .eq("id", userId)
          .single();
        userInfo = data;
      } catch (error) {}
    }
    switch (req.method) {
      case "GET":
        // if (!req?.cookies?.token) {
        //   res.status(200).json({ success: false, message: "No token provided" });
        //   return;
        // }

        try {
          // 登录了则查看自己的文章，未登录可以查看所有文章。
          // 鬼才逻辑！！！
          const userId = req?.cookies?.token;
          if (userId) {
            const { data } = await supabase
              .from("post")
              .select()
              .eq("author_id", userId);
            res.status(200).json({ success: true, data });
          } else {
            const { data } = await supabase.from("post").select();
            res.status(200).json({ success: true, data });
          }
        } catch (error) {
          res.status(500).json({ success: false, message: "接口错误" });
        }
        break;
      case "POST":
        const reqData = JSON.parse(req.body);
        const { data, error } = await supabase.from("post").select();
        if (data) {
          const rowData = {
            ...reqData,
            id: data.length + 1,
            author_id: userInfo.id,
            author: userInfo.username,
            created_at: new Date(),
          };
          try {
            const { data, error } = await supabase.from("post").insert(rowData);
            if (error) {
              res.status(200).json({ success: false, message: error });
            } else {
              res
                .status(200)
                .json({ success: true, message: "文章发表成功！" });
            }
          } catch (error) {
            res.status(500).json({ error: "接口错误" });
          }
        }
        break;
      default:
        res.status(405).json({ error: "Method not allowed" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
