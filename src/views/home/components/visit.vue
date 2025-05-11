<template>
	<Transition name="slide">
		<div
			v-if="dayCount"
			class="fixed bottom-20 left-0 right-0 w-fit mx-auto text-2xl bg-white shadow-md rounded-lg p-4 z-10"
		>
			<div>哇！你是今天第 {{ dayCount }} 个来看小窝的！感谢！！！</div>
		</div>
	</Transition>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useFetch, useLocalStorage } from "@vueuse/core";
import confetti from "canvas-confetti";

const visitInfo = useLocalStorage<{
	token?: string;
	visitDay?: string;
	visitTime?: string;
	showed?: boolean;
}>("visitInfo", {});

let url = import.meta.env.VITE_API_URL + "/visit/day/number";
if (visitInfo.value.token) {
	url += "?token=" + visitInfo.value.token;
}

const { data } = useFetch(url).json();
const dayCount = ref();

watch(
	() => data.value,
	() => {
		if (data.value.code === 200) {
			const resData = data.value.data;

			if (visitInfo.value.token !== resData.token) {
				dayCount.value = resData.count;
				confetti({
					particleCount: 100,
					spread: 70,
					origin: { y: 0.9, x: 0.4 },
					angle: 120
				});
				confetti({
					particleCount: 100,
					spread: 70,
					origin: { y: 0.9, x: 0.6 },
					angle: 60
				});

				visitInfo.value = {
					token: resData.token,
					visitDay: resData.visitDay,
					visitTime: resData.visitTime,
					showed: true
				};

				setTimeout(() => {
					dayCount.value = undefined;
				}, 3000);
			}
		} else {
			// console.log(data.value.msg);
		}
	}
);
</script>

<style scoped>
/* 滑动效果 */
.slide-enter-active,
.slide-leave-active {
	transition: opacity 0.5s ease, transform 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
	opacity: 0;
	transform: translateY(-20px);
}
</style>
