// 加载 xtt-ui 组件库
import "xtt-ui";
import "xtt-ui/xtt-web-bg.js";

// 加载 mouse-snow 鼠标雪花特效
import "./js/mousesnow.js";

// 加载网站公共样式
import "@/assets/css/style.css";
import "@/assets/css/color.css";

// 一个像素字体文件库，暂时没有使用
// import "galmuri/dist/galmuri.css";

import { App } from "vue";

// 加载自定义组件
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
