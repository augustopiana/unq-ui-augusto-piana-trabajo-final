/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				customPink: "#B7887D",
				customGreen: "#203C2E",
				customLightGreen: "#ADB87D"
			},
		},
	},
	plugins: [],
};
