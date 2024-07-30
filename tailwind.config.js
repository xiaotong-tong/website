/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {}
	},
	plugins: [
		function ({ addUtilities }) {
			const newUtilities = {
				".writing-mode-v-rl": {
					writingMode: "vertical-rl"
				}
			};

			addUtilities(newUtilities, ["responsive", "hover"]);
		}
	]
};
