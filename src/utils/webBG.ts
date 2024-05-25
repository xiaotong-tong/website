import { openDB } from "idb";
import { ref } from "vue";
import { useStore } from "@/stores/index";

const bgMap = {
	dark: "https://image.xtt.moe/images/eso1242a.webp",
	light: "https://image.xtt.moe/images/bg.webp"
};

const dbPromise = openDB("xtt-web-bg-table", 1, {
	upgrade(db) {
		db.createObjectStore("bg");
	}
});

export const bgUrl = ref<string>();

export const initWebBGUrl = async (defaultUrl?: string, key?: string) => {
	const store = useStore();

	if (!key) {
		key = store.isDark ? "dark" : "light";
	}

	const db = await dbPromise;
	const content = await db.get("bg", key);

	if (typeof content === "string") {
		bgUrl.value = content;
	} else if (content instanceof Blob || content instanceof File) {
		bgUrl.value = URL.createObjectURL(content);
	} else {
		bgUrl.value = defaultUrl || bgMap[store.isDark ? "dark" : "light"];
	}

	return bgUrl;
};

export const setWebBGUrl = async (
	content: string | Blob | File | undefined | null,
	key?: string
) => {
	const store = useStore();

	if (!key) {
		key = store.isDark ? "dark" : "light";
	}

	const db = await dbPromise;

	if (!content) {
		db.delete("bg", key);
		bgUrl.value = "https://image.xtt.moe/images/bg.webp";
		return;
	}

	await db.put("bg", content, key);
	initWebBGUrl();
};
