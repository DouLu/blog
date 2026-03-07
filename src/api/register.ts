// src/api/register.ts

import type { UmiApiRequest, UmiApiResponse } from "umi";
// import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { signToken } from "@/utils/jwt";

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  switch (req.method) {
    case "POST":
      let data = {};
      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { data: notes } = await supabase.from("notes").select();
        const { data: user } = await supabase
          .from("users")
          .select()
          .eq("username", "admin")
          .eq("password", "admin");
        data = { user, notes };
      }
      res.status(200).json(data);
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
