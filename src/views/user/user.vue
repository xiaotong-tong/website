<template>
	<section class="user-wrap">
		<div class="title">
			<hBanner wrapperTargetName="h2">用户</hBanner>
			<NamiButton :borderColor="store.currentTheme" @click="showModal = true"
				>修改用户信息</NamiButton
			>
		</div>
		<div class="item">
			<span class="label">标识: </span><span>{{ userInfoStore.userInfo.password }}</span>
		</div>
		<div class="item">
			<span class="label">昵称: </span
			><span>{{ userInfoStore.userInfo.name || "暂无" }}</span>
		</div>
		<div class="item">
			<span class="label">头像: </span>
			<div><img class="w-[64px] rounded-full" :src="avatarUrl" alt="头像" /></div>
		</div>
	</section>

	<Modal v-model:show="showModal" :color="store.currentTheme" @ok="editSubmit" okText="提交">
		<h3>修改用户信息</h3>
		<div class="item">
			<span class="label">昵称: </span>
			<NInput v-model:value="nickName" />
		</div>
		<div class="item">
			<span class="label">头像: </span>
			<NButton @click="uploadImageEvent">上传头像</NButton>
		</div>

		<namiCropper
			v-if="cropperSrc"
			:src="cropperSrc"
			class="choicePicCropper"
			ref="cropper"
		></namiCropper>
	</Modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { editUserInfo } from "@/api/blog/verify";
import { hBanner, NamiButton, Modal } from "@c/index";
import type { UploadOnChange } from "naive-ui";
import { NButton, NInput } from "naive-ui";
import { useUserInfoStore } from "@/stores/user";
import { useStore } from "@/stores/index";
import { uploadLocalImage } from "@/api/image/image";
import namiCropper from "@/components/cropper/cropper.vue";

const userInfoStore = useUserInfoStore();
const store = useStore();

const avatarUrl = ref(
	userInfoStore.userInfo.avatar || "https://image.xtt.moe/images/mlian2.md.webp"
);

const showModal = ref(false);

const url = ref("");
const nickName = ref("");

const cropperSrc = ref("");

// 点击上传图片按钮
const uploadImageEvent = () => {
	const file = document.createElement("input");
	file.type = "file";
	file.accept = "image/*";
	file.click();

	file.onchange = async () => {
		if (!file.files) {
			return;
		}
		const url = URL.createObjectURL(file.files[0]);

		cropperSrc.value = url;

		file.remove();
	};
};

async function uploadImage(option: Parameters<UploadOnChange>[0]) {
	if (!option.file) return;

	const fd = new FormData();
	fd.append("source", option.file.file!);

	const res = await uploadLocalImage(fd);

	if (res.status === 200) {
		let resUrl = res.data.image.url;
		resUrl = resUrl.replace("https://image.xtt.moe/", "https://image.xtt.moe/local/");
		url.value = resUrl;
	}
}

async function editSubmit() {
	if (!url.value && !nickName.value) return;

	const res = await editUserInfo(
		Object.assign({}, userInfoStore.userInfo, { avatar: url.value, name: nickName.value })
	);

	if (res.id === userInfoStore.userInfo.id) {
		userInfoStore.userInfo = res;
		showModal.value = false;
	}
}
</script>

<style scoped>
.title {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.item {
	display: flex;
	margin: 10px 0;
	align-items: center;

	& > .label {
		width: 100px;
		text-align: end;
		padding-inline-end: 16px;
	}
}
</style>
