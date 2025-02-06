<template>
	<FieldsetCard title="凌昕夕">
		<div>
			<div class="flex flex-wrap">
				<div class="w-[50%]"><span>生命：</span><span>486</span></div>
				<div class="w-[50%]"><span>攻击：</span><span>64</span></div>
				<div class="w-[50%]"><span>灵力：</span><span>100</span></div>
				<div class="w-[50%]"><span>速度：</span><span>68</span></div>
				<div class="w-[50%]"><span>防御：</span><span>64</span></div>
				<div class="w-[50%]"><span>格挡：</span><span>59</span></div>
				<div class="w-[50%]"><span>命中：</span><span>75</span></div>
				<div class="w-[50%]"><span>闪避：</span><span>57</span></div>
				<div class="w-[50%]"><span>暴击：</span><span>63</span></div>
				<div class="w-[50%]"><span>幸运：</span><span>70</span></div>
			</div>
			<roughLine class="my-1"></roughLine>
			<div>
				<div>
					<div>宇宙无敌雷霆剑</div>
					<div>对敌方全体角色造成 10 点无视防御的物理伤害，该攻击必定命中。</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>我的魔法</div>
					<div>
						偶数回合 100% 几率释放, 对敌方全体造成敌方攻击 100% 的物理伤害和敌方灵力 100% 的灵力伤害。
					</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>我是姐姐 <span class="text-[12px] text-[#f00]">等级达到 D 级时解锁</span></div>
					<div>当“星川涟”在场时，提升自身 10 点全属性值。</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>宇宙无敌的姐姐 <span class="text-[12px] text-[#f00]">等级达到 9 级时解锁</span></div>
					<div>
						当“星川涟”在场时，提升自身与“星川涟” 30
						点防御值。且若“星川涟”当前血量低于自身时，则分享生命值直至两方血量相等。
					</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>相信的心 <span class="text-[12px] text-[#f00]">等级达到 5 级时解锁</span></div>
					<div>在场时，“星川涟”不会进入濒死状态。</div>
				</div>
				<roughLine class="my-1"></roughLine>
				<div>
					<div>心之所向 <span class="text-[12px] text-[#f00]">等级达到 0 级时解锁</span></div>
					<div>释放“相信的心就是我的魔法”后，降低敌方全体 10 点灵力值和 10 点攻击值。</div>
				</div>
			</div>
		</div>
	</FieldsetCard>
</template>

<script lang="ts" setup>
import { roughLine, FieldsetCard } from "@c/index";
</script>

<style scoped></style>
