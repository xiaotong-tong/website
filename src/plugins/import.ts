import "xtt-ui/nami";
import "./js/mousesnow.js";

import { App } from "vue";

import link from "../components/link/link.vue";
import icon from "../components/icon/icon.vue";

import mainCard from "../components/page/card/mainCard.vue";

const importPlugin = {
	install(app: App) {
		app.component("namiLink", link);
		app.component("namiIcon", icon);
		app.component("namiMainCard", mainCard);
	}
};

export default importPlugin;
