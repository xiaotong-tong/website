<template>
	<FieldsetCard title="萝卜 - GS01">
		<div>
			<div class="flex flex-wrap">
				<div class="w-[50%]"><span>生命：</span><span>512</span></div>
				<div class="w-[50%]"><span>攻击：</span><span>46</span></div>
				<div class="w-[50%]"><span>灵力：</span><span>7</span></div>
				<div class="w-[50%]"><span>速度：</span><span>58</span></div>
				<div class="w-[50%]"><span>防御：</span><span>85</span></div>
				<div class="w-[50%]"><span>格挡：</span><span>72</span></div>
				<div class="w-[50%]"><span>命中：</span><span>86</span></div>
				<div class="w-[50%]"><span>闪避：</span><span>17</span></div>
				<div class="w-[50%]"><span>暴击：</span><span>58</span></div>
				<div class="w-[50%]"><span>幸运：</span><span>49</span></div>
			</div>
			<roughLine class="my-1"></roughLine>
			<div>
				<div>
					<div>火箭飞拳</div>
					<div>对 1 名敌人造成自身攻击 120% 的物理伤害</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>守护</div>
					<div>偶数回合 100% 几率释放, 为我方全体施加自身防御 170% 的护盾, 持续 2 回合。</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>守护的光环 <span class="text-[12px] text-[#f00]">等级达到 D 级时解锁</span></div>
					<div>我方全体受到的最终伤害减少 10 点。</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>支援指令 <span class="text-[12px] text-[#f00]">等级达到 9 级时解锁</span></div>
					<div>提升我方全体角色 7 点防御值。</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>守护的责任 <span class="text-[12px] text-[#f00]">等级达到 5 级时解锁</span></div>
					<div>我方生命最低的角色受到伤害时，分担受到伤害的 50% 伤害值。</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>遗愿 <span class="text-[12px] text-[#f00]">等级达到 0 级时解锁</span></div>
					<div>进入濒死状态时，提升我方全体角色 50 点防御值。</div>
				</div>
			</div>
		</div>
	</FieldsetCard>
</template>

<script lang="ts" setup>
import { roughLine, FieldsetCard } from "@c/index";
</script>

<style scoped></style>
