// Error bg: #fde3c2, Color: red
tailwind.config = {
  darkMode: "class",
  theme: {
    colors: {
      hpbg: "radial-gradient(#b8f5d9, #ffffff)",
      pc: "#9bface", // Primary Color // #cbf7f2
      pc1: "#ebf9c8", // Primary Color
      pc2: "#d7e8fb", // Primary Color
      pc3: "#fcdcdc", // Primary Color
      pc4: "#fde3c2", // Primary Color
      bg: "#ffffff", // Background & Dark Title Color
      cbg: "#ffffff1a", // Card Background
      t: "#666666", // Light Color
      bc: "#0000001a", // Border Color & Hover effect
      bf: "#9aa0a6", // Border focus color

      lbg: "#f9fafb", // Light Background
      lt: "#4b5563", // Light Title color

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
      // sans: ["Graphik", "sans-serif"],
      // serif: ["Merriweather", "serif"],
      // font1: "Inter var,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
    },
  },
};

function setLoading(loading) {
  const elements = document.body?.children;

  if (loading) {
    // elements[0].style.opacity = "0";
    elements[1].style.display = "flex";
  } else {
    // elements[0].style.opacity = "1";
    elements[1].style.display = "none";
  }
}
