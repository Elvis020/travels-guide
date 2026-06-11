import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return;
          }

          if (id.includes("framer-motion")) {
            return "motion";
          }

          if (id.includes("gsap") || id.includes("lenis")) {
            return "scrolling";
          }

          if (id.includes("react-router")) {
            return "router";
          }

          if (id.includes("lucide-react")) {
            return "icons";
          }

          if (id.includes("react") || id.includes("zustand")) {
            return "framework";
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
