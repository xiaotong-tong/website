<template>
	<nami-link class="logo" to="/" inline-block>
		<img src="/nami.png" alt="星川漣 logo" class="logoImg" />
		<span class="logoText">星川漣</span>
	</nami-link>
</template>

<script setup></script>

<style scoped>
.logo {
	display: flex;
	font-family: "luoliti", Arial, Helvetica, sans-serif;
}
.theme-dark .logo {
	color: #fff;
}
.logo::part(link) {
	box-sizing: border-box;
	align-items: center;
	column-gap: 8px;
}
.logoImg {
	height: 32px;
	border-radius: 50%;
	aspect-ratio: 1 / 1;
}
.logoText {
	font-size: 18px;
}

@media screen and (max-width: 1250px) {
	.logoText {
		display: none;
	}
}
.small-screen .logo {
	display: none;
}
</style>
