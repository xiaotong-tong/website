import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "@/stores/index";
import { useI18nStore } from "@/stores/i18n";
import { useUserInfoStore } from "@/stores/user";

interface Route {
	path: string;
	name: string;
	component?: any;
	redirect?: string;
	meta?: {
		title?: string | { zh: string; ja: string };
		theme?: number;
	};
	children?: Route[];
}

let routes: Route[] = [
	{
		path: "/ex/space",
		name: "exSpace",
		component: () => import("../views/ex/space/index.vue")
	},
	{
		path: "/bot/ruby",
		name: "botRuby",
		component: () => import("../views/bot/ruby.vue")
	},
	{
		path: "/",
		name: "newHome",
		component: () => import("../views/home.vue"),
		children: [
			{
				path: "/",
				name: "newHomePage",
				component: () => import("../views/home/components/home.vue"),
				meta: {
					theme: 0
				}
			},
			{
				path: "/blog",
				name: "blogPage",
				component: () => import("../views/blog/home.vue"),
				meta: {
					theme: 1
				}
			},
			{
				path: "/article/:id",
				name: "blogArticle",
				component: () => import("../views/blog/article/article.vue"),
				meta: {
					title: "pageCustom",
					theme: 1
				}
			},
			{
				path: "/editor/add",
				name: "blogEditorAdd",
				component: () => import("../views/blog/editor/add.vue"),
				meta: {
					title: "新增",
					theme: 1
				}
			},
			{
				path: "/editor/edit/:id",
				name: "blogEditorEdit",
				component: () => import("../views/blog/editor/edit.vue"),
				meta: {
					title: "修改",
					theme: 1
				}
			},
			{
				path: "/photos",
				name: "photos",
				component: () => import("../views/photos/index.vue"),
				meta: {
					title: {
						zh: "图床",
						ja: "画像アップロード"
					},
					theme: 3
				}
			},
			{
				path: "/music",
				name: "music",
				component: () => import("../views/music/music.vue"),
				meta: {
					title: {
						zh: "音乐",
						ja: "音楽"
					},
					theme: 2
				}
			},
			{
				path: "/save",
				name: "save",
				component: () => import("../views/save/save.vue"),
				meta: {
					title: {
						zh: "储藏室",
						ja: "宇宙"
					},
					theme: 3
				}
			},
			{
				path: "/save/webLinks",
				name: "saveWebLinks",
				component: () => import("../views/save/children/webLinks/links.vue"),
				meta: {
					title: {
						zh: "前端链接",
						ja: "web links"
					},
					theme: 3
				}
			},
			{
				path: "/save/emoji",
				name: "saveEmoji",
				component: () => import("../views/save/children/emoji/emoji.vue"),
				meta: {
					title: {
						zh: "emoji",
						ja: "emoji"
					},
					theme: 3
				}
			},
			{
				path: "/save/jpWord/kudamono",
				name: "saveJPWordKudamono",
				component: () => import("../views/save/children/jpWord/kudamono.vue"),
				meta: {
					title: {
						zh: "果物",
						ja: "果物"
					},
					theme: 3
				}
			},
			{
				path: "/save/daysQuote",
				name: "saveDaysQuote",
				component: () => import("../views/save/children/daysQuote/daysQuote.vue"),
				meta: {
					title: {
						zh: "每日日语",
						ja: "每日日语"
					},
					theme: 3
				}
			},
			{
				path: "/tools",
				name: "tools",
				component: () => import("../views/tools/tools.vue"),
				meta: {
					title: {
						zh: "工具",
						ja: "ツール"
					},
					theme: 4
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
					},
					theme: 4
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
					},
					theme: 4
				}
			},
			{
				path: "/something/qrcode",
				name: "qrcode",
				component: () => import("../views/somethings/qrcode.vue"),
				meta: {
					title: {
						zh: "二维码",
						ja: "QRコード"
					},
					theme: 4
				}
			},
			{
				path: "/something/img2base64",
				name: "img2base64",
				component: () => import("../views/somethings/img2base64.vue"),
				meta: {
					title: {
						zh: "图片转base64",
						ja: "画像をbase64に変換"
					},
					theme: 4
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
					},
					theme: 4
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
					},
					theme: 4
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
					},
					theme: 4
				}
			},
			{
				path: "/setting",
				name: "setting",
				component: () => import("../views/setting/index.vue"),
				meta: {
					title: {
						zh: "操纵台",
						ja: "設定"
					},
					theme: 6
				}
			},
			{
				path: "/login",
				name: "login",
				component: () => import("../views/login/login.vue"),
				meta: {
					title: {
						zh: "登录",
						ja: "ログイン"
					},
					theme: 0
				}
			},
			{
				path: "/user",
				name: "user",
				component: () => import("../views/user/user.vue"),
				meta: {
					title: {
						zh: "用户",
						ja: "ユーザー"
					},
					theme: 0
				}
			},
			{
				path: "/info",
				name: "info",
				component: () => import("../views/info/info.vue"),
				meta: {
					title: {
						zh: "信息台",
						ja: "操纵台"
					},
					theme: 5
				}
			},
			{
				path: "/character",
				name: "character",
				component: () => import("../views/character/character.vue"),
				meta: {
					title: {
						zh: "角色",
						ja: "キャラクター"
					},
					theme: 5
				}
			},
			{
				path: "/bot",
				name: "bot",
				component: () => import("../views/bot/bot.vue"),
				meta: {
					title: {
						zh: "bot",
						ja: "bot"
					},
					theme: 3
				}
			},
			{
				path: "/bot/words",
				name: "botWords",
				component: () => import("../views/bot/word.vue"),
				meta: {
					title: {
						zh: "三题故事",
						ja: "三题故事"
					},
					theme: 3
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
					},
					theme: 5
				}
			},
			{
				path: "/friends",
				name: "friends",
				component: () => import("../views/friends/index.vue"),
				meta: {
					title: {
						zh: "友链",
						ja: "友達リンク"
					},
					theme: 5
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
					},
					theme: 1
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
					},
					theme: 1
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
					},
					theme: 3
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
					},
					theme: 3
				}
			},
			{
				path: "/live",
				name: "live",
				component: () => import("../views/live/live.vue"),
				meta: {
					title: {
						zh: "动态",
						ja: "ライブ"
					},
					theme: 1
				}
			},
			{
				path: "/santi",
				name: "santi",
				component: () => import("../views/santi/santi.vue"),
				meta: {
					title: {
						zh: "三题故事",
						ja: "三題噺"
					},
					theme: 1
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
					},
					theme: 5
				}
			},
			{
				path: "/ex/pip",
				name: "exPIP",
				component: () => import("../views/ex/pip/index.vue"),
				meta: {
					title: {
						zh: "画中画",
						ja: "画中画"
					},
					theme: 6
				}
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
					},
					theme: 1
				}
			},
			// 未匹配到的路由，重定向到404页面
			{
				path: "/:pathMatch(.*)*",
				name: "notFount",
				redirect: "/404"
			}
		]
	},
	{
		path: "/bulletin",
		name: "bulletin",
		component: () => import("../views/bulletin/index.vue"),
		meta: {
			theme: 0
		}
	},
	// cv 页面
	{
		path: "/cv/pdf",
		name: "cvpdf",
		component: () => import("../views/cv/cv.pdf.vue")
	},
	{
		path: "/cv",
		name: "cv",
		component: () => import("../views/cv/cv.vue")
	}
];

// 添加 jp 的路由
const jaRoutes: Route[] = [];

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
	routes: [...routes, ...jaRoutes] as RouteRecordRaw[],
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
	const userInfoStore = useUserInfoStore();

	if (typeof to.meta?.theme === "number") {
		store.changeTheme(to.meta.theme as number);
	}

	// 对于 /editor/add， /editor/edit/:id 等路由，需要登录才能访问
	if (to.path.startsWith("/editor")) {
		if (userInfoStore.userInfo.id) {
			next();
		} else {
			next("/");
		}
		return;
	}

	// 如果访问 /user 页面，但是没有登录，则重定向到 /login
	if (to.path === "/user" && !userInfoStore.userInfo.id) {
		next("/login");
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
