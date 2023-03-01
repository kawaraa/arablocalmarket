"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import data from "./navigation.json";
import OptionXIcon from "../(component)/option-x-icon";
import Dropdown from "../(component)/(styled)/dropdown";
import Avatar from "../(component)/(styled)/avatar";
import icons from "../(component)/(styled)/icons";
import { AppSessionContext } from "../app-session-context";
const { languageOptions, themeOptions, navLinks, userLinks, dir, themeModeIconsMap } = data;

export default function Navigation() {
  const [cls, setCls] = useState("top-0");
  const [showMenu, setShowMenu] = useState(false);

  const { lang, updateLang, themeMode, updateThemeMode, user, cart, notifications } =
    useContext(AppSessionContext);
  const loginLink = navLinks[navLinks.length - 1];

  useEffect(() => {
    let previousYOffset = window.pageYOffset;

    function scrollHandler() {
      if (previousYOffset > window.pageYOffset) setCls("top-0 bg-bg dark:bg-dcbg shadow-md");
      else setCls("-top-14 md:-top-16");

      previousYOffset = window.pageYOffset;
    }

    window.addEventListener("scroll", scrollHandler);
    window.setLoading(false);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <nav
      className={`z7 fixed w-full flex h-14 md:h-16 px-3 md:px-8 items-center text-t dark:text-dt transition-top duration-300 ease-in-out ${cls}`}>
      <OptionXIcon open={showMenu} onChange={() => setShowMenu(!showMenu)} cls="z8 mr-3 md:hidden" />

      <Link
        className="flex flex-shrink-0 items-center text-md uppercase text-t font-bold"
        href="/"
        title="Arab Local Market Slogan (ALM)">
        {/* <img className="block h-8 w-auto" src="alm-icon.svg" alt="Arab Local Market Logo" /> */}
        {/* <span className="text-blue">A</span>
        <span className="text-red">L</span>
        <span className="text-green">M</span> */}
        A L M
      </Link>

      <idv
        onClick={() => setShowMenu(!showMenu)}
        className={`z7 block fixed md:hidden inset-0 bg-blur w-0 opacity-0 transition duration-300 ${
          showMenu && "w-[100%] opacity-100"
        }`}></idv>

      <ul
        className={`z7 absolute overflow-hidden overflow-x-hidden scroll block items-center h-[100vh] w-[75%] top-0 pt-14 left-[-75%] bg-bg shadow-md dark:bg-dcbg md:static md:flex md:w-auto md:h-auto md:pt-0 md:ml-6 md:bg-[transparent] md:shadow-none transition-all ${
          showMenu && "left-[0]"
        }`}>
        <li className="absolute top-3 right-14 text-t hover:text-lt dark:text-pc dark:hover:text-dt transition md:static md:ml-1">
          <div className="relative w-7 rounded-md">
            <img src={`${lang}.png`} className="w-full" />

            <select
              value={lang}
              onChange={(e) => updateLang(e.target.value)}
              style={{ background: "none", color: "transparent" }}
              className="absolute inset-0 w-full cursor-pointer">
              {themeOptions.map((opt, i) => (
                <option key={i} value={opt.value}>
                  {opt.text[lang]}
                </option>
              ))}
            </select>
          </div>
        </li>
        <li className="absolute top-3 right-3 text-t hover:text-lt dark:text-pc dark:hover:text-dt transition md:static md:ml-1">
          <div className="relative w-7 ">
            {icons[themeModeIconsMap[themeMode]]}
            <select
              value={themeMode}
              onChange={(e) => updateThemeMode(e.target.value)}
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
            className="transition text-t hover:bg-dcbg hover:text-dt dark:text-dt dark:hover:bg-cbg md:hover:bg-[transparent] md:hover:text-lt text-sm font-medium">
            <Link href={link.path} className="block px-3 py-2">
              {link.text[lang]}
            </Link>
          </li>
        ))}

        {user && "user has a store" && (
          <li
            onClick={() => setShowMenu(!showMenu)}
            className="transition text-l-c hover:bg-dbg hover:text-dt dark:text-dt dark:hover:text-dbg md:hover:bg-[transparent] md:hover:text-lt text-sm font-medium">
            <Link href={navLinks[1].path} className="block px-3 py-2">
              {navLinks[1].text[lang]}
            </Link>
          </li>
        )}
      </ul>

      <div className="flex items-center justify-end flex-auto">
        {/* <Link href="/cart" className="relative flex md:mr-2">
          <span className="transition w-6 md:w-7 text-l-c dark:text-d-c hover:text-l-tc dark:hover:text-d-tc">
            {icons.location}
          </span>
          <span className="text-sm font-medium text-red -mt-1">{cart.items.length || 0}</span>
        </Link> */}

        <Link href="/cart" className="relative flex mr-2">
          <span className="transition w-6 md:w-7 text-t dark:text-dt hover:text-lt dark:hover:text-dbg">
            {icons.cart}
          </span>
          <span className="text-sm font-medium text-red -mt-1">{cart.items.length || 10}</span>
        </Link>

        {user ? (
          <>
            <div className="hidden md:block block mx-4 h-6 w-px bg-[#e5e7eb]" aria-hidden="true"></div>
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
                    className="transition block px-4 py-2 text-sm hover:bg-dbg hover:text-dt dark:hover:bg-pc dark:hover:text-t"
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
                    className="block px-4 py-2 text-sm hover:bg-dbg hover:text-dt dark:hover:bg-pc dark:hover:text-t transition"
                    href={link.path}>
                    {link.text[lang]}
                  </a>
                </li>
              ))}
            </Dropdown>
          </>
        ) : (
          <Link
            href={loginLink.path}
            className="inline-flex justify-center px-3 py-1 text-sm bg-dbg dark:bg-pc text-dt dark:text-t rounded-md md:px-4 md:py-2 font-medium shadow-md border border-bc hover:border-bf hover:bg-pc dark:hover:bg-lbg hover:text-t transition">
            {loginLink.text[lang]}
          </Link>
        )}
      </div>
    </nav>
  );
}
