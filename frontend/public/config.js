// Error bg: #fde3c2, Color: red
tailwind.config = {
  darkMode: "class",
  theme: {
    colors: {
      // testbg: "linear-gradient(to bottom right, #9bface, #b26cfc)",
      // hpbg: "radial-gradient(#b8f5d9, #ffffff)",
      pc: "#9bface", // Primary Color // #cbf7f2 // #b2ebf9
      pc2: "#b26cfc", // #aea1ea
      bg: "#ffffff", // Background & Dark Title Color
      cbg: "#ffffff1a", // Card Background
      t: "#666666", // Light Color
      bc: "#0000001a", // Border Color & Hover effect
      bf: "#9aa0a6", // Border focus color

      bg1: "#fde3c2",
      bg2: "#f7c8f7",
      bg3: "#ff9898",
      bg4: "#ffc2ac",
      bg5: "#d7e8fb",
      bg6: "#b8f5d9",
      bg7: "#fcdcdc",
      bg8: "#A9A9A9",

      lbg: "#e5e7eb", //f9fafb Light Background
      lt: "#6b7280", // Light Title color

      dbg: "#121212", // Dark Background
      dcbg: "#272727", // Dark card Background
      dt: "#ffffffbf", // Dark Color

      // "ico-bg": "#9bface", // Icon & Button Background
      // "ico-c": "#121212", // Icon & Button Color

      red: "#ff6446",
      green: "#14d263",
      blue: "#4696ff",
      orange: "#ffa500",
      violet: "#b26cfc",
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
      "gradient-to-tl": "linear-gradient(to top left, var(--tw-gradient-stops) 65%)",
      "gradient-from-c": "radial-gradient(var(--tw-gradient-stops))",
    },
  },
};

function setLoading(loading) {
  const loader = document.getElementById("global-screen-loader");
  if (loading) loader.style.display = "flex"; // elements[0].style.opacity = "0";
  else loader.style.display = "none"; // elements[0].style.opacity = "1";
}
