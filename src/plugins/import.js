import "xtt-ui/nami";
import "./js/mousesnow.js";

import link from "../components/link/link.vue";

const importPlugin = {
	install(app) {
		app.component("namiLink", link);
	}
};

export default importPlugin;
