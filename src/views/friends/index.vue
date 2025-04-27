<template>
	<section class="px-4">
		<div class="flex justify-center mb-4">
			<Panel>单箭头</Panel>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<FriendCard name="墨菲易" link="https://murphyyi.com/" logo="https://murphyyi.com/images/icon/logo.png" />
			<FriendCard name="Ai" link="https://ailitonia.com/" description="你想要的，这儿都没有~" />
			<FriendCard
				name="紫慕碎碎念"
				link="https://90zm.net/"
				description="清澈、明净、优雅，愿以此为人生路上的航标！"
				logo="https://90zm.net/picture/logo.jpg"
			/>
		</div>
	</section>
</template>

<script setup lang="ts">
import { FriendCard, Panel } from "@c/index";
</script>

<style scoped></style>
