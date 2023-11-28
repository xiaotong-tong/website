<!-- 
	@see {@look https://www.pentacreation.com/blog/2020/08/200808.html} 
 -->

<template>
	<div ref="threeBox"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as Three from "three";
import axios from "axios";

// 导入轨道控制器
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const threeBox = ref<HTMLElement | null>(null);

// 创建场景
const scene = new Three.Scene();

// 创建相机
const camera = new Three.PerspectiveCamera(
	75, // 视角
	window.innerWidth / window.innerHeight, // 宽高比
	0.1, // 近平面
	100 // 远平面
);

// 创建渲染器
const renderer = new Three.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

//バーテックスシェーダ
const vertexShader = `
    precision mediump float;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;

    attribute vec3 position;
    attribute vec3 customColor;
    attribute float size;

    varying vec3 vColor;

    void main(){

        //視点座標系における頂点座標を算出
        vec4 mvPosition = modelViewMatrix * vec4(position,1.0);

        //頂点サイズを算出
        gl_PointSize = size * (1.0 / length(mvPosition.xyz));

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        vColor = customColor;
    }
`;
//フラグメントシェーダ
const fragmentShader = `
    precision mediump float;

    uniform sampler2D texture;
    varying vec3 vColor;
	varying vec4 vData;

    void main(){

        //頂点にテクスチャを設定
        vec4 texcel = texture2D(texture,gl_PointCoord);

        //頂点色とテクスチャを積算して、描画色を設定
        gl_FragColor = vec4(vColor,0.7) * texcel;
    }
`;

//表示する視聴級の設定
const starGrade = 8.0;
let hipColor: any[], hipA, hipB, hipArray: any[];
let starsNum: number;

//CSVの読み込みと配列への変換関数
async function getCsv() {
	//CSVを配列に変換
	const tranCsv = (data: string) => {
		const array = data.split("\n");
		const res: (string | number)[][] = [];

		for (let i = 0; i < array.length; i++) {
			if (array[i] == "") break;

			res[i] = array[i].split(",");

			for (let j = 0; j < res[i].length; j++) {
				if ((res[i][j] as string).match(/\-?\d+(.\d+)?(e[\+\-]d+)?/)) {
					res[i][j] = parseFloat((res[i][j] as string).replace('"', ""));
				}
			}
		}
		return res;
	};

	const res = await Promise.all([
		axios.get("https://file.xtt.moe/files/space/hip_constellation_line_star.csv"),
		axios.get("https://file.xtt.moe/files/space/hip_lite_a.csv"),
		axios.get("https://file.xtt.moe/files/space/hip_lite_b.csv")
	]);

	//星座線恒星データ
	hipColor = tranCsv(res[0].data);

	//基礎データA
	hipA = tranCsv(res[1].data);

	//基礎データB
	hipB = tranCsv(res[2].data);

	//基礎データA、基礎データBを1つに結合
	hipArray = hipA.concat(hipB);

	//星数のカウント
	starsNum = 0;
	for (let i = 0; i < hipArray.length; i++) {
		if (hipArray[i][8] < starGrade) {
			starsNum++;
		}
	}
}

onMounted(async () => {
	//星座線恒星データの読み込み
	await getCsv();

	let points: THREE.Points;

	// 将渲染器的 dom 元素添加到页面中
	threeBox.value?.appendChild(renderer.domElement);

	// 半径
	const r = 20;
	// 顶点数

	// 创建一个几何体
	const geometry = new Three.BufferGeometry();

	// 创建一个顶点数组列
	const positions = new Float32Array(starsNum * 3);

	const colors = new Float32Array(starsNum * 3);
	const sizes = new Float32Array(starsNum);

	let starSizesArray: number[] = [];

	let j = 0;
	for (let i = 0; i < hipArray.length; i++) {
		if (hipArray[i][8] < starGrade) {
			//星の座標を設定
			const a =
				((hipArray[i][1] + (hipArray[i][2] + hipArray[i][3] / 60) / 60) * 15 * Math.PI) /
				180;
			const f = hipArray[i][4] == 0 ? -1 : 1;
			const c =
				(f * (hipArray[i][5] + (hipArray[i][6] + hipArray[i][7] / 60) / 60) * Math.PI) /
				180;

			positions[j * 3] = r * Math.cos(a) * Math.cos(c);
			positions[j * 3 + 1] = r * Math.sin(a) * Math.cos(c);
			positions[j * 3 + 2] = r * Math.sin(c);

			//星のサイズを設定
			let size = (1 / hipArray[i][8]) * 20;
			if (10 < size) size = 10;
			if (hipArray[i][8] < 0) size = 10;

			sizes[j] = size * 55;
			starSizesArray.push(sizes[j]);

			//恒星色を設定
			colors[j * 3] = Math.random() * 0.1 + 0.9;
			colors[j * 3 + 1] = Math.random() * 0.1 + 0.8;
			colors[j * 3 + 2] = Math.random() * 0.1 + 0.8;

			setStarsColor(hipArray[i], j);

			j++;
		}
	}

	//恒星色を設定する関数
	function setStarsColor(array: any[], j: number) {
		for (let i = 0; i < hipColor.length; i++) {
			if (array[0] == hipColor[i][0]) {
				const bv = hipColor[i][11];
				const t = 9000 / (bv + 0.85);

				let c_x, c_y;

				if (1667 <= t && t <= 4000) {
					c_x =
						(-0.2661239 * Math.pow(10, 9)) / Math.pow(t, 3) -
						(0.234358 * Math.pow(10, 6)) / Math.pow(t, 2) +
						(0.8776956 * Math.pow(10, 3)) / t +
						0.17991;
				} else if (4000 < t && t <= 25000) {
					c_x =
						(-3.0258469 * Math.pow(10, 9)) / Math.pow(t, 3) +
						(2.1070379 * Math.pow(10, 6)) / Math.pow(t, 2) +
						(0.2226347 * Math.pow(10, 3)) / t +
						0.24039;
				}

				if (!c_x) {
					continue;
				}

				if (1667 <= t && t <= 2222) {
					c_y =
						-1.1063814 * Math.pow(c_x, 3) -
						1.3481102 * Math.pow(c_x, 2) +
						2.18555832 * c_x -
						0.20219683;
				} else if (2222 < t && t <= 4000) {
					c_y =
						-0.9549476 * Math.pow(c_x, 3) -
						1.37418593 * Math.pow(c_x, 2) +
						2.09137015 * c_x -
						0.16748867;
				} else if (4000 < t && t <= 25000) {
					c_y =
						3.081758 * Math.pow(c_x, 3) -
						5.8733867 * Math.pow(c_x, 2) +
						3.75112997 * c_x -
						0.37001483;
				}

				if (!c_y) {
					continue;
				}

				const y = 1.0;
				const x = (y / c_y) * c_x;
				const z = (y / c_y) * (1 - c_x - c_y);

				let r = 3.24097 * x - 1.537383 - 0.498611 * z;
				let g = -0.969244 * x + 1.875968 + 0.041555 * z;
				let b = 0.05563 * x - 0.203977 + 1.056972 * z;

				const n = Math.max(r, g, b);

				if (n > 1) {
					r /= n;
					g /= n;
					b /= n;
				}

				colors[j * 3] = Math.min(1, Math.max(0, r));
				colors[j * 3 + 1] = Math.min(1, Math.max(0, g));
				colors[j * 3 + 2] = Math.min(1, Math.max(0, b));
			}
		}
	}

	geometry.setAttribute("position", new Three.BufferAttribute(positions, 3));

	geometry.setAttribute("customColor", new Three.BufferAttribute(colors, 3));

	geometry.setAttribute("size", new Three.BufferAttribute(sizes, 1));

	const uniforms = {
		texture: {
			type: "t",
			value: new Three.TextureLoader().load("https://file.xtt.moe/files/space/star.png")
		}
	};

	// 创建一个材质
	const material = new Three.RawShaderMaterial({
		uniforms: uniforms,
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		transparent: true,
		blending: Three.AdditiveBlending,
		depthTest: false,
		depthWrite: false
	});

	// 创建一个网格
	points = new Three.Points(geometry, material);

	// 将网格添加到场景中
	scene.add(points);

	// 创建轨道控制器
	const controls = new OrbitControls(camera, renderer.domElement);
	// 启动阻尼
	controls.enableDamping = true;
	controls.autoRotate = true;
	controls.autoRotateSpeed = 0.1;

	// 设置相机位置
	camera.position.set(0, 0, -r / 2);
	camera.lookAt(0, 0, -r);

	let step = 0;
	function animate() {
		controls.update();
		requestAnimationFrame(animate);

		step++;

		const sizes = points.geometry.attributes.size;
		for (let i = 0; i < sizes.array.length; i++) {
			sizes.array[i] = starSizesArray[i] * (1 + Math.sin(step * 0.025 + i * 0.1) * 0.15);
		}
		sizes.needsUpdate = true;

		renderer.render(scene, camera);
	}
	animate();

	// 监听窗口变化
	window.addEventListener("resize", () => {
		// 重置相机的宽高比
		camera.aspect = window.innerWidth / window.innerHeight;
		// 更新相机的投影矩阵
		camera.updateProjectionMatrix();
		// 重置渲染器的宽高
		renderer.setSize(window.innerWidth, window.innerHeight);
	});
});
</script>

<style scoped></style>
