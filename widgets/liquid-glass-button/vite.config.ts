import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Builda um bundle unico (JS+CSS embutido) pra ser carregado via <script>
// direto no index.html do trycktrack (que nao tem bundler/build step).
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    outDir: "../../assets/widgets",
    emptyOutDir: false,
    cssCodeSplit: false,
    lib: {
      entry: "src/mount.tsx",
      name: "LiquidGlassButtonWidget",
      formats: ["iife"],
      fileName: () => "liquid-glass-button.js",
    },
  },
});
