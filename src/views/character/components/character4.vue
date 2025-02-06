<template>
	<FieldsetCard title="朝露">
		<div>
			<div class="flex flex-wrap">
				<div class="w-[50%]"><span>生命：</span><span>440</span></div>
				<div class="w-[50%]"><span>攻击：</span><span>101</span></div>
				<div class="w-[50%]"><span>灵力：</span><span>37</span></div>
				<div class="w-[50%]"><span>速度：</span><span>42</span></div>
				<div class="w-[50%]"><span>防御：</span><span>28</span></div>
				<div class="w-[50%]"><span>格挡：</span><span>76</span></div>
				<div class="w-[50%]"><span>命中：</span><span>100</span></div>
				<div class="w-[50%]"><span>闪避：</span><span>8</span></div>
				<div class="w-[50%]"><span>暴击：</span><span>55</span></div>
				<div class="w-[50%]"><span>幸运：</span><span>11</span></div>
			</div>
			<roughLine class="my-1"></roughLine>
			<div>
				<div>
					<div>流逝</div>
					<div>对血量最低的敌方角色造成自身攻击 100% + 10 * 回合数的物理伤害。</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>裁决</div>
					<div>
						<div>行动回合有 25% 的几率触发。对血量最低的敌方角色造成自身攻击 300% 的物理伤害。</div>
					</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>Acheron <span class="text-[12px] text-[#f00]">等级达到 D 级时解锁</span></div>
					<div>第一回合“裁决”释放几率提示至 100%。</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>审判 <span class="text-[12px] text-[#f00]">等级达到 9 级时解锁</span></div>
					<div>自身攻击使敌方角色死亡时，恢复自身 50% 生命。</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>朝阳 <span class="text-[12px] text-[#f00]">等级达到 5 级时解锁</span></div>
					<div>自身攻击使敌方角色死亡时，提升自身 100 点暴击值，持续到下回合结束。</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>爱 <span class="text-[12px] text-[#f00]">等级达到 0 级时解锁</span></div>
					<div>
						我方任一角色进入濒死状态时，抵抗该次伤害，并恢复 30% 最大生命值的血量。一场战斗只能触发一次。
					</div>
				</div>
			</div>
		</div>
	</FieldsetCard>
</template>

<script lang="ts" setup>
import { roughLine, FieldsetCard } from "@c/index";
</script>

<style scoped></style>
