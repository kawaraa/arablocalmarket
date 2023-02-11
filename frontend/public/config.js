tailwind.config = {
  darkMode: "class",
  theme: { extend: {} },
};

function setLoading(loading) {
  const loadingScreenWrapper = document.getElementById("loading-screen-wrapper");
  if (!loadingScreenWrapper) return;
  if (loading) loadingScreenWrapper.style.display = "flex";
  else loadingScreenWrapper.style.display = "none";
}
