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
export const lightBgUrl = ref<string>(bgMap.light);
export const darkBgUrl = ref<string>(bgMap.dark);

export const initWebBGUrl = async (defaultUrl?: string, key?: "dark" | "light") => {
	const store = useStore();

	if (!key) {
		key = store.isDark ? "dark" : "light";
	}

	lightBgUrl.value = bgMap.light;
	darkBgUrl.value = bgMap.dark;
	bgUrl.value = defaultUrl || store.isDark ? darkBgUrl.value : lightBgUrl.value;

	const db = await dbPromise;
	const lightContent = await db.get("bg", "light");
	const darkContent = await db.get("bg", "dark");
	const content = key === "dark" ? darkContent : lightContent;

	typeof content === "string" && (bgUrl.value = content);
	typeof lightContent === "string" && (lightBgUrl.value = lightContent);
	typeof darkContent === "string" && (darkBgUrl.value = darkContent);

	(content instanceof Blob || content instanceof File) &&
		(bgUrl.value = URL.createObjectURL(content));
	(lightContent instanceof Blob || lightContent instanceof File) &&
		(lightBgUrl.value = URL.createObjectURL(lightContent));
	(darkContent instanceof Blob || darkContent instanceof File) &&
		(darkBgUrl.value = URL.createObjectURL(darkContent));

	return bgUrl;
};

export const setWebBGUrl = async (
	content: string | Blob | File | undefined | null,
	key?: "dark" | "light"
) => {
	const store = useStore();

	if (!key) {
		key = store.isDark ? "dark" : "light";
	}

	const db = await dbPromise;

	if (!content) {
		db.delete("bg", key);
	} else {
		await db.put("bg", content, key);
	}

	initWebBGUrl();
};
