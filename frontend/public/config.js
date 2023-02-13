tailwind.config = {
  darkMode: "class",
  theme: {
    colors: {
      "l-bg": "#fff",
      "l-c-bg": "red",
      "l-tc": "#0f172a",
      "l-c": "#475569",
      "l-h": "#0000001a",
      "l-b": "#d1d5db",
      "d-bg": "#0f172a", // #0f172a - #1f2937 - #0f172a
      "d-c-bg": "#233045", // #1e293b - #212f54
      "d-tc": "#fff",
      "d-c": "#cbd5e1",
      "d-h": "#0000001a",
      "d-b": "#d1d5db",
      "p-c": "#f0fccc", // #ebf3d2
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
