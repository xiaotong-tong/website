import axios from "axios";

const http = axios.create({
	baseURL: import.meta.env.VITE_API_IMAGE_URL
});

async function uploadImage(file) {
	return await http.post(
		`/api/1/upload/?key=${import.meta.env.VITE_API_IMAGE_KEY}&format=json`,

		file,
		{
			headers: {
				"Content-Type": "multipart/form-data"
			}
		}
	);
}

export { uploadImage };
