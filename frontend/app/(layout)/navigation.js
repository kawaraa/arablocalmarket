"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import OptionXIcon from "../(component)/option-x-icon";
import Dropdown from "../(component)/(styled)/dropdown";
import Avatar from "../(component)/(styled)/avatar";
import SvgIcon from "../(component)/(styled)/svg-icon";
import { AppSessionContext } from "../app-session-context";
import Cookies from "../(service)/cookies";

export default function Navigation() {
  const pathName = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  const { lang, updateLang, themeMode, updateThemeMode, user, cart } = useContext(AppSessionContext);

  const signinLink = content.navLinks[content.navLinks.length - 1];

  useEffect(() => {
    setShowMenu(false);
    if (pathName?.toLowerCase() === "/en") Cookies.set("lang", "en");
    else if (pathName?.toLowerCase() === "/ar") Cookies.set("lang", "ar");
  }, [pathName]);

  if (pathName == "/admin/pos") return "";
  return (
    <nav
      aria-label="Primary Navigation"
      className="z-7 fixed w-full flex h-14 md:h-16 px-3 md:px-8 items-center top-0 bg-bg dark:bg-dcbg ">
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

      <div
        onClick={() => setShowMenu(false)}
        onTouchStart={() => setTimeout(() => setShowMenu(false), 100)}
        className={`z-7 block fixed md:hidden inset-0 bg-blur w-0 opacity-0 transition-opacity duration-300 ${
          showMenu && "w-[100%] opacity-100"
        }`}></div>

      <ul
        className={`z-7 overflow-hidden fixed top-0 block items-center h-[100vh] w-[75%] pt-14 left-[-75%] bg-bg shadow-md dark:bg-dcbg md:static md:flex md:w-auto md:h-auto md:pt-0 md:ml-6 md:bg-[transparent] md:shadow-none transition-all duration-200 ${
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
                <option value={opt.value} key={i}>
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
                <option value={opt.value} key={i}>
                  {opt.text[lang]}
                </option>
              ))}
            </select>
          </div>
        </li>

        {content.navLinks.slice(0, 1).map((link, i) => (
          <li
            onClick={() => setShowMenu(!showMenu)}
            key={i}
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

        {user ? (
          <>
            <div className="hidden md:block block mx-4 h-6 w-px bg-[#e5e7eb]" aria-hidden="true"></div>
            <Dropdown
              event="click"
              cls="ml-2"
              icon="bell"
              iconCls="w-[28px] md:w-8"
              btnCls="!rounded-full"
              title="View notifications">
              {user.notifications.map((note, i) => (
                <li className="w-1/3 md:w-60 overflow-hidden" key={i}>
                  <Link
                    href={"/order/" + note.meta?.path}
                    className="block px-4 py-2 hover:bg-dbg hover:text-dt dark:hover:bg-pc dark:hover:text-t duration-200">
                    {content.notifications[note.type][lang]}
                  </Link>
                </li>
              ))}
            </Dropdown>
            <Dropdown
              event="click"
              btnContent={<Avatar initial="a" />}
              cls="ml-4"
              btnCls="!rounded-full shadow-md"
              title="View user menu">
              {/* <LinkButton
                    href={}
                    text={}
                    // onClick={() => setLoading(true)}
                    cls="absolute top-7 right-2 shadow-none"
                    iconCls="w-full"
                  /> */}
              {content.userLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.path}
                    className="block px-4 py-2 hover:bg-dbg hover:text-dt dark:hover:bg-pc dark:hover:text-t duration-200">
                    {link.text[lang]}
                  </Link>
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
    { text: { en: "Create store", ar: "إنشاء متجر" }, path: "/admin/new-store" },
    { text: { en: "Stores", ar: "المتاجر" }, path: "/admin/store?tab=my" },
    { text: { en: "Settings", ar: "إعدادات" }, path: "/settings" },
    { text: { en: "Logout", ar: "تسجيل خروج" }, path: "/logout" },
  ],
  notifications: {
    NEW_ORDER: { en: "You have a new order", ar: "لديك طلب جديد" },
    READY_ORDER: {
      en: "Your order with the number orderNumber is ready",
      ar: "طلبك بالرقم orderNumber جاهز",
    },
    SENT_ORDER: { en: "Your order with the number orderNumber is sent", ar: "تم إرسال طلبك رقم orderNumber" },
    DELIVERED: {
      en: "Your order with the number orderNumber is delivered",
      ar: "تم تسليم طلبك رقم orderNumber",
    },
    EXPIRATION: {
      en: "Product with the number productNumber is about to expired",
      ar: "المنتج رقم productNumber على وشك الانتهاء",
    },
    JOIN_REQUEST: {
      en: "storeOwner sent you a request to join his team",
      ar: "storeOwner ارسل لك طلب الانضمام إلى فريقه",
    },
  },
};
