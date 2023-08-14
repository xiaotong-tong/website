<template>
	<transition name="fade">
		<div class="chatbox" ref="chatbox" v-show="chatBoxShowed">
			<div class="chatWrap">
				<p class="chat" ref="chat" v-html="chatContent"></p>
			</div>
		</div>
	</transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import corpus from "./corpus";

const chatContent = ref("");
const chatBoxShowed = ref(false);

let timer: number | null = null;

const showChatBox = (msg: string, hideDelay: number = 5000) => {
	if (timer) {
		clearTimeout(timer);
	}

	chatBoxShowed.value = true;
	chatContent.value = msg;

	timer = window.setTimeout(() => {
		chatBoxShowed.value = false;
	}, hideDelay);
};

onMounted(() => {
	document.addEventListener("visibilitychange", () => {
		if (document.visibilityState === "visible") {
			showChatBox(corpus.pageVisibilityShow);
		} else {
			showChatBox(corpus.pageVisibilityHide);
		}
	});
});

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

.theme-dark .chatbox {
	background-color: #b0a3ae77;
	color: #ffffff;
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
.theme-dark .chatbox::before {
	border-image: linear-gradient(
			-45deg,
			#b0a3ae 0%,
			#fae8f577 40%,
			transparent 40%,
			transparent 60%,
			#fae8f577 60%,
			#b0a3ae
		)
		1;
}
.theme-dark .chatbox::after {
	border-image: linear-gradient(
			-45deg,
			transparent 1%,
			#b0a3ae 1%,
			#fae8f577 20%,
			transparent 20%,
			transparent 70%,
			#fae8f577 70%,
			#b0a3ae 99%,
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

.fade-enter-active,
.fade-leave-active {
	transition: opacity 1s;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
