<template>
	<section class="container">
		<hBanner wrapperTargetName="h2">Archives</hBanner>

		<nami-timeline>
			<nami-timeline-item :group="true">
				<template v-slot:body>
					<h3 class="font-bold text-xl">2024</h3>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">10-13</span>
					<nami-link v-lang="'zh'" to="/article/33">tailwind 自定义提升选择器优先级修饰符</nami-link>
					<nami-link v-lang="'ja'" to="/ja/article/33"> tailwind カスタムセレクタ優先度修飾子</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">10-06</span>
					<nami-link v-lang="'zh'" to="/article/32"> ヨルシカ - 憂、燦々 歌詞</nami-link>
					<nami-link v-lang="'ja'" to="/ja/article/32"> ヨルシカ - 憂、燦々 歌詞</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">09-24</span>
					<nami-link v-lang="'zh'" to="/article/31"> QQ 机器人开发(2)-私聊信息的接收与回复</nami-link>
					<nami-link v-lang="'ja'" to="/ja/article/31">
						QQ bot 開発(2) - プライベートメッセージの受信と返信</nami-link
					>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">09-13</span>
					<nami-link v-lang="'zh'" to="/article/30"> monaco编辑器使用</nami-link>
					<nami-link v-lang="'ja'" to="/ja/article/30"> monaco-editor の使い方</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">09-07</span>
					<nami-link v-lang="'zh'" to="/article/28"> QQ机器人开发(1) - 注册与权限认证</nami-link>
					<nami-link v-lang="'ja'" to="/ja/article/28"> QQ bot 開発(1) - 登録と権限認証</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">08-03</span>
					<nami-link v-lang="'zh'" to="/article/27"> ナミダノコエ 歌詞</nami-link>
					<nami-link v-lang="'ja'" to="/ja/article/27"> ナミダノコエ 歌詞</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">07-30</span>
					<nami-link v-lang="'zh'" to="/article/26"> 在 Linux 中运行 Puppeteer</nami-link>
					<nami-link v-lang="'ja'" to="/ja/article/26"> Linux で Puppeteer を実行する</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">01-02</span>
					<nami-link v-lang="'zh'" to="/article/25"> 使用 Web NFC 实现手机端浏览器的登录功能</nami-link>
					<nami-link v-lang="'ja'" to="/ja/article/25">
						Web NFC を使用して、スマホのブラウザでログイン機能を実装する</nami-link
					>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">01-02</span>
					<nami-link v-lang="'zh'" to="/article/24">android 和 pc 的调试</nami-link>
					<nami-link v-lang="'ja'" to="/ja/article/24">android と pc のデバッグ</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item :group="true">
				<template v-slot:body>
					<h3 class="font-bold text-xl">2023</h3>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">12-26</span>
					<nami-link v-lang="'zh'" to="/article/23">documentPictureInPicture API 学习记录</nami-link>
					<nami-link v-lang="'ja'" to="/ja/article/23">documentPictureInPicture API 勉強記録</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">11-24</span>
					<nami-link v-lang="'zh'" to="/article/22">ごはんを食べよう 歌词</nami-link>
					<nami-link v-lang="'ja'" to="/ja/article/22">ごはんを食べよう 歌詞</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">10-13</span>
					<nami-link v-lang="'zh'" to="/article/21">前端知识总结-展开运算符与解构赋值</nami-link>
					<nami-link v-lang="'ja'" to="/ja/article/21">
						web の知識のまとめ-スプレッド構文と分割代入</nami-link
					>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">10-13</span>
					<nami-link v-lang="'zh'" to="/article/20">前端知识总结-函数</nami-link>
					<nami-link v-lang="'ja'" to="/ja/article/20">web の知識のまとめ-関数</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">10-13</span>
					<nami-link v-lang="'zh'" to="/article/19">前端知识总结-迭代器和生成器</nami-link>
					<nami-link v-lang="'ja'" to="/ja/article/19">
						web の知識のまとめ - イテレーターとジェネレーター関数</nami-link
					>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">09-11</span>
					<nami-link v-lang="'zh'" to="/article/17">日本語の星について</nami-link>
					<nami-link v-lang="'ja'" to="/ja/article/17">星について</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">09-10</span>
					<nami-link v-lang="'zh'" to="/article/16">二和两的区别</nami-link>
					<nami-link v-lang="'ja'" to="/ja/article/16">中国語の「二」と「两」の違い方</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">08-25</span>
					<nami-link v-lang="'zh'" to="/article/14">js 中的数字字面量</nami-link>
					<nami-link v-lang="'ja'" to="/ja/article/14">js の数値リテラルについて</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">08-18</span>
					<nami-link v-lang="'zh'" to="/article/13">Chevereto 上传功能的使用记录</nami-link>
					<nami-link v-lang="'ja'" to="/ja/article/13"
						>Chevereto の api に画像をアップロードする方法</nami-link
					>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">08-14</span>
					<nami-link v-lang="'zh'" to="/article/12">关于 ts 中 setTimeout 类型的记录</nami-link>
					<nami-link v-lang="'ja'" to="/ja/article/12">ts の setTimeout の型についての記録</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">08-03</span>
					<nami-link v-lang="'zh'" to="/article/11"> css highlights 学习之括号内文本高亮</nami-link>
					<nami-link v-lang="'ja'" to="/ja/article/11">
						css highlights 勉強と括弧内のテキストのハイライト</nami-link
					>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">08-03</span>
					<nami-link v-lang="'zh'" to="/article/10">关于网站背景的更换指南</nami-link>
					<nami-link v-lang="'ja'" to="/ja/article/10">ウェブサイトの背景の変更ガイド</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">08-01</span>
					<nami-link v-lang="'zh'" to="/article/9">npm 打包小记</nami-link>
					<nami-link v-lang="'ja'" to="/ja/article/9">npm パッケージのテストと公開</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">07-28</span>
					<nami-link v-lang="'zh'" to="/article/8">两数相加</nami-link>
					<nami-link v-lang="'ja'" to="/ja/article/8">ふたつの数の足し算</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">07-25</span>
					<nami-link v-lang="'zh'" to="/article/7">基于迭代器实现一个循环方法</nami-link>
					<nami-link v-lang="'ja'" to="/ja/article/7">イテレーターでループを実装する</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">07-25</span>
					<nami-link v-lang="'zh'" to="/article/6">数据库基础学习</nami-link>
					<nami-link v-lang="'ja'" to="/ja/article/6">データベース基礎の学ぶ</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">07-21</span>
					<nami-link v-lang="'zh'" to="/article/4">js function length 属性</nami-link>
					<nami-link v-lang="'ja'" to="/ja/article/4">js function length プロパティ</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">07-18</span>
					<nami-link v-lang="'zh'" to="/article/2">js 排序</nami-link>
					<nami-link v-lang="'ja'" to="/ja/article/2">js でのソート</nami-link>
				</template>
			</nami-timeline-item>
		</nami-timeline>
	</section>
</template>

<script setup lang="ts">
import { hBanner } from "@c/index";
</script>

<style scoped>
.time {
	color: #f34159;
	margin-inline-end: 8px;
}
</style>
