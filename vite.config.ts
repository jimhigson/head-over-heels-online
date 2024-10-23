import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      // for shadcn: https://ui.shadcn.com/docs/installation/vite
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
