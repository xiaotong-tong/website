<template>
	<section>
		<hBanner wrapperTargetName="h1" class="text-center">QRCode</hBanner>

		<NInput class="mb-4" v-model:value="value" :rows="5" type="textarea" />
		<div class="flex gap-x-16 mb-4">
			<label class="flex-1 flex items-center">
				margin:
				<NInputNumber class="flex-1 ms-4" v-model:value="option.margin" :min="0" />
			</label>
			<label class="flex-1 flex items-center">
				width:
				<NInputNumber class="flex-1 ms-4" v-model:value="option.width" :min="0" />
			</label>
			<label class="flex-1 flex items-center">
				scale:
				<NInputNumber class="flex-1 ms-4" v-model:value="option.scale" :min="0" />
			</label>
		</div>
		<div class="flex mb-4">
			<label class="flex-1">
				type:
				<NRadioGroup class="ms-4" v-model:value="option.type">
					<NRadioButton value="image/png">png</NRadioButton>
					<NRadioButton value="image/jpeg">jpeg</NRadioButton>
					<NRadioButton value="image/webp">webp</NRadioButton>
				</NRadioGroup>
			</label>
			<label class="flex-1 inline-flex items-center">
				color.dark:
				<NColorPicker class="ms-4 w-[100px]" v-model:value="option.color.dark" />
			</label>
			<label class="flex-1 inline-flex items-center">
				color.light:
				<NColorPicker class="ms-4 w-[100px]" v-model:value="option.color.light" />
			</label>
		</div>
		<div class="flex justify-center">
			<qrCode class="border" :content="value" :option="option" />
		</div>
	</section>

	<Teleport to="head">
		<meta name="keywords" content="二维码,QRCode,生成二维码" />
	</Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { qrCode, hBanner } from "@c/index";
import { NInput, NInputNumber, NRadioGroup, NRadioButton, NColorPicker } from "naive-ui";

const value = ref("hello world!");
const option = ref({
	margin: 1,
	width: 128,
	type: "image/png" as const,
	scale: 1,
	color: { dark: "#000000ff", light: "#ffffffff" }
});
</script>

<style scoped></style>
