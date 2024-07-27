<template>
	<section class="px-8 pt-4 font-[luoliti]">
		<div class="flex">
			<img class="w-[26%] me-4" src="https://image.xtt.moe/images/mlian5.webp" alt="" />
			<div class="flex-1">
				<div><span>姓名：</span> <span>星川涟</span></div>
				<div><span>真实名称：</span> <span>凌涟漪</span></div>
				<div><span>性别：</span> <span>女</span></div>
				<div><span>年龄：</span> <span>15</span></div>
				<div><span>身高：</span> <span>152cm</span></div>
				<div><span>职业：</span> <span>学生、文学少女见习生</span></div>
				<div><span>喜欢的东西：</span> <span>文字、音乐</span></div>
				<div><span>爱好：</span> <span>享受文字中的情感</span></div>
				<div><span>能力：</span> <span>可以察觉人类的情感</span></div>
				<div>
					<span>性格：</span>
					<span>沉静缄默、内心敏感，珍视身边的亲人和朋友，同时又怯懦怕生</span>
				</div>
			</div>
		</div>
		<namiRoughLine class="my-2" :color="store.currentTheme"></namiRoughLine>
		<div class="flex">
			<div class="flex-1">
				<div class="flex flex-wrap">
					<div class="w-[50%]"><span>生命：</span><span>425</span></div>
					<div class="w-[50%]"><span>攻击：</span><span>36</span></div>
					<div class="w-[50%]"><span>灵力：</span><span>61</span></div>
					<div class="w-[50%]"><span>速度：</span><span>40</span></div>
					<div class="w-[50%]"><span>防御：</span><span>43</span></div>
					<div class="w-[50%]"><span>格挡：</span><span>18</span></div>
					<div class="w-[50%]"><span>命中：</span><span>76</span></div>
					<div class="w-[50%]"><span>闪避：</span><span>37</span></div>
					<div class="w-[50%]"><span>暴击：</span><span>50</span></div>
					<div class="w-[50%]"><span>幸运：</span><span>88</span></div>
				</div>
				<namiRoughLine class="my-1" :color="store.currentTheme"></namiRoughLine>
				<div>
					<div>
						<div>普攻： 我会努力的！</div>
						<div>
							吟唱魔法书中的咒文, 对敌方全体造成 3 次 20% 灵力的灵力伤害,
							每次造成伤害时有 10% 几率使目标对象陷入沉睡状态, 持续到本回合结束。
						</div>
					</div>
					<namiRoughLine class="my-1" :color="store.currentTheme"></namiRoughLine>
					<div>
						<div>技能： 魔法~魔法~</div>
						<div>
							第 2,5,8 回合 100% 几率释放, 吟唱魔法书中的未知咒文,
							对自己与敌方全体造成 5 次 30% 灵力的灵力伤害， 每次造成伤害时有 10%
							几率使目标对象陷入沉睡状态, 持续到本回合结束。并在释放完成后提升我方全体
							20% 技能释放几率, 持续一回合。
						</div>
					</div>
					<namiRoughLine class="my-1" :color="store.currentTheme"></namiRoughLine>
					<div>
						<div>队长技： 我不会让大家失望的！</div>
						<div>我方全体提升 10 点速度, 并在释放技能时, 提升 10% 的技能释放几率。</div>
					</div>
					<namiRoughLine class="my-1" :color="store.currentTheme"></namiRoughLine>
					<div>
						<div>支援技： 交给我吧。</div>
						<div>提升我方全体 10 点速度。</div>
					</div>
					<namiRoughLine class="my-1" :color="store.currentTheme"></namiRoughLine>
				</div>
			</div>
			<img class="w-[26%] me-4" src="https://image.xtt.moe/images/lian5.webp" alt="" />
		</div>
	</section>
</template>

<script setup lang="ts">
import { useStore } from "@/stores";
const store = useStore();
</script>

<style scoped></style>
