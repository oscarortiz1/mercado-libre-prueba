import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ""); // lee .env
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/meli": {
          target: "https://api.mercadolibre.com",
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/meli/, ""),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              // INYECTA el Bearer en la request hacia la API (no visible en el navegador)
              proxyReq.setHeader("Authorization", `Bearer ${env.ML_TOKEN}`);
            });
          },
        },
      },
    },
  };
});
