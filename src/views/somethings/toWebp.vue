<template>
	<section class="container web-color-default">
		<p class="title">选择图片</p>
		<input type="file" accept="image/*" @change="fileChange" />
	</section>

	<Teleport to="head">
		<meta name="keywords" content="将图片转换为webp" />
	</Teleport>
</template>

<script setup lang="ts">
document.title = "将图片转换为webp - 星川漣の家";

const fileChange = async (e: any) => {
	const file = e.target.files[0];

	if (file.type === "image/svg+xml") {
		alert("不支持 svg 格式的图片");
		return;
	}

	// 将文件转换为 canvas，再转换为 webp
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");

	// 将 file 转换为 ImageBitmap 对象
	const img = await createImageBitmap(file);

	// 设置 canvas 的宽高为图片的宽高
	canvas.width = img.width;
	canvas.height = img.height;
	ctx?.drawImage(img, 0, 0);

	const webpDataUrl = canvas.toDataURL("image/webp");

	// 下载 webp 图片
	const a = document.createElement("a");
	a.href = webpDataUrl;
	a.download = file.name.replace(/\.\w+$/, ".webp");
	a.click();
};
</script>

<style scoped></style>
