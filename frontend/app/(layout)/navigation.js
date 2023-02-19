"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import data from "./navigation.json";
import OptionXIcon from "../(component)/option-x-icon";
import Dropdown from "../(component)/(styled)/dropdown";
import Avatar from "../(component)/(styled)/avatar";
import icons from "../(component)/(styled)/icons";
const { languageOptions, themeOptions, navLinks, userLinks, dir, themeModeIconsMap } = data;

// localStorage.cart.items.
const cart = { items: [] };
const user = "null";
const notifications = [{ title: { en: "", ar: "" }, description: { en: "", ar: "" }, path: "1" }];

export default function Navigation(props) {
  const [themeMode, setThemeMode] = useState("auto");
  const [lang, setLang] = useState("en");
  const [cls, setCls] = useState("top-0");
  const [showMenu, setShowMenu] = useState(false);
  // const lang = window.localStorage.lang || "en";
  const activeMenuCls = `left-[0]`;

  const changeThemeMode = (mode) => {
    document.documentElement.classList.remove("dark", "light", "auto");

    if (mode === "auto") {
      localStorage.removeItem("themeMode");
      document.documentElement.classList.add("auto");
    } else {
      localStorage.setItem("themeMode", mode);
      document.documentElement.classList.add(mode);
    }
    setThemeMode(mode);
  };

  const changeLanguage = (lang) => {
    localStorage.setItem("lang", lang);
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.classList.remove("en", "ar");
    document.documentElement.classList.add(lang);

    setLang(lang);
  };

  useEffect(() => {
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (localStorage.themeMode === "dark" || dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    document.documentElement.classList.add(localStorage.lang || "en");

    if (localStorage.themeMode) setThemeMode(localStorage.themeMode);
    if (localStorage.lang) setLang(localStorage.lang);

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
        <li className="text-right">
          <div className="relative w-6 md:w-8 ml-0.5 mr-2 md:mx-4 rounded-md">
            {icons[themeModeIconsMap[themeMode]]}
            <select
              value={themeMode}
              onChange={(e) => changeThemeMode(e.target.value)}
              style={{ background: "none", color: "transparent" }}
              className="absolute inset-0 w-full cursor-pointer">
              {languageOptions.map((opt, i) => (
                <option key={i} value={opt.value}>
                  {opt.text[lang]}
                </option>
              ))}
            </select>
          </div>
        </li>
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
        <div className="relative w-6 md:w-8 ml-0.5 mr-2 md:mx-4 rounded-md">
          <img src={`${lang}.png`} className="w-full" />
          <select
            value={lang}
            onChange={(e) => changeLanguage(e.target.value)}
            style={{ background: "none", color: "transparent" }}
            className="absolute inset-0 w-full cursor-pointer">
            {themeOptions.map((opt, i) => (
              <option key={i} value={opt.value}>
                {opt.text[lang]}
              </option>
            ))}
          </select>
        </div>

        <Link href="/cart" className="relative flex md:mr-2">
          <span className="transition w-6 md:w-7 text-l-c dark:text-d-c hover:text-l-tc dark:hover:text-d-tc">
            {icons.cart}
          </span>
          <span className="text-sm font-medium text-red -mt-1">{cart.items.length || 0}</span>
        </Link>

        <div className="hidden md:block block mx-4 h-6 w-px bg-[#e5e7eb]" aria-hidden="true"></div>

        {user ? (
          <>
            <Dropdown
              event="click"
              icon="bell"
              iconCls="w-6 md:w-8"
              wrapperCls="ml-2"
              cls="!rounded-full"
              label="View notifications">
              {notifications.map((note, i) => (
                <li key={i} className={dir}>
                  <a
                    className="transition block px-4 py-2 text-sm hover:bg-d-c-bg hover:text-d-c dark:hover:bg-p-c dark:hover:text-l-c"
                    href={"/order/" + note.path}>
                    {note.description[lang]}
                  </a>
                </li>
              ))}
            </Dropdown>
            <Dropdown
              event="click"
              btnContent={<Avatar initial="a" />}
              wrapperCls="ml-4"
              cls="!rounded-full shadow-md"
              label="View user menu">
              {userLinks.map((link, i) => (
                <li key={i} className={dir}>
                  <a
                    className="transition block px-4 py-2 text-sm hover:bg-d-c-bg hover:text-d-c dark:hover:bg-p-c dark:hover:text-l-c"
                    href={link.path}>
                    {link.text[lang]}
                  </a>
                </li>
              ))}
            </Dropdown>
          </>
        ) : (
          navLinks.slice(2).map((link, i) => (
            <Link
              key={i}
              href={link.path}
              className={`transition block px-3 py-2 text-l-c dark:text-d-c hover:text-l-tc dark:hover:text-d-tc text-sm font-medium ${dir} ${
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
