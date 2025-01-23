<template>
	<FieldsetCard title="因幡汐（いなばうしお）">
		<div>
			<div class="flex flex-wrap">
				<div class="w-[50%]"><span>生命：</span><span>370</span></div>
				<div class="w-[50%]"><span>攻击：</span><span>77</span></div>
				<div class="w-[50%]"><span>灵力：</span><span>57</span></div>
				<div class="w-[50%]"><span>速度：</span><span>67</span></div>
				<div class="w-[50%]"><span>防御：</span><span>37</span></div>
				<div class="w-[50%]"><span>格挡：</span><span>47</span></div>
				<div class="w-[50%]"><span>命中：</span><span>87</span></div>
				<div class="w-[50%]"><span>闪避：</span><span>57</span></div>
				<div class="w-[50%]"><span>暴击：</span><span>27</span></div>
				<div class="w-[50%]"><span>幸运：</span><span>97</span></div>
			</div>
			<roughLine class="my-1"></roughLine>
			<div>
				<div>
					<div>潮汐</div>
					<div>
						以月亮的力量引发潮汐，对敌方全体角色造成自身灵力 30%
						的灵力伤害，并在命中敌方后，对目标额外造成自身攻击 50% 的物理伤害。
					</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>月光</div>
					<div>
						<div>被动技：奇数回合行动开始时 200% 几率释放，为我方全体恢复 60% 灵力的生命。</div>
					</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>月影 <span class="text-[12px] text-[#f00]">等级达到 D 级时解锁</span></div>
					<div>我方全体角色提升 10 点闪避值。</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>幸运7 <span class="text-[12px] text-[#f00]">等级达到 9 级时解锁</span></div>
					<div>
						自身在受到伤害时，最终伤害有 0.7% 的几率减少 777 点， 7% 的几率减少 77 点， 77% 的几率减少 7
						点。
					</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>潮汐锁定 <span class="text-[12px] text-[#f00]">等级达到 5 级时解锁</span></div>
					<div>攻击必定命中</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>涌潮 <span class="text-[12px] text-[#f00]">等级达到 0 级时解锁</span></div>
					<div>
						释放 “潮汐” 时，灵力伤害判定提升为自身灵力 77% 的灵力伤害，额外伤害提升为自身攻击 100%
						的物理伤害。
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
