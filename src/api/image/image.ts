import axios from "axios";

const http = axios.create({
	baseURL: import.meta.env.VITE_API_URL
});

export async function uploadImage(file: FormData | string) {
	// base64
	if (typeof file === "string") {
		// 传递的 base64 不需要 data:image/png;base64, 等前缀格式说明字符串。
		return await http.post(`oss/image/upload`, { file: file });
	} else {
		return await http.post(`oss/image/upload`, file, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		});
	}
}

export async function uploadLocalImage(file: FormData | string) {
	// base64
	if (typeof file === "string") {
		// 传递的 base64 不需要 data:image/png;base64, 等前缀格式说明字符串。
		file = file.replace(/^data:[^,]+,/, "");
		return await http.post(
			`/api/image/upload/?key=${import.meta.env.VITE_API_CHEVERETO_KEY}&format=json`,
			{ source: file },
			{
				headers: {
					"Content-Type": "multipart/form-data"
				}
			}
		);
	} else {
		return await http.post(
			`/api/image/upload/?key=${import.meta.env.VITE_API_CHEVERETO_KEY}&format=json`,

			file,
			{
				headers: {
					"Content-Type": "multipart/form-data"
				}
			}
		);
	}
}
