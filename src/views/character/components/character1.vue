<template>
	<FieldsetCard title="星川涟 - 魔法见习生">
		<div>
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
			<roughLine class="my-1"></roughLine>
			<div>
				<div>
					<div>魔法之风</div>
					<div>
						沟通无处不在的元素之灵，对敌方全体角色连续造成 3 次自身灵力 10% 的灵力伤害,
						且在每次伤害判定时，有 5% 的几率使目标陷入沉睡状态, 持续到本回合结束。
					</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>名为希望的魔法</div>
					<div>
						<div>
							第 2,5,8 行动回合 100% 几率释放, 以自身灵力引动元素之灵, 对自身与敌方全体角色连续造成 5
							次自身灵力 30% 的灵力伤害， 且在每次伤害判定时，有 10% 的 几率使目标陷入沉睡状态,
							持续到本回合结束。
						</div>
						<div>
							技能释放完成后, 为自身施加 灵动 状态，持续到下回合结束。灵动 状态持续期间会提升自身20%
							技能释放几率
						</div>
						<div>技能释放未满五次中断时，为自己施加 1 层魔法护盾，下次受到的伤害减少 20%。</div>
					</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>元素之灵的垂怜 <span class="text-[12px] text-[#f00]">等级达到 D 级时解锁</span></div>

					<div>释放 “名为希望的魔法” 时， 提升自身 30 点灵力。</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>世界树的宠爱 <span class="text-[12px] text-[#f00]">等级达到 9 级时解锁</span></div>
					<div>每回合开始阶段提升自身 3 点速度, 3 点暴击, 3 点幸运, 3 点命中。</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>旧世的馈赠 <span class="text-[12px] text-[#f00]">等级达到 5 级时解锁</span></div>
					<div>“名为希望的魔法” 施加的 灵动 状态目标更改为我方全体，且数值由 20% 提升为 30%。</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>以希望之名 <span class="text-[12px] text-[#f00]">等级达到 0 级时解锁</span></div>
					<div>
						释放 “名为希望的魔法” 时，为自身施加 庇护
						状态，吸收对自身造成的伤害并转化为同等数值的灵力护盾，并免疫沉睡状态，持续到本回合结束。
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
