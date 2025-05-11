<template>
	<section class="">
		<Panel>{{ t("pages.save.piano.title") }}</Panel>
		<div>
			<div class="item" v-for="(item, index) in playMap" :key="index">
				<div>
					<NButton text color="#8bcecb" @click="play(item.song, item.bpm)">{{ item.name }}: </NButton>
				</div>
				<div v-show="!item.hiddenSong">{{ item.song }}</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import namiNav from "@/views/home/components/nav.vue";
import { inject } from "vue";
import { NButton } from "naive-ui";
import { useI18n } from "vue-i18n";
import { Panel } from "@c/index";
import { usePianoKeyStore } from "@/stores/pianoKey";

const { t } = useI18n();
const { playMap } = usePianoKeyStore();

const namiNavRef = inject<typeof namiNav>("namiNavRef");

function play(song: string, bpm: number) {
	namiNavRef?.value.autoPlayPiano(song, bpm);
}
</script>

<style scoped></style>
