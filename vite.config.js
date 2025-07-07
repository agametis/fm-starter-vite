import {defineConfig} from "vite";
import {ViteMinifyPlugin} from "vite-plugin-minify";
import {viteSingleFile} from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [viteSingleFile(), ViteMinifyPlugin({})],
  build: {
    emptyOutDir: true,
  },
});
