import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "@/stores/index";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: () => import("../views/home.vue"),
			children: [
				{
					path: "/",
					name: "blog",
					component: () => import("../views/blog/home.vue")
				},
				{
					path: "/editor/add",
					name: "blogEditorAdd",
					component: () => import("../views/blog/editor/add.vue")
				},
				{
					path: "/editor/edit/:id",
					name: "blogEditorEdit",
					component: () => import("../views/blog/editor/edit.vue")
				},
				{
					path: "/article/:id",
					name: "blogArticle",
					component: () => import("../views/blog/article/article.vue")
				},
				{
					path: "/about",
					name: "about",
					component: () => import("../views/about/index.vue")
				},
				{
					path: "/jp",
					name: "jp",
					component: () => import("../views/blog/jp/jp.vue")
				},
				{
					path: "/jp/words",
					name: "jpWords",
					component: () => import("../views/blog/jp/words/words.vue")
				},
				{
					path: "/net",
					name: "net",
					component: () => import("../views/blog/net/index.vue")
				},
				{
					path: "/note",
					name: "note",
					component: () => import("../views/blog/note/index.vue")
				},
				{
					path: "/guestbook",
					name: "guestbook",
					component: () => import("../views/blog/guestbook/index.vue")
				}
			]
		}
	],
	// 在切换页面时，滚动到顶部
	scrollBehavior(_to, _from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return {
				top: 0,
				behavior: "smooth"
			};
		}
	}
});

router.beforeEach((to, _from, next) => {
	const store = useStore();
	// 对于 /editor/add， /editor/edit/:id 等路由，需要登录才能访问
	if (to.path.startsWith("/editor")) {
		if (store.loginUid) {
			next();
		} else {
			next("/");
		}
		return;
	}

	next();
});

export default router;
