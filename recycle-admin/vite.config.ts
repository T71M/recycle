import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), checker({ typescript: true })],
  server: {
    host: true,
    strictPort: true,
    port: 3002, // This is the port which we will use in docker
    proxy: {
      "/api": {
        target: "http://localhost:3001", //тут должна быть строчка из env файла для разных окружений (дев/деплой)
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
