import type { UmiApiRequest, UmiApiResponse } from "umi";
import { createClient } from "@supabase/supabase-js";
// import { signToken } from '@/utils/jwt';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  switch (req.method) {
    case "GET":
      if (!req?.cookies?.token) {
        // res.status(200).json({ success: false, message: "No token provided" });
        res.status(200).json({ success: false, message: "未登录" });
      } else {
        // 用ID来代替token
        const id = req.cookies.token;
        if (supabaseUrl && supabaseKey) {
          const supabase = createClient(supabaseUrl, supabaseKey);
          try {
            const { data } = await supabase
              .from("users")
              .select()
              .eq("id", id)
              .single();
            res.status(200).json({ success: true, data });
          } catch (error) {
            res
              .status(500)
              .json({ success: false, message: "接口报错", error });
          }
        }
      }
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
