"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import OptionXIcon from "../(component)/option-x-icon";
import Dropdown from "../(component)/(styled)/dropdown";
import Avatar from "../(component)/(styled)/avatar";
import SvgIcon from "../(component)/(styled)/svg-icon";
import { AppSessionContext } from "../app-session-context";

export default function Navigation() {
  const pathName = usePathname();
  const [cls, setCls] = useState("top-0");
  const [showMenu, setShowMenu] = useState(false);

  const { lang, updateLang, themeMode, updateThemeMode, user, cart, notifications } =
    useContext(AppSessionContext);
  const signinLink = content.navLinks[content.navLinks.length - 1];

  useEffect(() => {
    setShowMenu(false);
  }, [pathName]);

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
      className={`z-7 fixed w-full flex h-14 md:h-16 px-3 md:px-8 items-center transition-top duration-300 ease-in-out ${cls}`}>
      <OptionXIcon open={showMenu} onChange={() => setShowMenu(!showMenu)} cls="z-8 mr-3 md:hidden" />

      <Link
        className="flex flex-shrink-0 items-center text-md uppercase font-bold"
        href="/"
        title="Arab Local Market Slogan (ALM)">
        {/* <img className="block h-8 w-auto" src="alm-icon.svg" alt="Arab Local Market Logo" /> */}
        {/* <span className="text-blue">A</span>
        <span className="text-red">L</span>
        <span className="text-green">M</span> */}
        A L M
      </Link>

      <idv
        onClick={() => setShowMenu(false)}
        onTouchStart={() => setTimeout(() => setShowMenu(false), 100)}
        className={`z-7 block fixed md:hidden inset-0 bg-blur w-0 opacity-0 transition-opacity duration-300 ${
          showMenu && "w-[100%] opacity-100"
        }`}></idv>

      <ul
        className={`z-7 fixed overflow-hidden overflow-x-hidden scroll block items-center h-[100vh] w-[75%] top-0 pt-14 left-[-75%] bg-bg shadow-md dark:bg-dcbg md:static md:flex md:w-auto md:h-auto md:pt-0 md:ml-6 md:bg-[transparent] md:shadow-none transition-all duration-200 ${
          showMenu && "left-[0]"
        }`}>
        <li className="absolute top-3 right-14 hover:text-lt dark:text-pc dark:hover:text-dt duration-200 md:static md:ml-1">
          <div className="relative w-7 rounded-md">
            <img src={`/${lang}.png`} className="w-full" />

            <select
              value={lang}
              onChange={(e) => updateLang(e.target.value)}
              style={{ background: "none", color: "transparent" }}
              className="absolute inset-0 w-full cursor-pointer">
              {content.themeOptions.map((opt, i) => (
                <option key={i} value={opt.value}>
                  {opt.text[lang]}
                </option>
              ))}
            </select>
          </div>
        </li>
        <li className="absolute top-3 right-3 hover:text-lt dark:text-pc dark:hover:text-dt duration-200 md:static md:ml-1">
          <div className="relative w-7 ">
            <SvgIcon name={content.themeModeIconsMap[themeMode]} />
            <select
              value={themeMode}
              onChange={(e) => updateThemeMode(e.target.value)}
              style={{ background: "none", color: "transparent" }}
              className="absolute inset-0 w-full cursor-pointer">
              {content.languageOptions.map((opt, i) => (
                <option key={i} value={opt.value}>
                  {opt.text[lang]}
                </option>
              ))}
            </select>
          </div>
        </li>

        {content.navLinks.slice(0, 1).map((link, i) => (
          <li
            key={i}
            onClick={() => setShowMenu(!showMenu)}
            className="duration-200 hover:bg-dcbg hover:text-dt dark:hover:bg-cbg md:hover:bg-[transparent] md:hover:text-lt text-sm font-medium">
            <Link href={link.path} className="block px-3 py-2">
              {link.text[lang]}
            </Link>
          </li>
        ))}

        {user && "user has a store" && (
          <li
            onClick={() => setShowMenu(!showMenu)}
            className="duration-200 hover:bg-dbg hover:text-dt dark:hover:text-dbg md:hover:bg-[transparent] md:hover:text-lt text-sm font-medium">
            <Link href={content.navLinks[1].path} className="block px-3 py-2">
              {content.navLinks[1].text[lang]}
            </Link>
          </li>
        )}
      </ul>

      <div className="flex items-center justify-end flex-auto">
        <Link href="/cart" className="relative flex mr-2">
          <span className="w-6 md:w-7 hover:text-lt dark:hover:text-bg duration-200">
            <SvgIcon name="cart" />
          </span>
          <span className="text-sm font-medium text-red -mt-1">{cart.items.length || 10}</span>
        </Link>

        {!user ? (
          <>
            <div className="hidden md:block block mx-4 h-6 w-px bg-[#e5e7eb]" aria-hidden="true"></div>
            <Dropdown
              event="click"
              icon="bell"
              iconCls="w-[28px] md:w-8"
              wrapperCls="ml-2"
              cls="!rounded-full"
              label="View notifications">
              {notifications.map((note, i) => (
                <li key={i}>
                  <a
                    className="block px-4 py-2 text-sm hover:bg-dbg hover:text-dt dark:hover:bg-pc dark:hover:text-t duration-200"
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
              {content.userLinks.map((link, i) => (
                <li key={i}>
                  <a
                    className="block px-4 py-2 text-sm hover:bg-dbg hover:text-dt dark:hover:bg-pc dark:hover:text-t duration-200"
                    href={link.path}>
                    {link.text[lang]}
                  </a>
                </li>
              ))}
            </Dropdown>
          </>
        ) : (
          <Link
            href={signinLink.path}
            className="text-center px-3 py-1 text-sm rounded-md md:px-4 md:py-2 bg-pc text-t bg-gradient-to-tl hover:from-pc2">
            {signinLink.text[lang]}
          </Link>
        )}
      </div>
    </nav>
  );
}

const content = {
  themeModeIconsMap: { auto: "circleHalf", dark: "brightness", light: "moon" },
  languageOptions: [
    { text: { en: "Auto", ar: "افتراضي" }, value: "auto" },
    { text: { en: "Light", ar: "فاتح" }, value: "light" },
    { text: { en: "Dark", ar: "داكن" }, value: "dark" },
  ],
  themeOptions: [
    { text: { en: "EN", ar: "الإنجليزية" }, value: "en" },
    { text: { en: "AR", ar: "العربية" }, value: "ar" },
  ],
  navLinks: [
    { text: { en: "Find a store", ar: "ابحث عن متجر" }, path: "/store" },
    { text: { en: "My stores", ar: "متاجري" }, path: "/store/my" },
    { text: { en: "Sign in", ar: "تسجيل الدخول" }, path: "/signin" },
  ],
  userLinks: [
    { text: { en: "Settings", ar: "إعدادات" }, path: "/settings" },
    { text: { en: "Logout", ar: "تسجيل خروج" }, path: "/logout" },
  ],
};
