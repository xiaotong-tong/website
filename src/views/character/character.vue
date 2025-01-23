<template>
	<section class="px-8 pt-4 font-[luoliti]">
		<MyCharacter1 />
		<namiRoughLine class="my-4"></namiRoughLine>
		<MyCharacter2 />
		<namiRoughLine class="my-4"></namiRoughLine>
		<MyCharacter3 />
		<namiRoughLine class="my-2"></namiRoughLine>
		<div class="flex">
			<div class="flex-1">
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
				<namiRoughLine class="my-1"></namiRoughLine>
				<div>
					<div>
						<div>普攻： 火箭飞拳</div>
						<div>对 1 名敌人造成 120% 攻击的物理伤害</div>
					</div>
					<namiRoughLine class="my-1"></namiRoughLine>
					<div>
						<div>技能： 人を守るため！</div>
						<div>偶数回合 100% 几率释放, 为我方全体施加 170% 防御的护盾, 持续 2 回合。</div>
					</div>
					<namiRoughLine class="my-1"></namiRoughLine>
					<div>
						<div>队长技： 责任的光环</div>
						<div>我方全体受到的最终伤害减少 10 点。</div>
					</div>
					<namiRoughLine class="my-1"></namiRoughLine>
					<div>
						<div>支援技： 支援指令，启动！</div>
						<div>提升我方全体 7 点防御。</div>
					</div>
				</div>
			</div>
			<div class="w-[26%] me-4">
				<div class="text-center">萝卜 - DL01</div>
				<img src="https://image.xtt.moe/images/lian5.webp" alt="" />
			</div>
		</div>
		<namiRoughLine class="my-2"></namiRoughLine>
		<div class="flex">
			<div class="flex-1">
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
				<namiRoughLine class="my-1"></namiRoughLine>
				<div>
					<div>
						<div>流逝</div>
						<div>对血量最低的敌方角色造成自身攻击 100% + 10 * 回合数的物理伤害</div>
					</div>
					<namiRoughLine class="my-1"></namiRoughLine>
					<div>
						<div>裁决</div>
						<div>
							行动回合有 25% 的几率对敌方血量最低的角色造成 300% 攻击的物理伤害，如果目标死亡则恢复自身
							50% 生命。
						</div>
					</div>
					<namiRoughLine class="my-1"></namiRoughLine>
					<div>
						<div>黄泉</div>
						<div>队长技：第一回合“裁决”释放几率提示至 100%。</div>
					</div>
					<namiRoughLine class="my-1"></namiRoughLine>
					<div>
						<div>爱与幻想</div>
						<div>
							支援技：我方任一角色进入濒死状态时，消除该角色的濒死状态，并恢复 10%
							最大生命值的血量。一场战斗只能触发一次。
						</div>
					</div>
				</div>
			</div>
			<div class="w-[26%] me-4">
				<div class="text-center">朝露</div>
				<img src="https://image.xtt.moe/images/lian5.webp" alt="" />
			</div>
		</div>
		<namiRoughLine class="my-2"></namiRoughLine>
		<div class="flex">
			<div class="flex-1">
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
				<namiRoughLine class="my-1"></namiRoughLine>
				<div>
					<div>
						<div>太阳雨</div>
						<div>
							扣除自身当前血量的 10%, 对敌方随机 3 名角色造成 扣除生命值 + 自身灵力 50% 的灵力伤害。
						</div>
					</div>
					<namiRoughLine class="my-1"></namiRoughLine>
					<div>
						<div>终末之果</div>
						<div>
							第三回合无视任何状态，必定释放,其他回合释放时必定失败。释放后进入“终末”状态，下回合行动时释放终末之果，对敌方全体角色造成
							自身灵力 444% 的灵力伤害和 自身攻击 444% 的物理伤害。在终末状态下，自身受到的伤害减少 30%,
							且自身速度提升 50 点，命中提升 50 点，幸运提升 50 点。
						</div>
					</div>
					<namiRoughLine class="my-1"></namiRoughLine>
					<div>
						<div>天梯</div>
						<div>队长技：每回合开始时，提升自身 10 点最大生命值，并恢复 10 点血量。</div>
					</div>
					<namiRoughLine class="my-1"></namiRoughLine>
					<div>
						<div>堇花</div>
						<div>支援技：每回合结束时恢复血量最低的我方角色 10 点生命值。</div>
					</div>
				</div>
			</div>
			<div class="w-[26%] me-4">
				<div class="text-center">堇</div>
				<img src="https://image.xtt.moe/images/lian5.webp" alt="" />
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import MyCharacter1 from "./components/character1.vue";
import MyCharacter2 from "./components/character2.vue";
import MyCharacter3 from "./components/character3.vue";
</script>

<style scoped></style>
