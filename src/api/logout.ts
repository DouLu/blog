import type { UmiApiRequest, UmiApiResponse } from "umi";
import { createClient } from "@supabase/supabase-js";
// import { signToken } from '@/utils/jwt';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  switch (req.method) {
    case "GET":
      res
        .setCookie("token", "")
        .json({ success: true, message: "Logged out successfully" });
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
