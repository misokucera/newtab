/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            boxShadow: {
                focus: "0 2px 0 0 rgba(252, 211, 77, 1)",
            },
            fontFamily: {
                sans: ["var(--font-inter)"],
            },
        },
    },
    plugins: [],
    darkMode: "class",
};
