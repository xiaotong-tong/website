<template>
	<div class="font-sans w-full bg-[#e6e6e6] flex justify-center pt-4 pb-4">
		<div ref="printRef" class="flex-none w-[90%] max-w-[900px] bg-[#fff] p-4">
			<section class="">
				<h2 class="text-2xl">基本资料</h2>
				<div class="pt-2 pl-4 grid grid-cols-1 md:grid-cols-2 gap-2">
					<div>
						<span class="mr-2">姓名:</span>
						<span>吴同同 - 男 - 1999</span>
					</div>
					<div>
						<span class="mr-2">工作经验:</span>
						<span>4年</span>
					</div>
					<div>
						<span class="mr-2">手机:</span>
						<span>{{ atob("MTUzODU3NTk1NTA=") }}</span>
					</div>
					<div>
						<span class="mr-2">邮箱:</span>
						<span>wtt150249@gmail.com</span>
					</div>
					<div class="row-span-2 flex">
						<span class="mr-2">学历:</span>
						<span class="flex flex-col justify-between"
							><span>本科 - 软件工程</span> <span>宿州学院 - 2017/09 - 2021/06</span></span
						>
					</div>
					<div>
						<span class="mr-2">GitHub:</span>
						<span>
							<a href="https://github.com/xiaotong-tong" target="_blank"
								>https://github.com/xiaotong-tong</a
							>
						</span>
					</div>
					<div>
						<span class="mr-2">Blog:</span>
						<span>
							<a href="https://xtt.moe" target="_blank">https://xtt.moe</a>
						</span>
					</div>
				</div>
			</section>
			<roughLine class="mt-2 mb-2" color="#a5a9aa55" />
			<section>
				<h2 class="text-2xl">专业技能</h2>
				<div class="pt-2 pl-4 grid grid-cols-1 gap-2">
					<div>
						熟练掌握各项前端开发技术，熟悉 Web
						规范和浏览器兼容性适配。独立完成过多个项目，具有项目架构经验和基础框架开发经验。
					</div>
					<div>熟练使用 Vue 及其生态系统，以及 Rollup、Vite 等前端工程化工具的使用。</div>
					<div>熟练使用 TypeScript， 具有良好的编程习惯，并对 JavaScript 性能优化有一定的理解。</div>
					<div>熟悉 Node.js 后端开发，具有使用 Express 和 Sequelize ORM 框架开发网站后端的经验。</div>
					<div>熟悉 Uniapp 的使用，具有 APP 和 微信小程序 项目经验。</div>
					<div>熟悉 自动化测试 和 单元测试，具有 Puppeteer 自动化测试和 Jest 单元测试开发经验。</div>
					<div>
						了解网站部署全流程，包括 Linux 服务器搭建、Nginx 与 HTTPS 部署、SEO 与 Google Search Console
						等。
					</div>
				</div>
			</section>
			<roughLine class="mt-2 mb-2" color="#a5a9aa55" />
			<section>
				<h2 class="text-2xl">语言技能</h2>
				<div class="pt-2 pl-4">
					<div>拥有日语 N2 等级证书。</div>
				</div>
			</section>
			<roughLine class="mt-2 mb-2" color="#a5a9aa55" />
			<section>
				<h2 class="text-2xl">工作经历</h2>
				<div class="pt-2 pl-4">
					<section>
						<div class="flex justify-between flex-col md:flex-row">
							<span class="text-xl">
								{{ atobUnicode("5LiK5rW36Ie75ZOJ5L+h5oGv56eR5oqA5pyJ6ZmQ5YWs5Y+4") }}
							</span>
							<span>2023年12月 - 至今</span>
						</div>
						<div class="pt-2 pl-4 grid grid-cols-1 gap-2">
							<div>
								参与 MES 管理系统的前端开发，包括了管理后台、产线终端系统、移动端APP、生产数据看板
								的前端开发。
							</div>
							<div>负责 优瑞特 微信小程序 和 对应管理后台的从零到一的开发。</div>
							<div>负责 客流管理系统 的前端开发，包括 ECharts 图表和数据报表等。</div>
						</div>
					</section>
					<section class="pt-4">
						<div class="flex justify-between flex-col md:flex-row">
							<span class="text-xl">
								{{ atobUnicode("5a6J5b6956eR5aSn5Zu95Yib6L2v5Lu256eR5oqA5pyJ6ZmQ5YWs5Y+4") }}
							</span>
							<span>2020年12月 - 2023年6月</span>
						</div>
						<div class="pt-2 pl-4 grid grid-cols-1 gap-2">
							<div>
								负责 XUX 基础组件库项目的各种组件的开发和维护，同时也参与组件库相关的 自动化测试 以及
								a11y 无障碍优化。
							</div>
							<div>负责公司小组内部的 任务管理系统 的开发与维护。用于小组内部的任务分配和进度管理。</div>
						</div>
					</section>
				</div>
			</section>
			<roughLine class="mt-2 mb-2" color="#a5a9aa55" />
			<section>
				<h2 class="text-2xl">项目经历</h2>
				<div class="pl-4 pt-2 grid grid-cols-1 gap-3">
					<section>
						<div class="flex justify-between flex-col md:flex-row">
							<span class="text-xl">MES 管理系统后台 + 产线终端 + 生产数据看板</span>
							<span>2023年12月 - 至今</span>
						</div>
						<div class="pt-2 pl-4 grid grid-cols-1 gap-2">
							<div>
								项目介绍： 该项目由 管理后台 和 产线终端 和 生产数据看板
								等多部分共同组成，多个项目均使用 Vue 进行开发。其中 管理后台
								提供给工厂管理人员和操作人员使用，方便维护和查看生产数据。产线终端
								则直接安装在生产线上，用于员工操作和记录生产数据。数据大屏看板用于 产线实时数据展示 和
								供整体管理的生产效率和异常数据展示。
							</div>
							<div>
								技术栈： Vue3 + TypeScript + Vite + Ant Design Vue + ECharts + UnoCSS + Vxe Table +
								ExcelJS
							</div>
							<div>
								<div>责任描述：</div>
								<div class="pl-4 grid grid-cols-1 gap-1.5">
									<div>负责主档数据和报表数据的页面开发，包括对应的导入、导出功能。</div>
									<div>
										负责用户权限和菜单权限的功能开发，可以在后台同时管理 后台、产线终端、移动端APP
										的用户角色及菜单权限控制。
									</div>
									<div>
										负责产线终端的开发，包括生产数据的录入、生产进度的控制、生产数据的上传等功能。
									</div>
									<div>
										负责生产数据看板的开发，包括
										实时生产看板、生产效率看板、生产异常看板等十数种数据大屏。
									</div>
									<div>
										产线终端使用 WebSocket 进行数据通信，保证数据的实时性，防止多终端操作数据冲突。
									</div>
									<div>
										产线终端操作性优化，对扫码枪短时间几秒内多次扫码进行防抖处理，防止数据重复录入。
										因产线终端皆为触摸屏，对触摸屏操作进行优化，减少误操作。
									</div>
									<div>产线终端 西班牙语 和 英语 的国际化处理，方便墨西哥工厂使用。</div>
								</div>
							</div>
						</div>
					</section>
					<section>
						<div class="flex justify-between flex-col md:flex-row">
							<span class="text-xl">MES 管理系统移动端 APP</span>
							<span>2023年12月 - 至今</span>
						</div>
						<div class="pl-4">
							<div class="pt-2">
								项目介绍： 该项目是 MES 管理系统的移动端 APP，用于员工在生产线上的操作和数据录入。和
								产线终端 相辅相成，提供给员工更加便捷的操作方式。
							</div>
							<div class="pt-2">技术栈： Vue3 + Uniapp + TypeScript + Wot Design Uni</div>
							<div class="pt-2">
								<div>责任描述：</div>
								<div class="pl-4 grid grid-cols-1 gap-1.5">
									<div>负责生产数据的录入、生产数据的上传等功能，包括 扫码 与 图片上传。</div>
									<div>负责 西班牙语 和 英语 的国际化处理，方便墨西哥工厂使用。</div>
								</div>
							</div>
						</div>
					</section>
					<section>
						<div class="flex justify-between flex-col md:flex-row">
							<span class="text-xl"
								>{{ atobUnicode("5LyY55Ge54m5IOW+ruS/oeWwj+eoi+W6jw==") }} + 管理后台</span
							>
							<span>2024年11月 - 2025年2月</span>
						</div>
						<div class="pl-4">
							<div class="pt-2">
								项目介绍： 该项目是一个 AIGC 图片处理的微信小程序，用户可以根据模板上传图片，上传到 AI
								图片处理服务器生成图片。管理后台主要用于维护 AI 模板。
							</div>
							<div class="pt-2">
								微信小程序技术栈： Vue3 + Uniapp + TypeScript + Wot Design Uni + t-cropper
							</div>
							<div class="pt-2">管理后台技术栈： Vue3 + TypeScript + Vite + UnoCSS + Naive UI</div>
							<div class="pt-2">
								<div>责任描述：</div>
								<div class="pl-4 grid grid-cols-1 gap-1.5">
									<div>
										独立负责整个微信小程序系统搭建，包括使用手机号登陆、图片裁切上传、微信支付等功能。
									</div>
									<div>独立负责整个后台前端系统架构搭建，便于后台管理人员维护 AI 模板。</div>
									<div>
										对 t-cropper 图片裁切组件进行二次封装，修复原有组件的
										bug，并新增了自由比例裁切和自由像素裁切功能。
									</div>
									<div>使用 WebSocket 进行数据通信，保证图片处理进度的真实性。</div>
								</div>
							</div>
						</div>
					</section>
					<section>
						<div class="flex justify-between flex-col md:flex-row">
							<span class="text-xl">
								<a
									v-if="showLink"
									:href="atobUnicode('aHR0cDovLzQ3LjEwMi4xMzQuMTY5')"
									target="_blank"
									>{{ atobUnicode("6ZuA5bei5a6i5rWB566h55CG57O757uf") }}</a
								>
								<span v-else>{{ atobUnicode("6ZuA5bei5a6i5rWB566h55CG57O757uf") }}</span>
							</span>
							<span>2024年2月 - 2024年5月</span>
						</div>
						<div class="pl-4">
							<div class="pt-2">
								项目介绍：
								该项目针对商场人流数据进行分析，用于统计分析过店、入店、出店等客流量相关数据。
							</div>
							<div class="pt-2">技术栈： Vue3 + TypeScript + Vite + Ant Design Vue + ECharts</div>
							<div class="pt-2">
								<div>责任描述：</div>
								<div class="pl-4 grid grid-cols-1 gap-1.5">
									<div>
										独立负责整个系统前端架构搭建，并针对客流量数据各方面完整的进行 ECharts
										图表和数据报表展示。
									</div>
								</div>
							</div>
						</div>
					</section>
					<section>
						<div class="flex justify-between flex-col md:flex-row">
							<span class="text-xl">XUX</span>
							<span>2020年12月 - 2023年6月</span>
						</div>
						<div class="pl-4">
							<div class="pt-2">
								项目介绍： 基于 jQuery 和 jQuery UI 搭建的 Web 组件库，并包括
								自动化测试，代码检查工具，代码打包工具等组件库规范和安全性的工具。
							</div>
							<div class="pt-2">技术栈： jQuery + jQuery UI + Puppeteer</div>
							<div class="pt-2">
								<div>责任描述：</div>
								<div class="pl-4 grid grid-cols-1 gap-1.5">
									<div>
										升级与维护组件库基础代码，保证其稳定与可靠。并跟踪项目依赖库的更新，保证项目的安全性和健壮性。
									</div>
									<div>
										维护和更新自动化测试代码，保证组件库的稳定性。并基于 Puppeteer
										实现代码覆盖率测试。
									</div>
									<div>
										基于 NVDA 屏幕阅读器 和 axe-core 测试工具，对组件库的无障碍
										进行优化。保证项目的合规性和可交互性。
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</section>
			<roughLine class="mt-2 mb-2" color="#a5a9aa55" />
			<section>
				<h2 class="text-2xl">个人项目</h2>
				<div class="pl-4 pt-2 grid grid-cols-1 gap-3">
					<section>
						<div class="flex justify-between flex-col md:flex-row">
							<span class="text-xl">
								<a href="https://xtt.moe/" target="_blank">基于 Vue 的个人博客前端</a>
							</span>
							<span>2023年4月 - 至今</span>
						</div>
						<div class="pl-4">
							<div class="pt-2">
								项目介绍： 从零开始搭建的个人博客和主页，用于记录和分享自己的学习资料文档和实验新 Web
								技术。
							</div>
							<div class="pt-2">技术栈： Vue3 + TypeScript + Monaco Editor + marked + GSAP</div>
							<div class="pt-2">
								<div>责任描述：</div>
								<div class="pl-4 grid grid-cols-1 gap-1.5">
									<div>
										从零搭建所有页面和组件，并对页面进行多尺寸设备适配和 SEO
										优化，保证页面的性能和用户体验。
									</div>
									<div>
										使用 Monaco Editor 实现文章编辑功能，并使用 marked 实现文章的自定义页面渲染。
									</div>
									<div>
										学习和实验 Web 新功能，如 :has() 选择器、@layer 规则、@apply 规则、
										documentPictureInPicture 等。
									</div>
									<div>
										各种小功能的实现，包括
										钢琴键、为汉字添加拼音、为日文汉字添加假名、根据文本生成二维码等。
									</div>
									<div>为页面和文章进行 日文 国际化适配。为页面样式添加黑夜模式适配。</div>
								</div>
							</div>
						</div>
					</section>
					<section>
						<div class="flex justify-between flex-col md:flex-row">
							<span class="text-xl">
								<a href="https://github.com/xiaotong-tong/website-server" target="_blank"
									>基于 Node.js 的个人博客后端</a
								>
							</span>
							<span>2023年4月 - 至今</span>
						</div>
						<div class="pl-4">
							<div class="pt-2">项目介绍： 从零开始搭建的个人博客后端。</div>
							<div class="pt-2">技术栈： Node.js + Express + Sequelize + MySQL + Nginx</div>
							<div class="pt-2">
								<div>责任描述：</div>
								<div class="pl-4 grid grid-cols-1 gap-1.5">
									<div>博客后端的搭建，包括文章管理、评论管理、动态管理等功能。</div>
									<div>用户权限的管理，防止 API 接口未鉴权导致的数据问题。</div>
									<div>实现 阿里云 OSS 文件和图片上传功能、以及本地 Chevereto 图床的图片上传功能</div>
									<div></div>
								</div>
							</div>
						</div>
					</section>
					<section>
						<div class="flex justify-between flex-col md:flex-row">
							<span class="text-xl">
								<a href="https://github.com/xiaotong-tong/qq-bot" target="_blank"
									>基于 Node.js 的 QQ机器人</a
								>
							</span>
							<span>2024年8月 - 至今</span>
						</div>
						<div class="pl-4">
							<div class="pt-2">
								项目介绍： 基于 QQ 开放平台的 QQ 机器人，解析 QQ 消息，实现自动回复和功能扩展。
							</div>
							<div class="pt-2">技术栈： Node.js + WebSocket + jsqr</div>
							<div class="pt-2">
								<div>责任描述：</div>
								<div class="pl-4 grid grid-cols-1 gap-1.5">
									<div>对接 QQ机器人官方 API 接口，实现私聊和群聊的解析指令并自动回复。</div>
									<div>解析文字生成 QrCode，和解析 QrCode 图片返回解码文本。</div>
									<div>实现为汉字添加拼音、为日文汉字添加假名等功能</div>
									<div>
										{{
											atobUnicode(
												"5a+55o6l6Zi/6YeM5LqR55m+54K855qEIGRlZXBzZWVrIOaooeWei++8jOWunueOsGFp5a+56K+d5Yqf6IO944CC"
											)
										}}
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</section>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { roughLine } from "@c/index";
import { useUrlSearchParams } from "@vueuse/core";
import { useElementSize } from "@vueuse/core";

const printRef = ref<HTMLElement | null>(null);

const { width } = useElementSize(printRef);

const smallScreen = computed(() => width.value < 800);

function btoaUnicode(str: string) {
	return window.btoa(
		encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
			return String.fromCharCode(parseInt(p1, 16));
		})
	);
}

console.log(btoaUnicode("安徽科大国创软件科技有限公司"));

function atobUnicode(str: string) {
	return decodeURIComponent(
		Array.from(window.atob(str), (c) => {
			return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
		}).join("")
	);
}

const params = useUrlSearchParams("history");
const atob = (str: string) => window.atob(str);
const showLink = ref(params[atob("bGluaw==")] === "a");

document.title = "简历";
</script>

<style scoped></style>
