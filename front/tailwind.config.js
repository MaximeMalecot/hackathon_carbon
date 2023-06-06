/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {},
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#282B2A",

                    secondary: "#E53F49",

                    accent: "#5B98D2",

                    neutral: "#FDFDFD",

                    "base-100": "#FDFDFD",

                    info: "#5B98D2",

                    success: "#00BB7E",

                    warning: "#5B98D2",

                    error: "#E53F49",
                },
            },
        ],
    },
    plugins: [require("daisyui")],
};
