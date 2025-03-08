<template>
	<section class="px-8 pt-4 font-[luoliti]">
		<h2 class="text-center">
			<Panel targetName="div" class="text-[24px]"> 君に出会えて本当に良かった！ </Panel>
		</h2>

		<FieldsetCard title="小恸恸" :borderColor="store.currentTheme">
			<div class="character flex">
				<img class="w-[26%] me-4" src="https://data.xtt.moe/q.jpg" alt="" />
				<div class="flex-1" v-lang="'zh'">
					<div><span>姓名：</span> <span>小恸恸</span></div>
					<div><span>性别：</span> <span>男</span></div>
					<div><span>年龄：</span> <span>26</span></div>
					<div><span>职业：</span> <span>前端开发</span></div>
					<div><span>爱好：</span> <span>acgn 全都感兴趣，但已被生活磨去了兴致</span></div>
					<div><span>E-Mail:</span> <span>wtt150249@gmail.com</span></div>
				</div>
				<div class="flex-1" v-lang="'ja'">
					<div><span>名前：</span> <span>小恸恸</span></div>
					<div><span>性別：</span> <span>男</span></div>
					<div><span>年龄：</span> <span>1999年生まれ</span></div>
					<div><span>職業：</span> <span>フロントエンドエンジニア</span></div>
					<div>
						<span>趣味：</span>
						<span>サブカルに興味があるが、生活の原因でだんだんレベルダウン</span>
					</div>
					<div><span>E-Mail:</span> <span>wtt150249@gmail.com</span></div>
				</div>
			</div>
		</FieldsetCard>

		<FieldsetCard title="星川涟" :borderColor="store.currentTheme">
			<div class="character flex">
				<img class="w-[26%] me-4" src="https://data.xtt.moe/mlian5.webp" alt="" />
				<div class="flex-1" v-lang="'zh'">
					<div><span>姓名：</span> <span>星川涟（ほしかわさざなみ）</span></div>
					<div><span>真实名称：</span> <span>凌涟漪</span></div>
					<div><span>性别：</span> <span>女</span></div>
					<div><span>年龄：</span> <span>15</span></div>
					<div><span>身高：</span> <span>152cm</span></div>
					<div><span>职业：</span> <span>学生、文学少女见习生</span></div>
					<div><span>喜欢的东西：</span> <span>文字、音乐</span></div>
					<div><span>最喜欢的音乐：</span> <span>《漂洋过海来看你》</span></div>
					<div><span>爱好：</span> <span>享受文字中的情感</span></div>
					<div>
						<span>性格：</span>
						<span>沉静缄默、内心敏感，珍视身边的亲人和朋友，同时又怯懦怕生</span>
					</div>
					<div>
						<span>背景：</span>
						<span
							>破碎的异世界的公主，母亲一直在寻找拯救世界的方法。同时在凌昕夕六岁生日那天，因为意外，失去了原本的妹妹，
							母亲捕获到了这份思念与愿望，以整个世界为代价将星川涟送到了地球上，到地球后，成为妹妹的替代品，一直过着平凡又幸福的生活。</span
						>
					</div>
					<div><span>补充：</span><span>星川涟并不知道自己的来历，以及曾经姐姐有过一个妹妹。</span></div>
				</div>
				<div class="flex-1" v-lang="'ja'">
					<div><span>名字：</span> <span>星川（ほしかわ）</span></div>
					<div>
						<span>下の名前：</span> <span>サザナミ　漢字は「漣」、普段は「なみ」と呼んでいいよ。</span>
					</div>
					<div><span>中国の名前：</span> <span>凌漣漪</span></div>
					<div><span>性別：</span> <span>女</span></div>
					<div><span>年齢：</span> <span>15</span></div>
					<div><span>身長：</span> <span>152cm</span></div>
					<div><span>職業：</span> <span>学生です、文学少女見習い</span></div>
					<div><span>好きなもの：</span> <span>文字、音楽</span></div>
					<div><span>趣味：</span> <span>文字の中の感情を楽しむ</span></div>
					<div>
						<span>性格：</span>
						<span
							>静かな内向で、心が繊細で、身近な人を大切にしているけれど、人前に出るのが苦手で臆病な少女</span
						>
					</div>
				</div>
			</div>
		</FieldsetCard>

		<FieldsetCard title="星川陽凪乃" :borderColor="store.currentTheme">
			<div class="character flex">
				<img class="w-[26%] me-4" alt="" />
				<div class="flex-1" v-lang="'zh'">
					<div><span>姓名：</span> <span>星川陽凪乃（ほしかわひなの）</span></div>
					<div><span>真实名称：</span> <span>凌昕夕</span></div>
					<div><span>性别：</span> <span>女</span></div>
					<div><span>年龄：</span> <span>18</span></div>
					<div><span>身高：</span> <span>164cm</span></div>
					<div><span>职业：</span> <span>学生</span></div>
					<div><span>喜欢的东西：</span> <span>妹妹</span></div>
					<div><span>爱好：</span> <span>陪妹妹一起读书、听歌、画画</span></div>
					<div>
						<span>性格：</span>
						<span class="inline-flex flex-col"
							><span>身为姐姐，疼爱妹妹；身为学生，努力学习；身为人类，温柔的对待他人；</span
							><span>总是全力扮演着自己的角色，并无个性鲜明的性格</span></span
						>
					</div>
				</div>
				<div class="flex-1" v-lang="'ja'">
					<div><span>名字：</span> <span>星川（ほしかわ）</span></div>
					<div><span>下の名前：</span> <span>陽凪乃 (ひなの)</span></div>
					<div><span>中国の名前：</span> <span>凌昕夕</span></div>
					<div><span>性別：</span> <span>女</span></div>
					<div><span>年齢：</span> <span>18</span></div>
					<div><span>身長：</span> <span>164cm</span></div>
					<div><span>職業：</span> <span>学生</span></div>
					<div><span>好きなもの：</span> <span>妹 (なみちゃん)</span></div>
					<div><span>趣味：</span> <span>なみと一緒に読書、音楽を聞く、絵を描く</span></div>
					<div>
						<span>性格：</span>
						<span>姉として妹を愛し、学生として勉強し、人間として他人に優しく対する。</span
						><span>いつも自分の役割を全うし、個性的な性格がない</span>
					</div>
				</div>
			</div>
		</FieldsetCard>

		<FieldsetCard :title="i18nStore.lang === 'ja' ? 'サイトって' : '关于本站'" :borderColor="store.currentTheme">
			<p v-lang="'zh'">
				本站是个人网站，主要用于存放一些个人作品，以及一些个人的日常记录。<br />
				本站的代码全部开源，您可以在 Github 上找到本站的源代码：<br />
				前端: https://github.com/xiaotong-tong/website <br />
				后端: https://github.com/xiaotong-tong/website-server <br />
			</p>
			<p v-lang="'ja'">
				このサイトは個人サイトで、主に個人作品や個人の日常記録を保存するために使用されます。<br />
				サイトのコードはすべてオープンソースで、Githubでこのサイトのソースコードを見つけることができます：<br />
				フロントエンド: https://github.com/xiaotong-tong/website <br />
				バックエンド: https://github.com/xiaotong-tong/website-server <br />
			</p>
		</FieldsetCard>
	</section>
</template>

<script setup lang="ts">
import { FieldsetCard, Panel } from "@c/index";
import { useStore } from "@/stores";
import { useI18nStore } from "@/stores/i18n";

const i18nStore = useI18nStore();
const store = useStore();
</script>

<style scoped>
.character {
	& > img {
		aspect-ratio: 1;
		align-self: center;
	}
}

.small-screen {
	.character {
		& > img {
			display: none;
		}
	}
}
</style>
