"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navigation(props) {
  const [themeMode, setThemeMode] = useState("auto");
  const [language, setLanguage] = useState("AR");
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
    <nav className="flex h-16 items-center bg-l-bg dark:bg-d-bg">
      <button
        type="button"
        className="flex items-center md:hidden items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        aria-controls="mobile-menu"
        aria-expanded="false">
        {/* <!-- Mobile menu button--> */}
        <span className="sr-only">Open main menu</span>
      </button>

      <div className="flex flex-shrink-0 items-center">
        <img
          className="block h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
          alt="Arab Local Market Logo"
        />
      </div>

      <ul className={"overflow-hidden flex space-x-4 h-0 md:h-auto md:ml-6" + (showMenu ? "h-auto" : "")}>
        {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}

        <NavLink text={"Find a store"} path={"/store"} />
        <NavLink text="My stores" path="/store/my" />
        <NavLink text="Who we are" path="/about" />
        <NavLink text="Contact" path="/contact" />
        <div className="hidden md:block">
          <div className="block mr-4 h-6 w-px bg-[#e5e7eb]" aria-hidden="true"></div>
        </div>
        <NavLink text="Join" path="/join" />
        <NavLink text="Login" path="/login" />
      </ul>

      <select value={themeMode} onChange={(e) => changeThemeMode(e.target.value)}>
        <option value="auto">Auto</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <select value={language} onChange={(e) => changeLanguage(e.target.value)}>
        <option value="en">EN</option>
        <option value="ar">AR</option>
      </select>

      <div className="flex-auto flex items-center justify-end px-2 md:px-6 lg:px-8">
        <button
          type="button"
          className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">View notifications</span>
          {/* <!-- Heroicon name: outline/bell --> */}
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>
        </button>

        {/* <!-- Profile dropdown --> */}
        <div className="relative ml-3">
          <div>
            <button
              type="button"
              className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Arab Local Market Logo"
              />
            </button>
          </div>

          {/* <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          --> */}

          {/* light mode only: shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none */}
          <div
            className="h-0 overflow-hidden absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 "
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
            tabIndex="-1">
            {/* <!-- Active: "/bg-gray-100", Not Active: "" --> */}
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="user-menu-item-0">
              Your Profile
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="user-menu-item-1">
              Settings
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="user-menu-item-2">
              Sign out
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ text, path }) {
  // if the path is "/" then this is useful aria-current="page"
  return (
    <li className="bg-gray-900 text-white rounded-md text-sm font-medium">
      <Link href={path} className="block px-3 py-2">
        {text}
      </Link>
    </li>
  );
}
