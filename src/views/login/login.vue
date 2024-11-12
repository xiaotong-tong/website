<template>
	<section class="login-wrap">
		<label v-if="!userInfoStore.userInfo?.id" class="text-[#e78190] flex mb-2 mt-4 w-[500px] items-center">
			<Icon :size="24" icon="heart"></Icon>
			<span class="flex-none ms-1">秘密口令</span>

			<NInput
				class="ms-4 bg-transparent"
				v-model:value="keyInput"
				placeholder="请输入秘密口令"
				:clearable="true"
				:maxlength="36"
				autofocus
			/>

			<NButton class="ms-4" color="#e78190" ghost @click="login"> 提交 </NButton>
		</label>

		<div v-else class="text-[#e78190] flex mb-2 mt-4 items-center">
			<Icon :size="24" icon="heart"></Icon>
			<span class="flex-none ms-1">您已登录，点击此处</span>
			<NButton class="ms-4" color="#e78190" ghost @click="exitLogin"> 退出登录 </NButton>
		</div>

		<div class="mt-4">
			<Panel targetName="h4">秘密口令获取指南</Panel>
			<p>1. 添加 QQ机器人 “星川涟bot”, QQ号为 3889198334</p>
			<p>2. 发送 “/登录” 指令</p>
			<p>3. 记录星川涟回复您的秘密口令，并小心不要泄露哦，因为这是确认用户的唯一凭证。</p>
			<p>ex1. 再次私信 “/登录” 指令可重置秘密口令</p>
		</div>

		<p v-if="nfcSupported">请刷 NFC 卡片登录</p>
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { verifyMasterUid } from "@/api/blog/verify";
import { useRouter } from "vue-router";
import { NButton, NInput } from "naive-ui";
import { Panel, Icon } from "@c/index";
import { useUserInfoStore } from "@/stores/user";

const userInfoStore = useUserInfoStore();
const router = useRouter();

const keyInput = ref("");

async function login() {
	const data = await verifyMasterUid(keyInput.value);

	if (data.code === 0) {
		userInfoStore.userInfo = data.data;
		keyInput.value = "";
	} else {
		alert("口令错误");
		// userInfoStore.userInfo = {};
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

						if (data.code === 0) {
							reader.write(pw);
							userInfoStore.userInfo = data.data;
							alert("写入成功");
							router.push("/");
						} else {
							alert("口令错误");
						}
					}
					return;
				}

				const decoder = new TextDecoder();
				for (const record of event.message.records) {
					const pw = decoder.decode(record.data);

					const data = await verifyMasterUid(pw);

					if (data.code === 0) {
						userInfoStore.userInfo = data.data;

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
	userInfoStore.userInfo = {};
};
</script>

<style scoped></style>
