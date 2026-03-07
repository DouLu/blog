import type { UmiApiRequest, UmiApiResponse } from "umi";
import { createClient } from "@supabase/supabase-js";
// import { signToken } from '@/utils/jwt';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  switch (req.method) {
    case "POST":
      const { username, password } = req.body;
      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { data: user } = await supabase
          .from("users")
          .select()
          .eq("username", username)
          .eq("password", password);
        if (user?.length) {
          res
            .status(200)
            .setCookie("token", user[0].id)
            .json({ success: true, user: user[0] });
        } else {
          res
            .status(200)
            .json({ success: false, message: "Invalid credentials" });
        }
      }
      break;
    case "GET":
      // 用ID来代替token
      const id = req.cookies.token;
      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { data: user } = await supabase
          .from("users")
          .select()
          .eq("id", id);
        if (user?.length) {
          res.status(200).json({ success: true, user: user[0] });
        } else {
          res
            .status(200)
            .json({ success: false, message: "Invalid credentials" });
        }
      }
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
