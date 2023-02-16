// #0f172a  #233045 #212f54
const lightBackground = "#fff";
const darkBackground = "#121212";
const primeColor = "#ebf9c8"; // #ebf3d2 #f0fccc #ebf9c8 #d9ed7f #d9edc0 #6366f1 #b26cfc
tailwind.config = {
  darkMode: "class",
  theme: {
    colors: {
      "l-bg": lightBackground, // Light Background
      "l-c-bg": lightBackground, // Light Card Background
      "l-tc": darkBackground, // Light Title color
      "l-c": "#4b5563", // Light Color #65758a #4b5563 #475569
      "l-h": "#0000001a", // Light Hover
      "l-b": "#d1d5db", // Light Border
      "d-bg": darkBackground, // Dark Background
      "d-c-bg": "#1f2937", // Dark Card Background
      "d-tc": lightBackground, // Dark Title Color
      "d-c": "#8d9bad", // Dark Color #cbd5e1
      "d-h": "#0000001a", // Dark Hover
      "d-b": "#d1d5db", // Dark Border
      "ico-bg": primeColor, // Button Background
      "ico-c": darkBackground, // Button Color
      "p-c": primeColor, // Prime Color
      "lk-c": "#1fb6ff",
      blue: "#1fb6ff",
      red: "#ff4995", // #ff49db
      orange: "#ff7849",
      green: "#13ce66",
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
