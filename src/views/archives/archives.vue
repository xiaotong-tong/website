<template>
	<section class="container web-color-default">
		<h2>Archives</h2>

		<nami-timeline>
			<nami-timeline-item :group="true">
				<template v-slot:body>
					<h3>2023</h3>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">11-24</span>
					<nami-link to="/article/22">ごはんを食べよう 歌词</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">10-13</span>
					<nami-link to="/article/21">前端知识总结-展开运算符与解构赋值</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">10-13</span>
					<nami-link to="/article/20">前端知识总结-函数</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">10-13</span>
					<nami-link to="/article/19">前端知识总结-迭代器和生成器</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">09-11</span>
					<nami-link to="/article/17">日本語の星座について</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">09-10</span>
					<nami-link to="/article/16">二和两的区别</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">08-30</span>
					<nami-link to="/article/15">关于本网站的架构</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">08-25</span>
					<nami-link to="/article/14">js 中的数字字面量</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">08-18</span>
					<nami-link to="/article/13">Chevereto 上传功能的使用记录</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">08-14</span>
					<nami-link to="/article/12">关于 ts 中 setTimeout 类型的记录</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">08-03</span>
					<nami-link to="/article/11"> css highlights 学习之括号内文本高亮</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">08-03</span>
					<nami-link to="/article/10">关于网站背景的更换指南</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">08-01</span>
					<nami-link to="/article/9">npm 打包小记</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">07-28</span>
					<nami-link to="/article/8">两数相加</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">07-25</span>
					<nami-link to="/article/7">基于迭代器实现一个循环方法</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">07-25</span>
					<nami-link to="/article/6">数据库基础学习</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">07-21</span>
					<nami-link to="/article/4">js function length 属性</nami-link>
				</template>
			</nami-timeline-item>
			<nami-timeline-item>
				<template v-slot:body>
					<span class="time">07-18</span>
					<nami-link to="/article/2">js 排序</nami-link>
				</template>
			</nami-timeline-item>
		</nami-timeline>
	</section>
</template>

<script setup lang="ts"></script>

<style scoped>
.time {
	color: #f34159;
	margin-inline-end: 8px;
}
</style>
