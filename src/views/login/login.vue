<template>
	<section class="login-wrap">
		<p>请刷 NFC 卡片登录</p>

		<xtt-button v-if="store.loginUid" type="primary" @click="exitLogin"> 退出登录 </xtt-button>
	</section>
</template>

<script setup lang="ts">
import { verifyMasterUid } from "@/api/blog/verify";
import { useStore } from "@/stores/index";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

if ("NDEFReader" in window) {
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
	alert("Web NFC is not supported.");
}

const exitLogin = () => {
	store.loginUid = "";
	localStorage.removeItem("loginUid");
};
</script>

<style scoped></style>
