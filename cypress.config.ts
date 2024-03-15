import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://parking-webapp.vercel.app",
    setupNodeEvents(on, config) {},
  },
});
