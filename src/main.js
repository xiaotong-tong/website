import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import bg from "./components/bg/bg.vue";
import "./plugins/js/mousesnow.js";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component("bg", bg);

app.mount("#app");
