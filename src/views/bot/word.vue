<template>
	<div>
		<div v-for="item in newData" :key="item.id" class="flex mb-4 items-center">
			<div class="me-4">
				<NCheckbox
					v-model:checked="item.checked"
					size="large"
					:on-update:checked="
						(checked) => {
							change(item, checked);
						}
					"
				/>
			</div>
			<div>
				<p class="text-[24px]">{{ item.word }}</p>
				<p>{{ item.explanation }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { watch, ref } from "vue";
import { useFetch } from "@vueuse/core";
import { NCheckbox } from "naive-ui";
import { useUserInfoStore } from "@/stores/user";

const userInfoStore = useUserInfoStore();

interface Item {
	id: number;
	word: string;
	explanation: string;
}

interface NewItem extends Item {
	checked: boolean;
}

const { data } = useFetch("https://api.xtt.moe/chineseDictionaryWord/listOf100").json<Item[]>();

const newData = ref<NewItem[]>([]);

watch(data, () => {
	if (!data.value) return [];
	newData.value = data.value.map((item) => {
		return {
			...item,
			checked: false
		};
	});
});

async function change(item: NewItem, checked: boolean) {
	const { data, error } = await useFetch("https://api.xtt.moe/chineseDictionaryWord/edit/" + item.id, {
		method: "put",
		headers: {
			"Content-Type": "application/json",
			authorization: userInfoStore.userInfo.password
		},
		body: JSON.stringify({
			isTopic: checked
		})
	}).text();

	if (error.value) {
		console.error("请求失败:", error.value);
	} else {
		console.log("请求成功:", data.value);
		item.checked = checked;
	}
}
</script>

<style scoped></style>
