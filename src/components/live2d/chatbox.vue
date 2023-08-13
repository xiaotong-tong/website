<template>
	<div class="chatbox" ref="chatbox" v-show="chatBoxShowed">
		<div class="chatWrap">
			<p class="chat" ref="chat" v-html="chatContent"></p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const chatContent = ref("");
const chatBoxShowed = ref(false);

let timer: NodeJS.Timeout | null = null;

const showChatBox = (msg: string) => {
	if (timer) {
		clearTimeout(timer);
	}

	chatBoxShowed.value = true;
	chatContent.value = msg;

	timer = setTimeout(() => {
		chatBoxShowed.value = false;
	}, 5000);
};

defineExpose({
	showChatBox
});
</script>

<style scoped>
.chatbox {
	position: absolute;
	box-sizing: border-box;
	bottom: 320px;
	left: 16px;
	overflow: hidden;
	padding: 8px;
	font-size: 12px;
	background-color: #fae8f577;
}

.chatbox::before,
.chatbox::after {
	content: "";
	position: absolute;
	border: thin solid;
}
.chatbox::before {
	inset: 2px;
	border-image: linear-gradient(
			-45deg,
			#333 0%,
			#ddd 40%,
			transparent 40%,
			transparent 60%,
			#ddd 60%,
			#333
		)
		1;
}
.chatbox::after {
	inset: 5px;
	border-image: linear-gradient(
			-45deg,
			transparent 1%,
			#333 1%,
			#ddd 20%,
			transparent 20%,
			transparent 70%,
			#ddd 70%,
			#333 99%,
			transparent 99%,
			transparent
		)
		1;
}

.chatWrap {
	max-width: 160px;
	max-height: 52px;
	/* scrollbar-gutter: stable; */
	overflow-y: auto;
	pointer-events: auto;
}

.chat {
	margin: 0;
}
</style>
