import type { MaybeRef } from "vue";
import { ref, unref } from "vue";
import { shuffle } from "xtt-utils";
import { useFetch, useSessionStorage } from "@vueuse/core";

interface Image {
	id: number;
	url: string;
}

// 控制是否显示加载动画
const loading = ref(true);

const imageList = ref<Image[]>([]);
const storageRef = useSessionStorage<Image[]>("imageList", []);

export const useImageList = (shuffled?: boolean) => {
	// 如果 sessionStorage 有数据，直接使用，不再请求
	if (storageRef.value?.length) {
		imageList.value = shuffled ? shuffle(storageRef.value) : storageRef.value;
		loading.value = false;
	} else {
		(async () => {
			const { data } = await useFetch<Image[]>("https://api.xtt.moe/photos/list", {
				afterFetch(ctx) {
					// 保存到 sessionStorage
					storageRef.value = ctx.data;
					return ctx;
				}
			}).json();

			imageList.value = shuffled ? shuffle<Image>(data.value) : data.value;
			loading.value = false;
		})();
	}

	return {
		list: imageList,
		loading,
		addImage
	};
};

export async function addImage(url: MaybeRef<string>) {
	url = unref(url);

	if (!url) return;
	if (typeof url !== "string") return;

	const { data } = await useFetch<Image>("https://api.xtt.moe/photos/add", {
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ url })
	})
		.post()
		.json<Image>();

	if (data.value) {
		// 上传成功，添加到列表
		storageRef.value.push(unref(data)!);
		imageList.value.push(unref(data)!);
	}
}
