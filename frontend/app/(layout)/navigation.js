"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks } from "./navigation.json";
import OptionXIcon from "../(component)/option-x-icon";
import NavUserList from "../(component)/nav-user-list";
import Cart from "../(component)/cart";
import NavNotificationList from "../(component)/nav-notification-list";

const user = "null";
const lang = "en";

export default function Navigation(props) {
  const [themeMode, setThemeMode] = useState("auto");
  const [language, setLanguage] = useState("en");
  const [showMenu, setShowMenu] = useState(false);

  const changeThemeMode = (mode) => {
    if (mode === "auto") {
      localStorage.removeItem("themeMode");
      document.documentElement.className = "";
    } else {
      localStorage.setItem("themeMode", mode);
      document.documentElement.className = mode;
    }

    setThemeMode(mode);
  };

  const changeLanguage = (lang) => {
    localStorage.setItem("lang", lang);
    document.documentElement.setAttribute("lang", lang);
    setLanguage(lang);
  };

  useEffect(() => {
    const dark = !("themeMode" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (localStorage.themeMode === "dark" || dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    setThemeMode(localStorage.themeMode);
    setLanguage(localStorage.lang || "en");
    window.setLoading(false);
  }, []);

  return (
    <nav className="flex h-14 md:h-16 px-3 md:px-8 items-center bg-l-bg dark:bg-d-c-bg text-l-c dark:text-d-c shadow-md">
      <OptionXIcon mobileOnly={true} cls="mr-3" onChange={(active) => console.log("Menu active: ", active)} />

      <Link className="flex flex-shrink-0 items-center text-xl font-bold" href="/">
        {/* <img className="block h-8 w-auto" src="alm-icon.svg" alt="Arab Local Market Logo" /> */}
        <span className="text-blue">A</span>
        <span className="text-red">L</span>
        <span className="text-green">M</span>
      </Link>

      <ul className={"overflow-hidden flex items-center h-0 md:h-auto md:ml-6" + (showMenu ? "h-auto" : "")}>
        {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
        {navLinks.slice(0, 2).map((link, i) => (
          <li
            key={i}
            className="transition text-l-c dark:text-d-c hover:text-l-tc dark:hover:text-d-tc text-sm font-medium">
            <Link href={link.path} className="block px-3 py-2">
              {link.text[lang]}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-end flex-auto">
        <select
          value={themeMode}
          onChange={(e) => changeThemeMode(e.target.value)}
          style={{ background: "none" }}
          className="rounded-md text-sm cursor-pointer text-l-c dark:text-d-c hover:text-l-tc dark:hover:text-d-tc">
          <option value="auto">Auto</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>

        <select
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
          style={{ background: "none" }}
          className="mx-4 rounded-md text-sm cursor-pointer text-l-c dark:text-d-c hover:text-l-tc dark:hover:text-d-tc">
          <option value="en">EN</option>
          <option value="ar">AR</option>
        </select>

        <Cart numberOfItems="10" cls="mr=2" />

        <div className="hidden md:block block mx-4 h-6 w-px bg-[#e5e7eb]" aria-hidden="true"></div>

        {user ? (
          <>
            <NavNotificationList />
            <NavUserList />
          </>
        ) : (
          navLinks.slice(2).map((link, i) => (
            <Link
              key={i}
              href={link.path}
              className={`transition block px-3 py-2 text-l-c dark:text-d-c hover:text-l-tc dark:hover:text-d-tc text-sm font-medium ${
                link.cls || ""
              }`}>
              {link.text[lang]}
            </Link>
          ))
        )}
      </div>
    </nav>
  );
}
