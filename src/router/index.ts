import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "@/stores/index";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/ex/space",
			name: "exSpace",
			component: () => import("../views/ex/space//index.vue")
		},
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
					path: "/lang",
					name: "lang",
					component: () => import("../views/blog/lang/lang.vue")
				},
				{
					path: "/lang/words",
					name: "jpWords",
					component: () => import("../views/blog/lang/words/words.vue")
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
					path: "/star",
					name: "star",
					component: () => import("../views/blog/star/index.vue")
				},
				{
					path: "/guestbook",
					name: "guestbook",
					component: () => import("../views/blog/guestbook/index.vue")
				},
				{
					path: "/link",
					name: "link",
					component: () => import("../views/links/links.vue")
				},
				{
					path: "/archives",
					name: "archives",
					component: () => import("../views/archives/archives.vue")
				},

				// 站点地图页面
				{
					path: "/sitemap",
					name: "sitemap",
					component: () => import("../views/sitemap/index.vue")
				},

				{
					path: "/dashboard",
					name: "dashboard",
					component: () => import("../views/dashboard/index.vue")
				},

				// something
				{
					path: "/something/img2base64",
					name: "img2base64",
					component: () => import("../views/somethings/img2base64.vue")
				},
				{
					path: "/something/towebp",
					name: "toWebp",
					component: () => import("../views/somethings/toWebp.vue")
				},
				{
					path: "/something/pinyin",
					name: "pinyin",
					component: () => import("../views/somethings/pinyin.vue")
				},
				{
					path: "/something/kana",
					name: "kana",
					component: () => import("../views/somethings/kana.vue")
				},

				// 404页面
				{
					path: "/404",
					name: "404",
					component: () => import("../views/404.vue")
				},
				// 未匹配到的路由，重定向到404页面
				{
					path: "/:pathMatch(.*)*",
					name: "notFount",
					redirect: "/404"
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
