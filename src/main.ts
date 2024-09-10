import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router/index";

import withInstall from "./plugins/withInstall";
import i18n from "./plugins/i18nWithInstall";

// import { registerSW } from "virtual:pwa-register";
// registerSW({ immediate: true });

const app = createApp(App);

app.use(i18n);
app.use(createPinia());
app.use(router);
app.use(withInstall);

app.mount("#app");

// @ts-ignore
// 定义 MonacoEnvironment
// self.MonacoEnvironment = {
// 	// @ts-ignore
// 	getWorkerUrl: function (moduleId, label) {
// 		if (label === "json") {
// 			return "./json.worker.bundle.js";
// 		}
// 		if (label === "css" || label === "scss" || label === "less") {
// 			return "./css.worker.bundle.js";
// 		}
// 		if (label === "html" || label === "handlebars" || label === "razor") {
// 			return "./html.worker.bundle.js";
// 		}
// 		if (label === "typescript" || label === "javascript") {
// 			return "./ts.worker.bundle.js";
// 		}
// 		return "./editor.worker.bundle.js";
// 	}
// };
