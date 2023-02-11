"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navigation(props) {
  const [mode, setMode] = useState("auto");

  const changeThemeMode = (mode) => {
    if (mode != "dark" && mode != "light") {
      // Auto: Let the system set the mode
      localStorage.removeItem("themeMode");
      document.documentElement.className = "";
    } else {
      localStorage.setItem("themeMode", mode);
      document.documentElement.className = mode;
    }
    setMode(mode);
  };

  // console.log(props);
  useEffect(() => {
    if (
      localStorage.themeMode === "dark" ||
      (!("themeMode" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setMode(localStorage.themeMode);
    window.setLoading(false);
  }, []);

  return (
    <nav>
      <Link href="/store">Find a store</Link>
      <Link href="/store/my">My stores</Link>
      <select value={mode} onChange={(e) => changeThemeMode(e.target.value)}>
        <option value="auto">Auto</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </nav>
  );
}
