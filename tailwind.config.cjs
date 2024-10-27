/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {}
	},
	plugins: [
		function ({ addUtilities, matchUtilities, theme, addVariant, e }) {
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
				},
				mss: (value) => {
					return {
						"margin-block-start": value
					};
				}
			};

			matchUtilities(newMatchUtilities, {
				values: theme("spacing")
			});

			// 自定义一个升级CSS选择器优先级的变体
			addVariant("up", ({ modifySelectors, separator }) => {
				modifySelectors(({ className }) => {
					return `.${e(`up${separator}${className}`)}:is(&, #notUsedSelector)`;
				});
			});
		}
	]
};
