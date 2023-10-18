import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const PORT = "8080";
const SERVER_URL = "http://localhost";
const BASE_URL = process.env.BASE_URL ?? "/";
// Do not inline or change this variable as it can be changed by Amplicode Studio code generation.
const AMPLICODE_ENDPOINTS = "graphql|login|logout|rest";

export default defineConfig({
  assetsInclude: ["**/*.graphql"],
  plugins: [react()],
  server: {
    proxy: {
      [`^/(${AMPLICODE_ENDPOINTS})`]: `${SERVER_URL}:${PORT}`,
    },
    base: `${BASE_URL}`,
  },
});
