"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import data from "./navigation.json";
import OptionXIcon from "../(component)/option-x-icon";
import Dropdown from "../(component)/(styled)/dropdown";
import Cart from "../(component)/cart";
import Avatar from "../(component)/(styled)/avatar";
const { navLinks } = data;

const user = "null";
const lang = "en";

export default function Navigation(props) {
  const [themeMode, setThemeMode] = useState("auto");
  const [language, setLanguage] = useState("en");
  const [cls, setCls] = useState("top-0");
  const [showMenu, setShowMenu] = useState(false);
  const activeMenuCls = `left-[0]`;

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

    let previousYOffset = window.pageYOffset;
    function scrollHandler() {
      if (previousYOffset > window.pageYOffset) setCls("top-0");
      else setCls("-top-14 md:-top-16");
      previousYOffset = window.pageYOffset;
    }

    window.addEventListener("scroll", scrollHandler);
    window.setLoading(false);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <nav
      className={`z7 transition-top duration-300 ease-in-out fixed w-full flex h-14 md:h-16 px-3 md:px-8 items-center bg-l-bg dark:bg-d-c-bg text-l-c dark:text-d-c shadow-md ${cls}`}>
      <OptionXIcon mobileOnly={true} cls="z8 mr-3" open={showMenu} onChange={() => setShowMenu(!showMenu)} />

      <Link className="flex flex-shrink-0 items-center text-xl font-bold" href="/">
        {/* <img className="block h-8 w-auto" src="alm-icon.svg" alt="Arab Local Market Logo" /> */}
        <span className="text-blue">A</span>
        <span className="text-red">L</span>
        <span className="text-green">M</span>
      </Link>

      <idv
        onClick={() => setShowMenu(!showMenu)}
        className={`z7 transition duration-300 block md:hidden fixed inset-0 bg-blur w-0 opacity-0 ${
          showMenu && "w-[100%] opacity-100"
        }`}></idv>
      <ul
        className={`z7 transition-all absolute overflow-hidden overflow-x-hidden scroll block items-center h-[100vh] w-[75%] top-0 pt-14 left-[-75%] bg-l-bg shadow-md dark:bg-d-c-bg md:static md:flex md:w-auto md:h-auto md:pt-0 md:ml-6 md:bg-[transparent] md:shadow-none ${
          showMenu && activeMenuCls
        }`}>
        {navLinks.slice(0, 1).map((link, i) => (
          <li
            key={i}
            onClick={() => setShowMenu(!showMenu)}
            className="transition text-l-c hover:bg-d-c-bg hover:text-d-c dark:text-d-c dark:hover:text-d-tc md:hover:bg-[transparent] md:hover:text-l-tc text-sm font-medium">
            <Link href={link.path} className="block px-3 py-2">
              {link.text[lang]}
            </Link>
          </li>
        ))}

        {user && "user has a store" && (
          <li
            onClick={() => setShowMenu(!showMenu)}
            className="transition text-l-c hover:bg-d-c-bg hover:text-d-c dark:text-d-c dark:hover:text-d-tc md:hover:bg-[transparent] md:hover:text-l-tc text-sm font-medium">
            <Link href={navLinks[1].path} className="block px-3 py-2">
              {navLinks[1].text[lang]}
            </Link>
          </li>
        )}
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
            <Dropdown
              event="click"
              icon="bell"
              wrapperCls="mx-2"
              cls="!rounded-full"
              label="View notifications">
              <li className="">
                <a href="/settings" tabIndex="0" className="block px-4 py-2 text-sm">
                  Settings
                </a>
              </li>
              <a
                href="#"
                className="block px-4 py-2 text-sm"
                role="menuitem"
                tabIndex="-1"
                id="user-menu-item-2">
                Sign out
              </a>
            </Dropdown>
            <Dropdown
              event="click"
              btnContent={<Avatar initial="a" />}
              wrapperCls="ml-4"
              cls="!rounded-full shadow-md">
              <li className="">
                <a
                  href="/settings"
                  tabIndex="0"
                  className="block px-4 py-2 text-sm hover:bg-d-c-bg hover:text-d-c dark:hover:bg-p-c dark:hover:text-l-c">
                  Settings
                </a>
              </li>
              <li className="">
                <a href="/logout" tabIndex="0" className="block px-4 py-2 text-sm">
                  Logout
                </a>
              </li>
            </Dropdown>
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
