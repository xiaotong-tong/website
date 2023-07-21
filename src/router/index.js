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
				}
			]
		}
	]
});

export default router;
