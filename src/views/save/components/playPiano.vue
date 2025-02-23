<template>
	<section class="">
		<Panel>{{ t("pages.save.piano.title") }}</Panel>
		<div>
			<div class="item">
				<div>
					<NButton
						text
						color="#8bcecb"
						@click="play('1155665- 4433221- 5544332- 5544332- 1155665- 4433221-', 120)"
						>{{ t("pages.save.piano.songOfStar") }}:
					</NButton>
				</div>
				<div>1155665- 4433221- 5544332- 5544332- 1155665- 4433221-</div>
			</div>
			<div class="item">
				<div>
					<NButton
						text
						color="#8bcecb"
						@click="play('1231 1231 345- 345- 5_6_5_4_31 5_6_5_4_31 251- 251-', 120)"
						>{{ t("pages.save.piano.songOfTiger") }}:
					</NButton>
				</div>
				<div>1231 1231 345- 345- 565431 565431 251- 251-</div>
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

const { t } = useI18n();

const namiNavRef = inject<typeof namiNav>("namiNavRef");

function play(song: string, bpm: number) {
	namiNavRef?.value.autoPlayPiano(song, bpm);
}
</script>

<style scoped></style>
