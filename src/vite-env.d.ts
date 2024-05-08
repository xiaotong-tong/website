/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
	env: {
		VITE_API_URL: string;
		VITE_API_IMAGE_URL: string;
		VITE_API_IMAGE_KEY: string;
	};
}
