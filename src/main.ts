import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router/index";

import importPlugin from "./plugins/import";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(importPlugin);

app.mount("#app");
