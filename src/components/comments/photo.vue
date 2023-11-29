<template>
	<img :src="props.src" alt="评论头像" class="pic" @click="openChoicePicDialog" />

	<xtt-dialog
		align-center
		class="choicePicDialog"
		:title="i18nStore.lang === 'ja' ? '使うアバターを選んでください' : '请选择要使用的头像'"
		ref="choicePicDialog"
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
		<div class="photoWrap">
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
			<xtt-button
				class="photo"
				ref="upload"
				:style="{
					'border-radius': '50%',
					'font-size': '24px',
					display: 'flex',
					'justify-content': 'center',
					'align-items': 'center'
				}"
				@click="uploadImageEvent"
				>+</xtt-button
			>
		</div>

		<div style="margin-block-start: 16px">
			<xtt-button
				v-if="cropperSrc"
				@click="cancelCropperSrc"
				type="primary"
				:style="{
					'margin-block-end': '8px'
				}"
			>
				{{ i18nStore.lang === "ja" ? "トリミングキャンセル" : "取消裁切" }}
			</xtt-button>

			<xtt-button
				v-if="cropperSrc"
				@click="getCropPic"
				type="primary"
				:style="{
					'margin-block-end': '8px',
					'margin-inline-start': '8px'
				}"
			>
				{{ i18nStore.lang === "ja" ? "トリミング完了" : "完成裁切" }}
			</xtt-button>

			<namiCropper
				v-if="cropperSrc"
				:src="cropperSrc"
				class="choicePicCropper"
				ref="cropper"
			></namiCropper>
		</div>
	</xtt-dialog>
</template>

<script setup lang="ts">
import type { XttDialogElement } from "xtt-ui";
import { ref, reactive, onMounted } from "vue";
import namiCropper from "@/components/cropper/cropper.vue";
import { uploadImage } from "@/api/image/image";
import { uploadPhoto, getPhotoList } from "@/api/blog/comment";
import { useI18nStore } from "@/stores/i18n";

const i18nStore = useI18nStore();

const props = withDefaults(
	defineProps<{
		src: string;
	}>(),
	{
		src: "https://image.xtt.moe/images/mlian2.md.webp"
	}
);
const emits = defineEmits(["update:src"]);

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

const choicePicDialog = ref<XttDialogElement | null>(null);
const cropper = ref<InstanceType<typeof namiCropper> | null>(null);

const openChoicePicDialog = () => {
	choicePicDialog.value?.open();
	cropper.value?.resetImage();
};

const cropperSrc = ref("");

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
const getCropPic = async () => {
	const b64Data = await cropper.value?.toFileOfBase64();

	if (b64Data) {
		const { data } = await uploadImage(b64Data);

		await uploadPhoto(data.url);
		cropperSrc.value = "";
		getPhotos();
	}
};
const cancelCropperSrc = () => {
	cropperSrc.value = "";
};

const choicePhtotClick = (url: string) => {
	activePhoto.value = url;
};

onMounted(() => {
	choicePicDialog.value?.addEventListener("xtt-submit", () => {
		emits("update:src", activePhoto.value);
	});
});
</script>

<style scoped>
.choicePicDialog::part(dialog) {
	width: min(calc(100% - 64px), 500px);
}
.pic {
	width: 30px;
	height: 30px;
	vertical-align: middle;
	cursor: pointer;
	border-radius: 50%;
}

.choicePicCropper {
	width: min(100%, 500px);
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
