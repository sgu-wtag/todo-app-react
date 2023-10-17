import react from "@vitejs/plugin-react-swc";
import path from "path";
import url from "url";
import { defineConfig } from "vite";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@app": path.resolve(__dirname, "./src/app/"),
            "@assets": path.resolve(__dirname, "./src/assets/"),
            "@components": path.resolve(__dirname, "./src/components/"),
            "@features": path.resolve(__dirname, "./src/features/"),
            "@helpers": path.resolve(__dirname, "./src/helpers/"),
            "@hooks": path.resolve(__dirname, "./src/hooks/"),
            "@styles": path.resolve(__dirname, "./src/styles/"),
            "@utils": path.resolve(__dirname, "./src/utils/"),
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./testSetup.js",
    },
});
