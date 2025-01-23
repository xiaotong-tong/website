<template>
	<FieldsetCard title="可乐">
		<div>
			<div class="flex flex-wrap">
				<div class="w-[50%]"><span>生命：</span><span>435</span></div>
				<div class="w-[50%]"><span>攻击：</span><span>36</span></div>
				<div class="w-[50%]"><span>灵力：</span><span>67</span></div>
				<div class="w-[50%]"><span>速度：</span><span>76</span></div>
				<div class="w-[50%]"><span>防御：</span><span>41</span></div>
				<div class="w-[50%]"><span>格挡：</span><span>18</span></div>
				<div class="w-[50%]"><span>命中：</span><span>82</span></div>
				<div class="w-[50%]"><span>闪避：</span><span>21</span></div>
				<div class="w-[50%]"><span>暴击：</span><span>44</span></div>
				<div class="w-[50%]"><span>幸运：</span><span>78</span></div>
			</div>
			<roughLine class="my-1"></roughLine>
			<div>
				<div>
					<div>Roll!</div>
					<div>对 .d3 名敌方角色造成 .d200 灵力的灵力伤害。</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>Roll!Roll!Roll!</div>
					<div>
						<div>
							偶数回合 100% 几率释放, 对敌方全体角色依次进行 .d6>3
							的命中判定，命中判定成功后对命中目标造成自身灵力 .3d150+50 % 的灵力伤害。
						</div>
					</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>骰娘天使的赐福 <span class="text-[12px] text-[#f00]">等级达到 D 级时解锁</span></div>

					<div>
						我方全体角色提升 10 点幸运值。并自身在释放 “Roll!Roll!Roll!”
						后进入赐福状态，在下次骰子判定时,额外进行一次判定,并选取最优结果。
					</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>聆听 <span class="text-[12px] text-[#f00]">等级达到 9 级时解锁</span></div>
					<div>释放 “Roll!Roll!Roll!” 时的命中判定更改为 .d6>2</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>追加检定 <span class="text-[12px] text-[#f00]">等级达到 5 级时解锁</span></div>
					<div>
						我方全体角色在进行伤害判定时，最终伤害值额外进行一次 .d21+94 的骰子判定，即最终伤害会在 95%-115%
						间波动。
					</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>暗骰 <span class="text-[12px] text-[#f00]">等级达到 0 级时解锁</span></div>
					<div>每回合开始阶段提升自身 .d100 % 点灵力，持续到本回合结束。</div>
				</div>
			</div>
		</div>
	</FieldsetCard>
</template>

<script lang="ts" setup>
import { roughLine, FieldsetCard } from "@c/index";
</script>

<style scoped></style>
