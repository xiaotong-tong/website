<template>
	<FieldsetCard title="猫矢ねねこ">
		<div>
			<div class="flex flex-wrap">
				<div class="w-[50%]"><span>生命：</span><span>396</span></div>
				<div class="w-[50%]"><span>攻击：</span><span>73</span></div>
				<div class="w-[50%]"><span>灵力：</span><span>26</span></div>
				<div class="w-[50%]"><span>速度：</span><span>85</span></div>
				<div class="w-[50%]"><span>防御：</span><span>39</span></div>
				<div class="w-[50%]"><span>格挡：</span><span>41</span></div>
				<div class="w-[50%]"><span>命中：</span><span>65</span></div>
				<div class="w-[50%]"><span>闪避：</span><span>82</span></div>
				<div class="w-[50%]"><span>暴击：</span><span>88</span></div>
				<div class="w-[50%]"><span>幸运：</span><span>75</span></div>
			</div>
			<roughLine class="my-1"></roughLine>
			<div>
				<div>
					<div>猫パンチ</div>
					<div>对随机一名敌方角色造成两次自身攻击 50% 的物理伤害。</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>超高速猫パンチ</div>
					<div>
						偶数回合 100% 几率释放, 对随机一名敌方角色造成自身攻击 (110% - 10% * 当前回合已触发数)
						的物理伤害。若此技能对目标造成暴击，则额外重新触发一次此技能。
					</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>一気に叩く <span class="text-[12px] text-[#f00]">等级达到 D 级时解锁</span></div>
					<div>释放 “超高速猫パンチ” 时，前两击必定暴击。</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>霊を探知<span class="text-[12px] text-[#f00]">等级达到 9 级时解锁</span></div>
					<div>当场上有角色处于濒死状态时，提升自身 30 点灵力值, 10点闪避值, 10点暴击值。</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>猫キック <span class="text-[12px] text-[#f00]">等级达到 5 级时解锁</span></div>
					<div>释放 “超高速猫パンチ” 时，追加的攻击必定命中。</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>狩猟本能 <span class="text-[12px] text-[#f00]">等级达到 0 级时解锁</span></div>
					<div>
						“超高速猫パンチ” 攻击目标改为敌方血量最低的角色，并提升自身 30 点攻击值, 20点命中值,
						20点暴击值。
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
