<template>
	<div
		id="hefu"
		class="text-lg my-4 leading-8 flex-[380px] flex-grow-0 flex-shrink-0 h-[288px]"
		ref="hefuRef"
	></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Typed from "typed.js";
import { useStore } from "@/stores";
const store = useStore();

const hefuRef = ref<HTMLElement>();

onMounted(() => {
	if (hefuRef.value) {
		const contentStr = `愿君之财 盈若银河之星斗 得如长江之奔流<br />
				愿君之气运 鸿于钟山之巅 漫于北冥之边<br />
				愿君之居所 犹如雀台金谷 又似阆苑紫府<br />
				愿君所穿之衣 皆具绫罗霓裳 都佩流苏凤簪<br />
				愿君堂中双亲 寿逾慧照彭祖 龄越逆流篙舟<br />
				愿君房下儿孙 志若鸿鹄 勇压蚣蝮 慧胜白泽<br />
				愿郎君当作 不逊绝影赤兔 可比飞电的卢<br />
				愿佳人如是 灵韫过处 不敢言淑 茗姬若生 羞于称文<br />
				愿君所爱之人 青丝白首俱携行 宁舍千金要尔君`;

		if (store.animeLess) {
			hefuRef.value!.innerHTML = contentStr;
			hefuRef.value?.classList.add("text-justify");
		} else {
			new Typed(hefuRef.value, {
				strings: [contentStr],
				typeSpeed: 50,
				showCursor: false,
				onComplete() {
					hefuRef.value?.classList.add("text-justify");
				}
			});
		}
	}
});
</script>

<style scoped></style>
