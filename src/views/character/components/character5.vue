<template>
	<FieldsetCard title="堇">
		<div>
			<div class="flex flex-wrap">
				<div class="w-[50%]"><span>生命：</span><span>480</span></div>
				<div class="w-[50%]"><span>攻击：</span><span>6</span></div>
				<div class="w-[50%]"><span>灵力：</span><span>73</span></div>
				<div class="w-[50%]"><span>速度：</span><span>62</span></div>
				<div class="w-[50%]"><span>防御：</span><span>56</span></div>
				<div class="w-[50%]"><span>格挡：</span><span>42</span></div>
				<div class="w-[50%]"><span>命中：</span><span>74</span></div>
				<div class="w-[50%]"><span>闪避：</span><span>0</span></div>
				<div class="w-[50%]"><span>暴击：</span><span>43</span></div>
				<div class="w-[50%]"><span>幸运：</span><span>0</span></div>
			</div>
			<roughLine class="my-1"></roughLine>
			<div>
				<div>
					<div>焚火求雨</div>
					<div>扣除自身当前血量的 10%, 对敌方随机 3 名角色造成 扣除生命值 + 自身灵力 50% 的灵力伤害。</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>终末之果</div>
					<div>
						第三回合无视任何状态，必定释放,其他回合释放时必定失败。释放后进入“终末”状态，第四回合行动时释放终末之果，对敌方全体角色造成
						自身灵力 444% 的灵力伤害和 自身攻击 444% 的物理伤害。在终末状态下，自身受到的伤害减少 30%,
						且自身速度提升 50 点，命中提升 50 点，幸运提升 50 点。
					</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>在天梯下 <span class="text-[12px] text-[#f00]">等级达到 D 级时解锁</span></div>
					<div>每回合开始时，提升自身 10 点最大生命值，并恢复 30 点血量。</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>蝴蝶花 <span class="text-[12px] text-[#f00]">等级达到 9 级时解锁</span></div>
					<div>释放“终末之果”后回复自身 100% 血量，并清除自身所有负面状态。</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>思慕 <span class="text-[12px] text-[#f00]">等级达到 5 级时解锁</span></div>
					<div>每回合结束时恢复我方全体角色 20 点生命值。</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>白日梦 <span class="text-[12px] text-[#f00]">等级达到 0 级时解锁</span></div>
					<div>每回合开始时，为我方全体施加当前血量 10% 的生命护盾, 持续到当前回合结束。</div>
				</div>
			</div>
		</div>
	</FieldsetCard>
</template>

<script lang="ts" setup>
import { roughLine, FieldsetCard } from "@c/index";
</script>

<style scoped></style>
