import { createSSRApp } from "vue";
imoprt pinia from "./stores";
import App from "./App.vue";

export function createApp() {
  const app = createSSRApp(App);

  app.use(pinia);

  return {
    app,
  };
}
