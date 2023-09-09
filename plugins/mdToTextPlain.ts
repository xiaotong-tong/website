// vite 插件，将 md 格式的文件转为 string

export default function mdPlugin() {
	return {
		name: "transform-md-file",
		transform(src, id) {
			if (/\.md$/.test(id)) {
				return {
					code: `export default ${JSON.stringify(src)}`
				};
			}
		}
	};
}
