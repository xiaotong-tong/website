import "xtt-ui/nami";
import "./js/mousesnow.js";

import link from "../components/link/link.vue";
import icon from "../components/icon/icon.vue";

const importPlugin = {
	install(app) {
		app.component("namiLink", link);
		app.component("namiIcon", icon);
	}
};

export default importPlugin;
