import { defineConfig } from "umi";

export default defineConfig({
  apiRoute: {
    platform: "vercel",
  },
  routes: [
    { path: "/", component: "index" },
    { path: "/css", component: "css/index" },
    { path: "/posts/create", component: "posts/create" },
    { path: "/posts/:postId", component: "posts/post" },
    { path: "/login", component: "login" },
  ],
  npmClient: "yarn",
  tailwindcss: {},
  plugins: ["@umijs/plugins/dist/tailwindcss"],
});
