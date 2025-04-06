import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: '/Dream11-Tracker-Viewer/',
  plugins: [react()],
  esbuild: {
    loader: "jsx", 
  },
});