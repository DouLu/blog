import type { UmiApiRequest, UmiApiResponse } from "umi";
import { createClient } from "@supabase/supabase-js";
// import { signToken } from '@/utils/jwt';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  switch (req.method) {
    case "GET":
      // if (!req?.cookies?.token) {
      //   res.status(200).json({ success: false, message: "No token provided" });
      //   return;
      // }
      try {
        if (supabaseUrl && supabaseKey) {
          const supabase = createClient(supabaseUrl, supabaseKey);
          const { data } = await supabase
            .from("post")
            .select()
            .eq("id", req.params.postId)
            .single();
          res.status(200).json({ success: true, data });
        }
      } catch (error) {
        res.status(500).json({ success: false, message: "接口报错" });
      }
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
