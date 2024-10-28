import type { MaybeRef } from "vue";
import { unref } from "vue";
import frontMatter from "front-matter";
import { dayjs } from "@/utils/dateUtil";

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
import zh23 from "@blog/zh/23-documentPictureInPicture API 学习记录.md";
import ja23 from "@blog/ja/23-documentPictureInPicture API 勉強記録.md";
import zh22 from "@blog/zh/22-ごはんを食べよう 歌词.md";
import ja22 from "@blog/ja/22-ごはんを食べよう 歌詞.md";
import zh21 from "@blog/zh/21-前端知识总结-展开运算符与解构赋值.md";
import ja21 from "@blog/ja/21-webの知識のまとめ-スプレッド構文と分割代入.md";
import zh20 from "@blog/zh/20-前端知识总结-函数.md";
import ja20 from "@blog/ja/20-webの知識のまとめ-関数.md";
import zh19 from "@blog/zh/19-前端知识总结-迭代器和生成器.md";
import ja19 from "@blog/ja/19-webの知識のまとめ - イテレーターとジェネレーター関数.md";
import zh17 from "@blog/zh/17-日本語単語-星座.md";
import ja17 from "@blog/ja/17-日本語の星座について.md";
import zh16 from "@blog/zh/16-二和两的区别.md";
import ja16 from "@blog/ja/16-中国語の「二」と「两」の違い方.md";
import zh14 from "@blog/zh/14-js 中的数字字面量.md";
import ja14 from "@blog/ja/14-js の数字リテラル.md";
import zh13 from "@blog/zh/13-Chevereto 上传功能的使用记录.md";
import ja13 from "@blog/ja/13-Cheveretoのapiに画像をアップロードする方法.md";
import zh12 from "@blog/zh/12-关于 ts 中 setTimeout 类型的记录.md";
import ja12 from "@blog/ja/12-tsのsetTimeoutの型についての記録.md";
import zh11 from "@blog/zh/11-css highlights 学习之括号内文本高亮.md";
import ja11 from "@blog/ja/11-css highlights 勉強と括弧内のテキストのハイライト.md";
import zh10 from "@blog/zh/10-关于网站背景的更换指南.md";
import ja10 from "@blog/ja/10-ウェブサイトの背景の変更ガイド.md";
import zh9 from "@blog/zh/9-npm 打包小记.md";
import ja9 from "@blog/ja/9-npm パッケージのテストと公開.md";
import zh8 from "@blog/zh/8-两数相加.md";
import ja8 from "@blog/ja/8-ふたつの数の足し算.md";
import zh7 from "@blog/zh/7-基于迭代器实现一个循环方法.md";
import ja7 from "@blog/ja/7-イテレーターでループを実装する.md";
import zh6 from "@blog/zh/6-数据库基础学习.md";
import ja6 from "@blog/ja/6-データベース基礎の学ぶ.md";
import zh4 from "@blog/zh/4-js function length属性.md";
import ja4 from "@blog/ja/4-js function length プロパティ.md";
import zh2 from "@blog/zh/2-js排序.md";
import ja2 from "@blog/ja/2-jsでのソート.md";

const localBlogMap: {
	[key: string]: (lang?: string) => string;
} = {
	"33": (lang?: string) => (lang === "ja" ? ja33 : zh33),
	"32": (lang?: string) => (lang === "ja" ? ja32 : zh32),
	"31": (lang?: string) => (lang === "ja" ? ja31 : zh31),
	"30": (lang?: string) => (lang === "ja" ? ja30 : zh30),
	"28": (lang?: string) => (lang === "ja" ? ja28 : zh28),
	"27": (lang?: string) => (lang === "ja" ? ja27 : zh27),
	"26": (lang?: string) => (lang === "ja" ? ja26 : zh26),
	"25": (lang?: string) => (lang === "ja" ? ja25 : zh25),
	"24": (lang?: string) => (lang === "ja" ? ja24 : zh24),
	"23": (lang?: string) => (lang === "ja" ? ja23 : zh23),
	"22": (lang?: string) => (lang === "ja" ? ja22 : zh22),
	"21": (lang?: string) => (lang === "ja" ? ja21 : zh21),
	"20": (lang?: string) => (lang === "ja" ? ja20 : zh20),
	"19": (lang?: string) => (lang === "ja" ? ja19 : zh19),
	"17": (lang?: string) => (lang === "ja" ? ja17 : zh17),
	"16": (lang?: string) => (lang === "ja" ? ja16 : zh16),
	"14": (lang?: string) => (lang === "ja" ? ja14 : zh14),
	"13": (lang?: string) => (lang === "ja" ? ja13 : zh13),
	"12": (lang?: string) => (lang === "ja" ? ja12 : zh12),
	"11": (lang?: string) => (lang === "ja" ? ja11 : zh11),
	"10": (lang?: string) => (lang === "ja" ? ja10 : zh10),
	"9": (lang?: string) => (lang === "ja" ? ja9 : zh9),
	"8": (lang?: string) => (lang === "ja" ? ja8 : zh8),
	"7": (lang?: string) => (lang === "ja" ? ja7 : zh7),
	"6": (lang?: string) => (lang === "ja" ? ja6 : zh6),
	"4": (lang?: string) => (lang === "ja" ? ja4 : zh4),
	"2": (lang?: string) => (lang === "ja" ? ja2 : zh2)
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
