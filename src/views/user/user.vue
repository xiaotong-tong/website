<template>
	<section class="user-wrap">
		<div class="title text-center">
			<Panel>{{ t("pages.user.title") }}</Panel>
		</div>
		<div class="item">
			<span class="label">{{ t("pages.user.uid") }}: </span><span>{{ userInfoStore.userInfo.password }}</span>
		</div>
		<div class="item">
			<span class="label">{{ t("pages.user.nickname") }}: </span>
			<span v-lang="'zh'">{{ userInfoStore.userInfo.name || "暂无" }}</span>
			<span v-lang="'ja'">{{ userInfoStore.userInfo.jpName || "なし" }}</span>
		</div>
		<div class="item">
			<span class="label">{{ t("pages.user.otherNickname") }}: </span>
			<span v-lang="'zh'">{{ userInfoStore.userInfo.jpName || "暂无" }}</span>
			<span v-lang="'jp'">{{ userInfoStore.userInfo.name || "なし" }}</span>
		</div>
		<div class="item">
			<span class="label">{{ t("pages.user.avatar") }}: </span>
			<div>
				<img
					class="w-[64px] rounded-full"
					:src="userInfoStore.userInfo.avatar || 'https://image.xtt.cool/images/mlian2.md.webp'"
					:alt="t('pages.user.avatar')"
				/>
			</div>
		</div>
		<div class="item">
			<span class="label"></span>
			<NamiButton :borderColor="store.currentTheme" @click="openEditModal">{{
				t("pages.user.editUserInfo")
			}}</NamiButton>
		</div>
	</section>

	<Modal v-model:show="showModal" :color="store.currentTheme" @ok="editSubmit" :okText="t('common.submit')">
		<h3 class="text-2xl">{{ t("pages.user.editUserInfo") }}</h3>
		<div class="item">
			<span class="label">{{ t("pages.user.nickname") }}: </span>
			<NInput v-lang="'zh'" v-model:value="nickName" />
			<NInput v-lang="'ja'" v-model:value="jaName" />
		</div>
		<div class="item">
			<span class="label">{{ t("pages.user.otherNickname") }}: </span>
			<NInput v-lang="'zh'" v-model:value="jaName" />
			<NInput v-lang="'ja'" v-model:value="nickName" />
		</div>
		<div class="item">
			<span class="label">{{ t("pages.user.avatar") }}: </span>
			<img class="w-[64px] rounded-full" :src="url" :alt="t('pages.user.avatarAlt')" />
			<Cropper
				class="ms-4"
				:color="store.currentTheme"
				@submit="avatarSubmit"
				:asyncOkCallback="true"
				:buttonText="url ? t('pages.user.avatarEdit') : t('pages.user.avatarUpload')"
			></Cropper>
		</div>
	</Modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { editUserInfo } from "@/api/blog/verify";
import { Panel, NamiButton, Modal, Cropper } from "@c/index";
import { NInput } from "naive-ui";
import { useUserInfoStore } from "@/stores/user";
import { useStore } from "@/stores/index";
import { uploadLocalImage } from "@/api/image/image";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const userInfoStore = useUserInfoStore();
const store = useStore();

const showModal = ref(false);

const url = ref("");
const nickName = ref("");
const jaName = ref("");

function openEditModal() {
	nickName.value = userInfoStore.userInfo.name;
	jaName.value = userInfoStore.userInfo.jpName;
	url.value = userInfoStore.userInfo.avatar;
	showModal.value = true;
}

async function editSubmit() {
	if (!url.value && !nickName.value) return;

	const res = await editUserInfo(
		Object.assign({}, userInfoStore.userInfo, {
			avatar: url.value,
			name: nickName.value,
			jpName: jaName.value
		})
	);

	if (res.id === userInfoStore.userInfo.id) {
		userInfoStore.userInfo = res;
		showModal.value = false;
	}
}

// 提交裁切的图片
async function avatarSubmit(canvas: any, callback?: Function) {
	if (!canvas) {
		callback?.();
		return;
	}

	canvas.toBlob(async (blob: Blob) => {
		const fd = new FormData();
		fd.append("source", blob);

		const res = await uploadLocalImage(fd);

		if (res.status === 200) {
			let resUrl = res.data.image.url;
			resUrl = resUrl.replace("https://image.xtt.cool/", "https://image.xtt.cool/local/");
			url.value = resUrl;
		}

		callback?.();
	});
}
</script>

<style scoped>
.item {
	display: flex;
	margin: 10px 0;
	align-items: center;

	& > .label {
		width: 160px;
		text-align: end;
		padding-inline-end: 16px;
		flex: none;
	}
}
</style>
