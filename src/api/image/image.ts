import axios from "axios";

const http = axios.create({
	baseURL: import.meta.env.VITE_API_IMAGE_URL
});

export async function uploadImage(file: FormData) {
	return await http.post(
		`/api/image/upload/?key=${import.meta.env.VITE_API_IMAGE_KEY}&format=json`,

		file,
		{
			headers: {
				"Content-Type": "multipart/form-data"
			}
		}
	);
}
