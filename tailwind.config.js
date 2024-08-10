/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {}
	},
	plugins: [
		function ({ addUtilities, matchUtilities, theme }) {
			const newUtilities = {
				".writing-mode-v-rl": {
					writingMode: "vertical-rl"
				},
				".mse-1": {
					"margin-block-end": theme("spacing.1")
				},
				".mse-4": {
					"margin-block-end": theme("spacing.4")
				}
			};

			addUtilities(newUtilities, ["responsive", "hover"]);

			const newMatchUtilities = {
				mse: (value) => {
					return {
						"margin-block-end": value
					};
				}
			};

			matchUtilities(newMatchUtilities, {
				values: theme("spacing")
			});
		}
	]
};
