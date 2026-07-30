import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "src",
  publicDir: "../public",
  base: "/UOSFZ/",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
