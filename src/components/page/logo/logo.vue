<template>
	<nami-link class="logo" to="/" inline-block>
		<img
			src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAAeCAYAAACfWhZxAAACpklEQVRYhe1Xv88pQRQdL6+hESEajY6OQlRq/A8oxV+g1NBT06InUaD80IgQHXmJT/mSj0aERrJvz+TNZNif2JcvL7snGXfH7N6559w7d3FJMojN8OO7A/gOOKTtAoe0XeCQtgsUpGu1GnG5XHz0+32SzWbpdTweJ9vt1pKNj8cj9wuLuRnMZrP3Y5H+4nA4SJlMRup0OpKIVqtF18R7ptOp9C6wD9sLtlqtGj5j1f4805vNhlqoLqJYLBK/30+vYQuFAmm32+R6vWoKyaql2+3y71hmkSmGcDhMbS6XI5VKxTBBw+GQ2vl8fleN4j5mwEnv93sahMfj0bwZRCeTiaFTEJCzQgaDAS9BzH0+H4lGo/w+7KkHiMcIQax8Pk9GoxEJBoOoUD4g2jO4O9PNZpMsl0u+oagiLBOk0WgQt9ut6xhVkUwmNdcTiQRZr9e6FQPxGCGIJZc2kUv7aZKP+Mku4AiZTqVSdzdAXQz53FFVn8H5fCaLxYJEIhHFWiAQIKfTiVwuF4WAyCqq4JEcKgXPvYu7TMPharXiZQNVgXfUZef2EaiEUCjEe8kjdrsdtag41ge8Xq8lpHn3RvfEtFQq0S4Ji7mZodZNmQ/W+dUgdnAjyBVB/Yl7IeZXOrnilQUSsVhM6vV61OI7vcDVYPbVImdZKpfLlNAj6vU6XcdIp9PUijGOx2NFYjBX86VJWitws44Alg2zQpmpBgin5g9ZRlIgxrNQJY2NmHpmfjS8CoiETOsFjlhE4ZmwYoafjVEz0zhrzOkrJW4GIICAjc69Gikzz2pBlTQcsdL7l5lGFo38s2NmZRwK0mrl8+rZ0QPIgIjZfiEeuVealwgXPt5/8f1fcP5P2wUOabvAIW0XWEr6druRz89f5ONjTL6+flvp2lL8AdzZhdOIHBCiAAAAAElFTkSuQmCC"
			alt="星川漣 logo"
			class="logoImg"
		/>
		<!-- <span class="logoText">星川涟</span> -->
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
/* .logoText {
	font-size: 18px;
} */

/* @media screen and (max-width: 1250px) {
	.logoText {
		display: none;
	}
} */
.small-screen .logo {
	display: none;
}
</style>
