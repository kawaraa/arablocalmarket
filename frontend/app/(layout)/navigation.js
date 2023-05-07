"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import OptionXIcon from "../(component)/option-x-icon";
import Dropdown from "../(component)/(styled)/dropdown";
import Avatar from "../(component)/(styled)/avatar";
import SvgIcon from "../(component)/(styled)/svg-icon";
import { AppSessionContext } from "../app-session-context";
import EmptyState from "../(component)/(styled)/empty-state";
import Image from "next/image";

export default function Navigation() {
  const pathName = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  const { lang, updateLang, themeMode, updateThemeMode, user, cartItemsNum } = useContext(AppSessionContext);
  const signinLink = content.navLinks[content.navLinks.length - 1];
  const initials = !user?.firstName ? null : user.firstName[0] + user.lastName[0];

  useEffect(() => {
    setShowMenu(false);
    if (pathName?.toLowerCase() === "/en") updateLang("en");
    else if (pathName?.toLowerCase() === "/ar") updateLang("ar");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);

  if (pathName == "/admin/pos") return "";
  return (
    <nav
      aria-label="Primary Navigation"
      className="z-7 fixed w-full flex h-14 md:h-16 px-3 md:px-8 items-center top-0 bg-bg dark:bg-dcbg ">
      <OptionXIcon open={showMenu} onChange={() => setShowMenu(!showMenu)} cls="z-8 mr-3 md:hidden" />

      <Link
        passHref
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
            <Image
              src={`/img/${lang}.png`}
              alt={content.langAlt[lang]}
              width="30"
              height="30"
              className="w-full w-7"
            />

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
            className="font-medium duration-200 hover:bg-dcbg hover:text-dt dark:hover:bg-cbg md:hover:bg-[transparent] md:hover:text-lt text-sm">
            <Link passHref href={link.path} className="block p-3 text-lg">
              {link.text[lang]}
            </Link>
          </li>
        ))}

        {user?.id && "user has a store" && (
          <li
            onClick={() => setShowMenu(!showMenu)}
            className="duration-200 hover:bg-dbg hover:text-dt dark:hover:text-dbg md:hover:bg-[transparent] md:hover:text-lt text-sm font-medium">
            <Link passHref href={content.navLinks[1].path} className="block p-3 text-lg">
              {content.navLinks[1].text[lang]}
            </Link>
          </li>
        )}
      </ul>

      <div className="flex items-center justify-end flex-auto">
        <Link passHref href="/cart" className="relative flex mr-2">
          <span className="w-6 md:w-7 hover:text-lt dark:hover:text-bg duration-200">
            <SvgIcon name="cart" />
          </span>
          <span id="nav-cart" className="text-sm font-medium text-red -mt-1">
            {cartItemsNum}
          </span>
        </Link>

        {!user?.id ? (
          <Link
            passHref
            href={signinLink.path}
            className="text-center px-3 py-1 text-sm rounded-md md:px-4 md:py-2 bg-pc text-t bg-gradient-to-tl hover:from-pc2">
            {signinLink.text[lang]}
          </Link>
        ) : (
          <>
            <div className="hidden md:block block mx-4 h-6 w-px bg-[#e5e7eb]" aria-hidden="true"></div>
            <Dropdown
              event="click"
              cls="ml-2 "
              icon="bell"
              iconCls="w-[28px] md:w-8"
              btnCls="!rounded-full"
              title="View notifications">
              {user.notifications.map((note, i) => (
                // border-lbg border-b-[1px] last:border-none
                <li className="overflow-hidden even:bg-[#f8fafc]" key={i}>
                  <Link
                    passHref
                    href={"/order/" + note.meta?.path}
                    className="block w-60 md:w-72 break-all px-4 py-2 hover:bg-dbg hover:text-dt dark:hover:bg-pc dark:hover:text-t duration-200">
                    {content.notifications[note.type][lang]}
                  </Link>
                </li>
              ))}
              {!user.notifications[0] && (
                <li className="w-44">
                  <EmptyState lang={lang} type="notification" />
                </li>
              )}
            </Dropdown>
            <Dropdown
              event="click"
              btnContent={<Avatar initial={initials} />}
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
                <li className="" key={i}>
                  <Link
                    passHref
                    href={link.path}
                    className="block min-w-[200px] text-center whitespace-nowrap px-4 py-3 hover:bg-dbg hover:text-dt dark:hover:bg-pc dark:hover:text-t duration-200">
                    {link.text[lang]}
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
    { text: { en: "Orders", ar: "الطلبات" }, path: "/order" },
    { text: { en: "Sign in", ar: "تسجيل الدخول" }, path: "/signin" },
  ],
  userLinks: [
    { text: { en: "Create store", ar: "إنشاء متجر" }, path: "/admin/new-store" },
    { text: { en: "My stores", ar: "متاجري" }, path: "/admin/store?tab=my" },
    { text: { en: "Settings", ar: "إعدادات" }, path: "/settings" },
    { text: { en: "Sign out", ar: "تسجيل خروج" }, path: "/signout" },
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
  langAlt: { en: "Change Language", ar: "تغيير اللغة" },
};
