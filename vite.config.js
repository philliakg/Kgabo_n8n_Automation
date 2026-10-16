import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    port: 5174,

    proxy: {
      "/webhook": {
        target: "http://127.0.0.1:5678",
        changeOrigin: true,
        secure: false,

        configure: (proxy) => {
          proxy.on("error", (err) => {
            console.log("Proxy Error:", err.message);
          });

          proxy.on("proxyReq", (proxyReq, req) => {
            console.log("Forwarding to n8n:", req.url);
          });

          proxy.on("proxyRes", (proxyRes, req) => {
            console.log(
              "n8n Response:",
              proxyRes.statusCode,
              req.url
            );
          });
        },
      },
    },
  },
});