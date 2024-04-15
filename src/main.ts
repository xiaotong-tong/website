import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router/index";

import withInstall from "./plugins/withInstall";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(withInstall);

app.mount("#app");
