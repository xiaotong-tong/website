<script setup></script>

<template>
	<RouterView />
</template>

<style>
body {
	margin: 0;
}

::-webkit-scrollbar {
	width: 5px;
	height: 5px;
	margin: 5px 0;
}
::-webkit-scrollbar-thumb {
	margin: 5px 0;
	border-radius: 15px;
	background: grey;
}

::-webkit-scrollbar-track {
	margin: 5px 0;
	border-radius: 15px;
}

@font-face {
	font-family: "miaowu";
	src: url("/fonts/miaowu.ttf");
}
@font-face {
	font-family: "luoliti";
	src: url("/fonts/LuoLiTi-2.ttf");
}
</style>
