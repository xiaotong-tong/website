import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router/index";

import withInstall from "./plugins/withInstall";
import i18n from "./plugins/i18nWithInstall";

import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";

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
self.MonacoEnvironment = {
	// @ts-ignore
	getWorker: function (_, label) {
		if (label === "json") {
			return new jsonWorker();
		}
		if (label === "css" || label === "scss" || label === "less") {
			return new cssWorker();
		}
		if (label === "html" || label === "handlebars" || label === "razor") {
			return new htmlWorker();
		}
		if (["typescript", "javascript"].includes(label)) {
			return new tsWorker();
		}

		return new EditorWorker();
	}
};
