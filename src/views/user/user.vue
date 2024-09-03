<template>
	<section class="user-wrap">
		<div class="title">
			<hBanner wrapperTargetName="h2">用户</hBanner>
			<NamiButton :borderColor="store.currentTheme" @click="openEditModal"
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
			<div>
				<img
					class="w-[64px] rounded-full"
					:src="
						userInfoStore.userInfo.avatar ||
						'https://image.xtt.moe/images/mlian2.md.webp'
					"
					alt="头像"
				/>
			</div>
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
			<img v-if="url" class="w-[64px] rounded-full" :src="url" alt="要设置的头像" />
			<Cropper v-else :color="store.currentTheme" @submit="avatarSubmit"></Cropper>
		</div>
	</Modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { editUserInfo } from "@/api/blog/verify";
import { hBanner, NamiButton, Modal, Cropper } from "@c/index";
import { NInput } from "naive-ui";
import { useUserInfoStore } from "@/stores/user";
import { useStore } from "@/stores/index";
import { uploadLocalImage } from "@/api/image/image";

const userInfoStore = useUserInfoStore();
const store = useStore();

const showModal = ref(false);

const url = ref("");
const nickName = ref("");

function openEditModal() {
	nickName.value = userInfoStore.userInfo.name;
	url.value = userInfoStore.userInfo.avatar;
	showModal.value = true;
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

// 提交裁切的图片
async function avatarSubmit(canvas: any) {
	if (!canvas) {
		return;
	}

	canvas.toBlob(async (blob: Blob) => {
		const fd = new FormData();
		fd.append("source", blob);

		const res = await uploadLocalImage(fd);

		if (res.status === 200) {
			let resUrl = res.data.image.url;
			resUrl = resUrl.replace("https://image.xtt.moe/", "https://image.xtt.moe/local/");
			url.value = resUrl;
		}
	});
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
