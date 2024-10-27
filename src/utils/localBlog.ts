import type { MaybeRef } from "vue";
import { unref } from "vue";
import frontMatter from "front-matter";
import { dayjs } from "@/utils/dateUtil";
import zh2 from "@blog/zh/2-js排序.md";
import ja2 from "@blog/ja/2-jsでのソート.md";
import zh33 from "@blog/zh/33-tailwind自定义提升选择器优先级修饰符.md";
import ja33 from "@blog/ja/33-tailwindカスタムセレクタ優先度修飾子.md";

const localBlogMap: {
	[key: string]: (lang?: string) => string;
} = {
	"2": (lang?: string) => (lang === "ja" ? ja2 : zh2),
	"33": (lang?: string) => (lang === "ja" ? ja33 : zh33)
};

function formatMdContentToObj(content: string): any {
	const matedata: any = frontMatter(content);
	console.log(matedata);

	return {
		title: matedata.attributes.title,
		content: matedata.body,
		author: matedata.attributes.author,
		category: matedata.attributes.category,
		tags: matedata.attributes.tags,
		createDate: dayjs(matedata.attributes.createDate).format("YYYY-MM-DD"),
		updateDate: dayjs(matedata.attributes.updateDate).format("YYYY-MM-DD"),
		thumbnail: matedata.attributes.thumbnail,
		abstract: matedata.attributes.abstract
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
