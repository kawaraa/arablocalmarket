tailwind.config = {
  darkMode: "class",
  theme: {
    // screens: {
    //   sm: "480px",
    //   md: "768px",
    //   lg: "976px",
    //   xl: "1440px",
    // },
    colors: {
      "l-bg": "#fff",
      "l-t": "#475569",
      "l-h": "#0f172a",
      "d-bg": "#0f172a", // 31, 41, 55: #1f2937
      "d-c": "#1e293b",
      "d-t": "#cbd5e1",
      "d-h": "#fff",
      blue: "#1fb6ff",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    // extend: {
    //   spacing: {
    //     128: "32rem",
    //     144: "36rem",
    //   },
    //   borderRadius: {
    //     "4xl": "2rem",
    //   },
    // },
  },
};

function setLoading(loading) {
  const loadingScreenWrapper = document.getElementById("loading-screen-wrapper");
  if (!loadingScreenWrapper) return;
  if (loading) loadingScreenWrapper.style.display = "flex";
  else loadingScreenWrapper.style.display = "none";
}
