/** @type {import('tailwindcss').Config} */
// Error bg: #fde3c2, Color: red
// Font: Verdana,sans-serif

module.exports = {
  content: [
    // "./**/*.{html,js}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // testbg: "linear-gradient(to bottom right, #9bface, #b26cfc)",
        // hpbg: "radial-gradient(#b8f5d9, #ffffff)",
        pc: "#9bface", // Primary Color // #cbf7f2 // #b2ebf9
        pc2: "#aea1ea",
        bg: "#ffffff", // Background & Dark Title Color
        lbg: "#e5e7eb", // Light Background #f9fafb
        dbg: "#121212", // Dark Background
        cbg: "#ffffff1a", // Card Background
        dcbg: "#272727", // Dark card Background #263546
        lt: "#6b7280", // Light Title color
        dt: "#dcd9d9", // Dark Text Color
        t: "#414141", // Light Text Color
        bc: "#0000001a", // Border Color & Hover effect
        bf: "#9aa0a6", // Border focus color
        link: "#b485e6",

        bg1: "#fde3c2",
        bg2: "#f7c8f7",
        bg3: "#ff9898",
        bg4: "#ffc2ac",
        bg5: "#d7e8fb",
        bg6: "#b8f5d9",
        bg7: "#fcdcdc",
        bg8: "#A9A9A9",
        bg9: "#ac9ffc",

        // "ico-bg": "#9bface", // Icon & Button Background
        // "ico-c": "#121212", // Icon & Button Color

        red: "#ff6446",
        green: "#14d263",
        blue: "#4696ff",
        orange: "#ffa500",
        blur: "#00000066",
      },
      fontFamily: {
        arabic: ["Noto Kufi Arabic", "sans-serif"],
        monospace: "monospace",
      },
      zIndex: {
        auto: "auto",
        0: "0",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
      },
      backgroundImage: {
        "gradient-to-tl": "linear-gradient(to top left, var(--tw-gradient-stops) 80%)",
        "gradient-to-br": "linear-gradient(to bottom right, var(--tw-gradient-stops) 80%)",
        "gradient-from-c": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
    future: {
      hoverOnlyWhenSupported: true,
    },
  },
  plugins: [],
};
