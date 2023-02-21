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

  useEffect(() => {
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
    <div
      className={`z7 transition-top duration-300 ease-in-out fixed w-full flex h-14 md:h-16 px-3 md:px-8 items-center ${cls}`}>
      {/* Search box */}
      <form className="relative w-full flex justify-end">
        <label htmlFor="store-search" className="absolute top-1 right-1 w-6 text-black ">
          {icons.search}
        </label>
        <input
          type="text"
          id="store-search"
          placeholder="Search for a store"
          className="flex-auto p-1 pl-3 pr-8 text-md bg-[transparent] rounded-lg focus:outline-none focus:shadow-lg"
          tabIndex="0"
        />
      </form>

      {/* Location icon */}
      {/* <Link href="/cart" className="relative flex md:mr-2">
        <span className="transition w-6 md:w-7 text-l-c dark:text-d-c hover:text-l-tc dark:hover:text-d-tc">
          {icons.location}
        </span>
        <span className="text-sm font-medium text-red -mt-1">{cart.items.length || 0}</span>
      </Link> */}
    </div>
  );
}
