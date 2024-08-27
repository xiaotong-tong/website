import type { MaybeRef } from "vue";
import { ref, unref } from "vue";
import { shuffle } from "xtt-utils";
import { useFetch, useSessionStorage, useUrlSearchParams } from "@vueuse/core";

interface Image {
	id: number;
	url: string;
	botUse: boolean;
}

// 控制是否显示加载动画
const loading = ref(true);

const imageList = ref<Image[]>([]);
const storageRef = useSessionStorage<Image[]>("imageList", []);

// 获取 url 参数
const params = useUrlSearchParams("history");

function filterByURLSearchParams(list: Image[]) {
	const botUse = params.botUse;

	if (botUse === "true") {
		return list.filter((item) => item.botUse);
	} else if (botUse === "false") {
		return list.filter((item) => !item.botUse);
	}

	return list;
}

export const useImageList = (shuffled?: boolean) => {
	// 如果 sessionStorage 有数据，直接使用，不再请求
	if (storageRef.value?.length) {
		const res = filterByURLSearchParams(storageRef.value);

		imageList.value = shuffled ? shuffle(res) : res;
		loading.value = false;
	} else {
		(async () => {
			const { data, error } = await useFetch<Image[]>("https://api.xtt.moe/photos/list", {
				afterFetch(ctx) {
					// 保存到 sessionStorage
					storageRef.value = ctx.data;
					return ctx;
				}
			}).json();

			if (error.value || !data.value?.length) {
				loading.value = false;
				return [];
			}

			const res = filterByURLSearchParams(data.value);

			imageList.value = shuffled ? shuffle(res) : res;
			loading.value = false;
		})();
	}

	return {
		list: imageList,
		loading,
		addImage
	};
};

export async function addImage(url: MaybeRef<string>, botUse?: MaybeRef<boolean>) {
	url = unref(url);

	if (!url) return;
	if (typeof url !== "string") return;

	const { data } = await useFetch<Image>("https://api.xtt.moe/photos/add", {
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ url, bot: Boolean(unref(botUse)) })
	})
		.post()
		.json<Image>();

	if (data.value) {
		// 上传成功，添加到列表
		storageRef.value.push(unref(data)!);
		imageList.value.push(unref(data)!);
	}
}
