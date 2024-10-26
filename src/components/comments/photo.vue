<template>
	<img :src="props.src" alt="评论头像" class="pic" @click="openChoicePicDialog" />

	<Modal
		v-model:show="showModal"
		:color="store.currentTheme"
		:title="i18nStore.lang === 'ja' ? '使うアバターを選んでください' : '请选择要使用的头像'"
		@ok="submit"
	>
		<div class="active">
			<p>
				{{ i18nStore.lang === "ja" ? "現在選ばれてるのアバター" : "当前选择的头像" }}
			</p>
			<img
				class="photo"
				:src="activePhoto"
				:alt="i18nStore.lang === 'ja' ? '現在選ばれてるのアバター' : '当前选择的头像'"
			/>
		</div>

		<p>
			{{ i18nStore.lang === "ja" ? "選択リスト" : "选择列表" }}
		</p>
		<span class="info">
			{{
				i18nStore.lang === "ja"
					? "アップロードされたアバターは、誰でも使うできるように公開される。注意してください。"
					: "自定义上传的头像会向所有人员公开，所有人都可以使用"
			}}
		</span>
		<div class="photoWrap" v-if="showModal">
			<img
				class="photo"
				src="https://image.xtt.moe/images/mlian2.md.webp"
				alt="头像图片"
				@click="choicePhtotClick('https://image.xtt.moe/images/mlian2.md.webp')"
			/>
			<img
				class="photo"
				:src="item.url"
				alt="头像图片"
				v-for="item in photoList.list"
				:key="item.id"
				@click="choicePhtotClick(item.url)"
			/>
		</div>

		<Cropper
			v-if="showModal"
			class="mt-4"
			:color="store.currentTheme"
			@submit="avatarSubmit"
			:asyncOkCallback="true"
			:buttonText="'上传图片'"
		></Cropper>
	</Modal>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { uploadImage } from "@/api/image/image";
import { Modal, Cropper } from "@c/index";
import { uploadPhoto, getPhotoList } from "@/api/blog/comment";
import { useI18nStore } from "@/stores/i18n";
import { useStore } from "@/stores";

const i18nStore = useI18nStore();
const store = useStore();

const props = withDefaults(
	defineProps<{
		src: string;
	}>(),
	{
		src: "https://image.xtt.moe/images/mlian2.md.webp"
	}
);
const emits = defineEmits(["update:src"]);

const showModal = ref(false);
const activePhoto = ref(props.src);

const photoList: {
	list: {
		id: number;
		url: string;
	}[];
} = reactive({
	list: []
});

const getPhotos = async () => {
	const data = await getPhotoList();

	photoList.list = data;
};
getPhotos();

const openChoicePicDialog = () => {
	showModal.value = true;
};

// 提交裁切的图片
async function avatarSubmit(canvas: any, callback?: Function) {
	if (!canvas) {
		callback?.();
		return;
	}

	const b64Data = await canvas.toDataURL("image/png");

	if (b64Data) {
		const { data } = await uploadImage(b64Data);

		await uploadPhoto(data.url);
		getPhotos();
	}

	callback?.();
}

const choicePhtotClick = (url: string) => {
	activePhoto.value = url;
};

function submit() {
	emits("update:src", activePhoto.value);
}
</script>

<style scoped>
.pic {
	width: 30px;
	height: 30px;
	vertical-align: middle;
	cursor: pointer;
	border-radius: 50%;
}

.photoWrap {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
}
.photo {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	cursor: pointer;
}

.info {
	color: red;
	display: block;
	margin-block-end: 8px;
}
</style>
