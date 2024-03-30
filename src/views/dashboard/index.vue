<template>
	<section>
		<recentComment></recentComment>
		<!-- <div>
			<p>{{ quote?.word }}</p>
			<p>{{ quote?.kana }}</p>
			<p v-html="quote?.parse"></p>
		</div> -->
	</section>
</template>

<script setup lang="ts">
// import { ref } from "vue";
import recentComment from "./module/recentComment.vue";
// import { itemByDay } from "days-quotes";
// import { formatDate } from "xtt-utils";

// const quote = ref(itemByDay(formatDate(new Date(), "YYYY-MM-DD")));
</script>

<style scoped></style>
