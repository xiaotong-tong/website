import type { MaybeRef } from "vue";
import { unref } from "vue";
import frontMatter from "front-matter";
import { dayjs } from "@/utils/dateUtil";
import zh2 from "@blog/zh/2-js排序.md";
import ja2 from "@blog/ja/2-jsでのソート.md";
import zh33 from "@blog/zh/33-tailwind自定义提升选择器优先级修饰符.md";
import ja33 from "@blog/ja/33-tailwindカスタムセレクタ優先度修飾子.md";
import zh32 from "@blog/zh/32-ヨルシカ - 憂、燦々.md";
import ja32 from "@blog/ja/32-ヨルシカ - 憂、燦々.md";
import zh31 from "@blog/zh/31-QQ机器人开发(2)-私聊信息的接收与回复.md";
import ja31 from "@blog/ja/31-QQ bot 開発(2) - プライベートメッセージの受信と返信.md";
import zh30 from "@blog/zh/30-monaco编辑器使用.md";
import ja30 from "@blog/ja/30-monaco-editorの使い方.md";
import zh28 from "@blog/zh/28-QQ机器人开发(1) - 注册与权限认证.md";
import ja28 from "@blog/ja/28-QQ bot 開発(1) - 登録と権限認証.md";
import zh27 from "@blog/zh/27-ナミダノコエ 歌詞.md";
import ja27 from "@blog/ja/27-ナミダノコエ 歌詞.md";
import zh26 from "@blog/zh/26-在linux环境中运行puppeteer.md";
import ja26 from "@blog/ja/26-Linux で Puppeteer を実行する.md";
import zh25 from "@blog/zh/25-使用Web NFC 实现手机端的登录功能.md";
import ja25 from "@blog/ja/25-Web NFC を使用して、スマホのブラウザでログイン機能を実装する.md";
import zh24 from "@blog/zh/24-android 和 pc 的调试.md";
import ja24 from "@blog/ja/24-android と pc のデバッグ.md";

const localBlogMap: {
	[key: string]: (lang?: string) => string;
} = {
	"2": (lang?: string) => (lang === "ja" ? ja2 : zh2),
	"33": (lang?: string) => (lang === "ja" ? ja33 : zh33),
	"32": (lang?: string) => (lang === "ja" ? ja32 : zh32),
	"31": (lang?: string) => (lang === "ja" ? ja31 : zh31),
	"30": (lang?: string) => (lang === "ja" ? ja30 : zh30),
	"28": (lang?: string) => (lang === "ja" ? ja28 : zh28),
	"27": (lang?: string) => (lang === "ja" ? ja27 : zh27),
	"26": (lang?: string) => (lang === "ja" ? ja26 : zh26),
	"25": (lang?: string) => (lang === "ja" ? ja25 : zh25),
	"24": (lang?: string) => (lang === "ja" ? ja24 : zh24)
};

function formatMdContentToObj(content: string): any {
	const matedata: any = frontMatter(content);

	return {
		title: matedata.attributes.title,
		content: matedata.body,
		author: matedata.attributes.author,
		category: matedata.attributes.category,
		tags: matedata.attributes.tags,
		createDate: matedata.attributes.createDate ? dayjs(matedata.attributes.createDate).format("YYYY-MM-DD") : null,
		updateDate: matedata.attributes.updateDate ? dayjs(matedata.attributes.updateDate).format("YYYY-MM-DD") : null,
		thumbnail: matedata.attributes.thumbnail,
		abstract: matedata.attributes.abstract,
		prev: matedata.attributes.prevId
			? { id: matedata.attributes.prevId, title: matedata.attributes.prevTitle }
			: null,
		next: matedata.attributes.nextId
			? { id: matedata.attributes.nextId, title: matedata.attributes.nextTitle }
			: null
	};
}

export function hasId(id: string | number): boolean {
	return !!localBlogMap[id + ""];
}

export function getById(id: string | number, lang: MaybeRef<string>): Promise<any> {
	const fn = localBlogMap[id + ""];
	if (!fn) {
		return Promise.reject(new Error("没有找到对应的文章"));
	}
	return formatMdContentToObj(fn(unref(lang)));
}
