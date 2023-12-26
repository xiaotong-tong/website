import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "@/stores/index";
import { useI18nStore } from "@/stores/i18n";

let routes = [
	{
		path: "/ex/space",
		name: "exSpace",
		component: () => import("../views/ex/space/index.vue")
	},
	{
		path: "/ex/pip",
		name: "exPIP",
		component: () => import("../views/ex/pip/index.vue")
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
				component: () => import("../views/blog/article/article.vue"),
				meta: {
					title: "pageCustom"
				}
			},
			{
				path: "/about",
				name: "about",
				component: () => import("../views/about/index.vue"),
				meta: {
					title: {
						zh: "关于",
						ja: "について"
					}
				}
			},
			{
				path: "/lang",
				name: "lang",
				component: () => import("../views/blog/lang/lang.vue"),
				meta: {
					title: {
						zh: "语言学习",
						ja: "言語学ぶ"
					}
				}
			},
			{
				path: "/lang/words",
				name: "jpWords",
				component: () => import("../views/blog/lang/words/words.vue")
			},
			{
				path: "/net",
				name: "net",
				component: () => import("../views/blog/net/index.vue"),
				meta: {
					title: {
						zh: "网络互联",
						ja: "ネットワーク"
					}
				}
			},
			{
				path: "/note",
				name: "note",
				component: () => import("../views/blog/note/index.vue"),
				meta: {
					title: {
						zh: "喵随笔",
						ja: "ノート"
					}
				}
			},
			{
				path: "/star",
				name: "star",
				component: () => import("../views/blog/star/index.vue"),
				meta: {
					title: {
						zh: "其它",
						ja: "その他"
					}
				}
			},
			{
				path: "/guestbook",
				name: "guestbook",
				component: () => import("../views/blog/guestbook/index.vue"),
				meta: {
					title: {
						zh: "留言板",
						ja: "ゲストブック"
					}
				}
			},
			{
				path: "/link",
				name: "link",
				component: () => import("../views/links/links.vue"),
				meta: {
					title: {
						zh: "链接",
						ja: "リンク"
					}
				}
			},
			{
				path: "/archives",
				name: "archives",
				component: () => import("../views/archives/archives.vue"),
				meta: {
					title: {
						zh: "归档",
						ja: "アーカイブ"
					}
				}
			},

			// 站点地图页面
			{
				path: "/sitemap",
				name: "sitemap",
				component: () => import("../views/sitemap/index.vue"),
				meta: {
					title: {
						zh: "站点地图",
						ja: "サイトマップ"
					}
				}
			},

			{
				path: "/dashboard",
				name: "dashboard",
				component: () => import("../views/dashboard/index.vue"),
				meta: {
					title: {
						zh: "控制台",
						ja: "ダッシュボード"
					}
				}
			},

			// 音乐页面
			{
				path: "/music",
				name: "music",
				component: () => import("../views/music/music.vue"),
				meta: {
					title: {
						zh: "音乐",
						ja: "音楽"
					}
				}
			},

			{
				path: "/tools",
				name: "tools",
				component: () => import("../views/tools/tools.vue"),
				meta: {
					title: {
						zh: "常用工具",
						ja: "ツール"
					}
				}
			},

			{
				path: "/reading",
				name: "reading",
				component: () => import("../views/reading/index.vue"),
				meta: {
					title: {
						zh: "ゲームと文字な日々",
						ja: "ゲームと文字な日々"
					}
				}
			},

			// something
			{
				path: "/something/img2base64",
				name: "img2base64",
				component: () => import("../views/somethings/img2base64.vue"),
				meta: {
					title: {
						zh: "图片转base64",
						ja: "画像をbase64に変換"
					}
				}
			},
			{
				path: "/something/towebp",
				name: "toWebp",
				component: () => import("../views/somethings/toWebp.vue"),
				meta: {
					title: {
						zh: "图片转webp",
						ja: "画像をwebpに変換"
					}
				}
			},
			{
				path: "/something/pinyin",
				name: "pinyin",
				component: () => import("../views/somethings/pinyin.vue"),
				meta: {
					title: {
						zh: "汉字注音",
						ja: "中国語の漢字の発音"
					}
				}
			},
			{
				path: "/something/kana",
				name: "kana",
				component: () => import("../views/somethings/kana.vue"),
				meta: {
					title: {
						zh: "漢字->かな",
						ja: "漢字->かな"
					}
				}
			},
			{
				path: "/something/chat",
				name: "chat",
				component: () => import("../views/somethings/chat.vue"),
				meta: {
					title: {
						zh: "chat",
						ja: "チャット"
					}
				}
			},
			{
				path: "/something/sudoku",
				name: "sudoku",
				component: () => import("../views/somethings/sudoku.vue"),
				meta: {
					title: {
						zh: "数独游戏",
						ja: "数独ゲーム"
					}
				}
			},

			// cv 页面
			{
				path: "/cv/pdf",
				name: "cvpdf",
				component: () => import("../views/cv/cv.pdf.vue")
			},

			// 404页面
			{
				path: "/404",
				name: "404",
				component: () => import("../views/404.vue"),
				meta: {
					title: {
						zh: "404",
						ja: "404"
					}
				}
			},
			// 未匹配到的路由，重定向到404页面
			{
				path: "/:pathMatch(.*)*",
				name: "notFount",
				redirect: "/404"
			}
		]
	}
];

// 添加 jp 的路由
const jaRoutes: any[] = [];

routes.forEach((route) => {
	const jpRoute = {
		...route,
		path: "/ja" + route.path,
		name: "ja" + route.name
	};

	if (jpRoute.children) {
		jpRoute.children = jpRoute.children.map((child) => {
			return {
				...child,
				path: "/ja" + child.path,
				name: "ja" + child.name
			};
		});
	}

	jaRoutes.push(jpRoute);
});

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [...routes, ...jaRoutes],
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
	const i18nStore = useI18nStore();
	// 对于 /editor/add， /editor/edit/:id 等路由，需要登录才能访问
	if (to.path.startsWith("/editor")) {
		if (store.loginUid) {
			next();
		} else {
			next("/");
		}
		return;
	}

	// 如果 i18nStore.lang 为 ja, 则重定向到 /ja, 因为路由跳转时，是不会自动加上 /ja 的
	if (i18nStore.lang === "ja" && !to.path.startsWith("/ja")) {
		next("/ja" + to.path);
		return;
	}

	const baseTitle = i18nStore.lang === "ja" ? "星川漣の家" : "星川涟の家";

	if (typeof to.meta.title === "object") {
		document.title = `${(to.meta.title as any)?.[i18nStore.lang]} - ${baseTitle}`;
	} else if (to.meta.title !== "pageCustom") {
		document.title = baseTitle;
	}

	next();
});

export default router;
