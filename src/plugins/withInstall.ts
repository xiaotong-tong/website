// 加载网站公共样式
import "@/assets/css/style.css";
import "@/assets/css/color.css";

// 一个像素字体文件库，暂时没有使用
// import "galmuri/dist/galmuri.css";

import { App } from "vue";

// 加载自定义组件
import icon from "../components/icon/icon.vue";

import table from "../components/table/table.vue";
import tableColumn from "../components/table/table-column.vue";

import commentPanel from "../components/comments/panel.vue";
import commentList from "../components/comments/list.vue";
import commentCard from "../components/comments/card.vue";

import pagination from "../components/pagination/pagination.vue";

import timeline from "../components/timeline/timeline.vue";
import timelineItem from "../components/timeline/timeline-item.vue";

import pageLoading from "@/components/page/loading/loading.vue";

// 导入全局自定义指令
import { myLogin } from "@/directive/login";
import { myLang } from "@/directive/lang";

// 导入 package 目录下的组件
import withNamiInstall from "@c/index";

const withInstall = {
	install(app: App) {
		app.component("namiIcon", icon);

		app.component("namiTable", table);
		app.component("namiTableColumn", tableColumn);

		app.component("namiCommentPanel", commentPanel);
		app.component("namiCommentList", commentList);
		app.component("namiCommentCard", commentCard);

		app.component("namiPagination", pagination);

		app.component("namiTimeline", timeline);
		app.component("namiTimelineItem", timelineItem);

		app.component("namiPageLoading", pageLoading);

		withNamiInstall(app);

		app.directive("login", myLogin);
		app.directive("lang", myLang);
	}
};

export default withInstall;
