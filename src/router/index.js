import { createRouter, createWebHistory } from "vue-router";

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
					name: "homeView",
					component: () => import("../views/home/home.vue")
				},
				{
					path: "/blog",
					name: "blog",
					component: () => import("../views/blog/home/home.vue")
				},
				{
					path: "/blog/editor",
					name: "blogEditor",
					component: () => import("../views/blog/editor/editor.vue")
				},
				{
					path: "/blog/article/:id",
					name: "blogArticle",
					component: () => import("../views/blog/article/article.vue")
				}
			]
		}
	]
});

export default router;
