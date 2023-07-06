import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import importPlugin from "./plugins/import.js";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(importPlugin);

app.mount("#app");
