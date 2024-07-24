<template>
	<section class="login-wrap">
		<label v-if="!store.loginUid" class="text-[#e78190] flex mb-2 mt-4 w-[500px] items-center">
			<namiCIcon :size="24" icon="heart"></namiCIcon>
			<span class="flex-none ms-1">秘密口令</span>

			<NInput
				class="ms-4 bg-transparent"
				v-model:value="keyInput"
				placeholder="请输入秘密口令"
				:clearable="true"
				:maxlength="36"
				autofocus
				:style="{
					'--n-border-focus': '#e78190',
					'--n-border-hover': '#e78190',
					'--n-caret-color': '#e78190',
					'--n-box-shadow-focus': '0 0 0 2px #e7819044'
				}"
			/>

			<NButton class="ms-4" color="#e78190" ghost @click="login"> 提交 </NButton>
		</label>

		<div v-else class="text-[#e78190] flex mb-2 mt-4 items-center">
			<namiCIcon :size="24" icon="heart"></namiCIcon>
			<span class="flex-none ms-1">您已登录，点击此处</span>
			<NButton class="ms-4" color="#e78190" ghost @click="exitLogin"> 退出登录 </NButton>
		</div>

		<div class="mt-4">
			<hBanner wrapperTargetName="h4">秘密口令获取指南</hBanner>
			<p>
				1. 添加 QQ 群 <a href="https://qm.qq.com/q/HQIjivJg66" target="_blank">754923572</a>
			</p>
			<p>2. 在群内发送 “登录”，或私聊群内的 星川涟 发送 “登录”</p>
			<p>3. 记录星川涟发给你的登录口令</p>
		</div>

		<p v-if="nfcSupported">请刷 NFC 卡片登录</p>
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { verifyMasterUid } from "@/api/blog/verify";
import { useStore } from "@/stores/index";
import { useRouter } from "vue-router";
import { NButton, NInput } from "naive-ui";
import { hBanner } from "@c/index";

const store = useStore();
const router = useRouter();

const keyInput = ref("");

async function login() {
	const data = await verifyMasterUid(keyInput.value);

	if (data === "验证成功") {
		store.loginUid = keyInput.value;
		localStorage.setItem("loginUid", keyInput.value);
		keyInput.value = "";
	} else {
		alert("口令错误");
		store.loginUid = "";
		localStorage.removeItem("loginUid");
	}
}

const nfcSupported = "NDEFReader" in window;

if (nfcSupported) {
	//  通过刷 NFC 卡片登录
	const reader = new window.NDEFReader();
	reader
		.scan()
		.then(() => {
			reader.onreading = async (event: any) => {
				if (event.message.records.length === 0) {
					const pw = window.prompt("该 NFC 卡片为空卡，请写入主人口令");
					if (pw) {
						const data = await verifyMasterUid(pw);

						if (data === "验证成功") {
							reader.write(pw);

							store.loginUid = pw;
							localStorage.setItem("loginUid", pw);

							alert("写入成功");

							router.push("/");
						} else {
							alert("口令错误");
						}
					}
				}

				const decoder = new TextDecoder();
				for (const record of event.message.records) {
					const pw = decoder.decode(record.data);

					const data = await verifyMasterUid(pw);

					if (data === "验证成功") {
						store.loginUid = pw;
						localStorage.setItem("loginUid", pw);

						router.push("/");
					} else {
						alert("口令错误");
					}
				}
			};
		})
		.catch((error: Error) => {
			console.error("error", error);
			alert("Error reading NFC card.");
		});
} else {
	console.log("Web NFC is not supported.");
}

const exitLogin = () => {
	store.loginUid = "";
	localStorage.removeItem("loginUid");
};
</script>

<style scoped></style>
