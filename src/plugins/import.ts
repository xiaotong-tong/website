import "xtt-ui/nami";
import "./js/mousesnow.js";

// import "galmuri/dist/galmuri.css";

import { App } from "vue";

import link from "../components/link/link.vue";
import icon from "../components/icon/icon.vue";

import table from "../components/table/table.vue";
import tableColumn from "../components/table/table-column.vue";

import commentPanel from "../components/comments/panel.vue";
import commentList from "../components/comments/list.vue";
import commentCard from "../components/comments/card.vue";

import mainCard from "../components/page/card/mainCard.vue";

const importPlugin = {
	install(app: App) {
		app.component("namiLink", link);
		app.component("namiIcon", icon);

		app.component("namiTable", table);
		app.component("namiTableColumn", tableColumn);

		app.component("namiCommentPanel", commentPanel);
		app.component("namiCommentList", commentList);
		app.component("namiCommentCard", commentCard);

		app.component("namiMainCard", mainCard);
	}
};

export default importPlugin;
