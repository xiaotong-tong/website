<template>
	<section class="login-wrap">
		<label class="text-[#e78190] flex mb-2 mt-4 w-[460px] items-center">
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

		<p v-if="nfcSupported">请刷 NFC 卡片登录</p>

		<NButton v-if="store.loginUid" color="#e78190" @click="exitLogin"> 退出登录 </NButton>
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { verifyMasterUid } from "@/api/blog/verify";
import { useStore } from "@/stores/index";
import { useRouter } from "vue-router";
import { NButton, NInput } from "naive-ui";

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
