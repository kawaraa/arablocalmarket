"use client";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AppSessionContext } from "../app-session-context";
import OptionXIcon from "../(component)/option-x-icon";
import Dropdown from "../(component)/(styled)/dropdown";
import Avatar from "../(component)/(styled)/avatar";
import SvgIcon from "../(component)/(styled)/svg-icon";
import Image from "next/image";
import Notification from "./notification";

export default function Navigation() {
  const pathName = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  const { lang, updateLang, themeMode, updateThemeMode, cart, user } = useContext(AppSessionContext);
  const signinLink = content.navLinks[content.navLinks.length - 1];
  const initials = !user?.firstName ? null : user.firstName[0] + user.lastName[0];

  useEffect(() => {
    setShowMenu(false);
  }, [pathName]);

  if (pathName == "/admin/pos") return "";
  return (
    <nav
      aria-label="Primary Navigation"
      className="z-7 fixed w-full flex h-14 md:h-16 px-3 md:px-8 items-center top-0 bg-bg dark:bg-dcbg select-none">
      <OptionXIcon open={showMenu} onChange={() => setShowMenu(!showMenu)} cls="z-8 mr-3 md:hidden" />

      <Link passHref legacyBehavior href="/">
        <a
          title="Arab Local Market Slogan (ALM)"
          className="flex flex-shrink-0 items-center text-md uppercase font-bold">
          {/* <img className="block h-8 w-auto" src="alm-icon.svg" alt="Arab Local Market Logo" /> */}
          {/* <span className="text-blue">A</span>
        <span className="text-red">L</span>
      <span className="text-green">M</span> */}
          A L M
        </a>
      </Link>

      <div
        onClick={() => setShowMenu(false)}
        onTouchStart={() => setTimeout(() => setShowMenu(false), 100)}
        className={`z-7 block fixed md:hidden inset-0 bg-blur w-0 opacity-0 transition-opacity duration-300 ${
          showMenu && "w-[100%] opacity-100"
        }`}></div>

      <ul
        id="mobile-menu"
        className={`z-7 overflow-hidden fixed top-0 block items-center h-[100vh] w-[75%] pt-14 left-[-75%] bg-bg shadow-md dark:bg-dcbg md:static md:flex md:w-auto md:h-auto md:pt-0 md:ml-6 md:bg-[transparent] md:shadow-none transition-all duration-200 ${
          showMenu && "left-[0]"
        }`}>
        <li className="absolute top-4 right-14 hover:text-lt dark:text-pc dark:hover:text-dt duration-200 md:static md:ml-3">
          <div className="relative overflow-hidden w-8 rounded-full">
            <label htmlFor="lang-select" className="w-full h-full">
              <Image
                src={`/img/${lang}.png`}
                alt={content.langAlt[lang]}
                width="30"
                height="30"
                priority
                className="w-full"
              />
            </label>
            <select
              value={lang}
              onChange={(e) => updateLang(e.target.value)}
              style={{ background: "none", color: "transparent" }}
              name="langSelect"
              id="lang-select"
              className="absolute inset-0 w-full appearance-none border-none rounded-full cursor-pointer">
              {content.languageOptions.map((opt, i) => (
                <option value={opt.value} key={i}>
                  {opt.text[lang]}
                </option>
              ))}
            </select>
          </div>
        </li>
        <li className="absolute top-3 right-3 hover:text-lt dark:text-pc dark:hover:text-dt duration-200 md:static md:mx-3">
          <div className="relative overflow-hidden w-7 h-7 rounded-full">
            <label htmlFor="theme-select" className="w-full h-full">
              <SvgIcon name={content.themeModeIconsMap[themeMode]} />
            </label>
            <select
              value={themeMode}
              onChange={(e) => updateThemeMode(e.target.value)}
              style={{ background: "none", color: "transparent" }}
              name="themeSelect"
              id="theme-select"
              className="absolute inset-0 w-full appearance-none border-none rounded-full cursor-pointer">
              {content.themeOptions.map((opt, i) => (
                <option value={opt.value} key={i}>
                  {opt.text[lang]}
                </option>
              ))}
            </select>
          </div>
        </li>

        {content.navLinks.slice(0, content.navLinks.length - 1).map((link, i) => (
          <li
            onClick={() => setShowMenu(!showMenu)}
            key={i}
            className="font-medium hover:bg-dbg hover:text-dt md:hover:bg-[transparent] md:hover:!text-bg9 text-sm duration-200">
            <Link passHref legacyBehavior href={link.path.replace("lang", lang)}>
              <a className="block p-3 text-lg md:underline underline-offset-8">{link.text[lang]}</a>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-end flex-auto">
        <Link passHref legacyBehavior href="/cart">
          <a className="relative flex mr-2" title={content.cart[lang]}>
            <span className="w-8 md:w-7 hover:text-lt dark:hover:text-bg duration-200">
              <SvgIcon name="cart" />
            </span>
            <span id="nav-cart" className="text-sm font-medium text-red -mt-1">
              {cart.reduce((t, s) => t + s.items.length, 0)}
            </span>
          </a>
        </Link>

        {!user?.id ? (
          <Link passHref legacyBehavior href={signinLink.path}>
            <a className="text-center ml-3 px-3 py-1 text-sm rounded-md md:px-4 md:py-2 bg-pc text-t bg-gradient-to-tl hover:from-pc2">
              {signinLink.text[lang]}
            </a>
          </Link>
        ) : (
          <>
            <div className="hidden md:block block mx-4 h-6 w-px bg-[#e5e7eb]" aria-hidden="true"></div>
            <Notification />
            <Dropdown
              event="click"
              btnContent={<Avatar initial={initials} />}
              cls="ml-4"
              btnCls="!rounded-full shadow-md"
              title="View user menu">
              {content.userLinks.map((link, i) => (
                <li className="text-lg" key={i}>
                  <Link passHref legacyBehavior href={link.path.replace("lang", lang)}>
                    <a className="block min-w-[200px] text-center whitespace-nowrap px-4 py-3 hover:bg-dbg hover:text-dt dark:hover:bg-pc dark:hover:text-t duration-200">
                      {link.text[lang]}
                    </a>
                  </Link>
                </li>
              ))}
            </Dropdown>
          </>
        )}
      </div>
    </nav>
  );
}
// languageOptions, themeOptions
const content = {
  languageOptions: [
    { text: { en: "EN", ar: "الإنجليزية" }, value: "en" },
    { text: { en: "AR", ar: "العربية" }, value: "ar" },
  ],
  langAlt: { en: "Change Language", ar: "تغيير اللغة" },
  themeOptions: [
    { text: { en: "Auto", ar: "افتراضي" }, value: "auto" },
    { text: { en: "Light", ar: "فاتح" }, value: "light" },
    { text: { en: "Dark", ar: "داكن" }, value: "dark" },
  ],
  themeModeIconsMap: { auto: "circleHalf", dark: "brightness", light: "moon" },
  cart: { en: "Shopping cart and Favorite items", ar: "عربة التسوق والعناصر المفضلة" },
  navLinks: [
    { text: { en: "Find a store", ar: "ابحث عن متجر" }, path: "/store" },
    { text: { en: "How to instal", ar: "كيفية التثبيت" }, path: "/lang/how-to-install" },
    { text: { en: "Sign in", ar: "تسجيل الدخول" }, path: "/signin" },
  ],
  userLinks: [
    { text: { en: "Orders", ar: "الطلبات" }, path: "/order" },
    { text: { en: "My stores", ar: "متاجري" }, path: "/admin/store?tab=my" },
    { text: { en: "clients", ar: "العملاء" }, path: "/admin/client" },
    { text: { en: "Settings", ar: "إعدادات" }, path: "/settings" },
    { text: { en: "Help", ar: "المساعدة" }, path: "/lang/help" },
    { text: { en: "Sign out", ar: "تسجيل خروج" }, path: "/signout" },
  ],
};
