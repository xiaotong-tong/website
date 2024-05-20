<template>
	<section class="music-wrap">
		<namiAplayerView></namiAplayerView>
	</section>
</template>

<script setup lang="ts">
import namiAplayerView from "@/components/aplayer/aplayer-view.vue";
</script>

<style scoped>
.music-wrap {
	height: 100%;
	box-sizing: border-box;
}
</style>
