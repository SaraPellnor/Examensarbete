import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  builds: [{ src: "frontend/package.json", use: "@vercel/static-build" }],
  build: {
    outDir: "dist", // Den här mappen innehåller den kompilerade koden
  },
  plugins: [react()],
  server: {
    proxy: {
      "/app": {
        target: "http://localhost:3000",
      },
    },
  },
});
