"use client";
import Avatar from "./(styled)/avatar";

export default function NavUserList() {
  return (
    <div className="relative">
      <button
        type="button"
        className="h-8 w-8 overflow-hidden ml-4 flex rounded-full"
        id="user-menu-button"
        aria-expanded="false"
        aria-haspopup="true">
        <span className="sr-only">Open user menu</span>
        <Avatar initial="a" />
      </button>

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
        <a href="#" className="block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="user-menu-item-0">
          Your Profile
        </a>
        <a href="#" className="block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="user-menu-item-1">
          Settings
        </a>
        <a href="#" className="block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="user-menu-item-2">
          Sign out
        </a>
      </div>
    </div>
  );
}
