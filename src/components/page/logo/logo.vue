<template>
	<nami-link class="logo" to="/" inline-block>
		<!-- <img src="/nami.png" alt="星川漣 logo" class="logoImg" /> -->
		<span class="logoText">星川涟</span>
	</nami-link>
</template>

<script setup></script>

<style scoped>
.logo {
	display: flex;
	font-family: "katong", Arial, Helvetica, sans-serif;
}
.theme-dark .logo {
	color: #fff;
}
.logo::part(link) {
	box-sizing: border-box;
	align-items: center;
	column-gap: 8px;
	width: max-content;
	white-space: nowrap;
}
/* .logoImg {
	height: 32px;
	border-radius: 50%;
	aspect-ratio: 1 / 1;
} */
.logoText {
	font-size: 18px;
}

/* @media screen and (max-width: 1250px) {
	.logoText {
		display: none;
	}
} */
.small-screen .logo {
	display: none;
}
</style>
