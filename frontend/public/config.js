const lightBackground = "#fff";
const darkBackground = "#0f172a"; // #0f172a - #1f2937 - #0f172a
const primeColor = "#ebf9c8"; // #ebf3d2 #f0fccc #ebf9c8 #d9ed7f #d9edc0 #6366f1 #b26cfc
tailwind.config = {
  darkMode: "class",
  theme: {
    colors: {
      "l-bg": lightBackground, // Light Background
      "l-c-bg": lightBackground, // Light Card Background
      "l-tc": darkBackground, // Light Title color
      "l-c": "#475569", // Light Color
      "l-h": "#0000001a", // Light Hover
      "l-b": "#d1d5db", // Light Border
      "d-bg": darkBackground, // Dark Background
      "d-c-bg": "#233045", // Dark Card Background // #1e293b - #212f54
      "d-tc": lightBackground, // Dark Title Color
      "d-c": "#cbd5e1", // Dark Color
      "d-h": "#0000001a", // Dark Hover
      "d-b": "#d1d5db", // Dark Border
      "ico-bg": primeColor, // Button Background
      "ico-c": darkBackground, // Button Color
      "p-c": primeColor, // Prime Color
      // blue: "#1fb6ff",
      // pink: "#ff49db",
      // orange: "#ff7849",
      // green: "#13ce66",
      // "gray-dark": "#273444",
      // gray: "#8492a6",
      // "gray-light": "#d3dce6",
    },
    fontFamily: {
      // sans: ["Graphik", "sans-serif"],
      // serif: ["Merriweather", "serif"],
      // font1: "Inter var,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
    },
  },
};

function setLoading(loading) {
  const loadingScreenWrapper = document.getElementById("loading-screen-wrapper");
  if (!loadingScreenWrapper) return;
  if (loading) loadingScreenWrapper.style.display = "flex";
  else loadingScreenWrapper.style.display = "none";
}
