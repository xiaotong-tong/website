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
			<div class="item">
				<div>
					<NButton text color="#8bcecb" @click="play(piaoyang.join(''), 70)">漂洋过海来看你: </NButton>
				</div>
				<!-- <div>
					<div v-for="item in piaoyang">
						{{ item.replace(/_/g, "") }}
					</div>
				</div> -->
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

const piaoyang = [
	"3__ 3_2__1__ 2_3__5__ 5",
	"2_2__5__ 2_3__2__ 2",
	"1__6__6_ 6_6__1__ 6_^5__ ^1_ 1-2-",
	"2__3__3__3__ ^3__2__1__ 5_3_3__ ^2__3__",
	"2__2_3__ 2__1_6__ ^",
	"1__1__1__6__ 2__1_6__6__ 1__1__1__6__ 2__1__1__1__",
	"^_2_ 2__3_2__ ^",
	"2__3__3__3__ 3__3_5__ 5__5_3__ 2__3__2__3__",
	"2_3_ 2_1_6__ ^",
	"1__1__1__6__ 1__2_6___6___ 1__1__1__6__ 2__1_^",
	"2_^2__ 2_3_ 2^ 5__6__",
	"6__5_5__ 5_5__6__ 6__1_6__ 5__6__5__3__",
	"2_2_ 2__3__2__6__ ^",
	"1__1__1__6__ 1__2_6___6___ 1__1__1__6__ 2__1_^",
	"6__6_6__ 6_3__6__ 6__5_^ 5-",
	"5__3__2__3__ 3__5__3__3__ 3-",
	"2__2_3__ 2_6__2__ 2-",
	"1__1__1__1__ 1__6_1__ ^1__1__1__ 2__1__1__1__",
	"6__5__5__5__ 5__5__5__3__ 6_5_ 5^5__",
	"6__5__6__5__ 6_^5__ 5__3__5__3_ 5__5_5__ 6_6__6__ 5__6__5__3__ 3^3__ 2__1__2__1__ 2__6_1__ 1__7__1__7__ 1__6_^ 1_7_ 7__1__7__6__ 6",
	"5__5__ 1_2__3__ 5_2__3__2__ 51 6_^5__ 5_5_ 5-",
	"5__3__2__3__ 3__5__3__3__ 5__3_^ 3",
	"2__2_3__ 2_6__3__ 3-",
	"1__1__1__1__ 1__6_1__ 1__1__1__1__ 2__1__1__1__",
	"6__5__5__5__ 5__5__5__1__ 6_^5__ 5_^5__",
	"6__5__6__5__ 6_^5__ 5__3__5__3_ 5_5__5__ 6_6__6__ 5__6__5__3__ 3^3__ 2__1__2__1__ 2__6_1__ 1__7__1__7__ 1__6_^ 1_7_ 7__1__7__6__ 6",
	"6^3__ 2__1__2__1__ 2__6_1__ ^7__1__7__ 1__6_^ 177_1_6 6^"
];
</script>

<style scoped></style>
