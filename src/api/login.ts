import type { UmiApiRequest, UmiApiResponse } from "umi";
import { createClient } from "@supabase/supabase-js";
// import { signToken } from '@/utils/jwt';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  switch (req.method) {
    case "POST":
      try {
        const { username, password } = req.body;
        if (supabaseUrl && supabaseKey) {
          const supabase = createClient(supabaseUrl, supabaseKey);
          const { data: user } = await supabase
            .from("users")
            .select()
            .eq("username", username)
            .eq("password", password)
            .single();
          if (user) {
            res
              .status(200)
              .setCookie("token", user.id)
              .json({ success: true, user });
            return;
          }
          res.status(401).json({ success: false, message: "用户名或密码错误" });
        }
      } catch (error) {
        res.status(500).json({ success: false, message: "接口报错", error });
      }
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
