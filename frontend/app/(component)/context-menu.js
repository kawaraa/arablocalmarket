"use client";

import { useEffect, useRef, useState } from "react";
const defaultClass = "hidden w-0";

export default function ContextMenu({ children }) {
  const menu = useRef(null);
  const [cls, setCls] = useState(defaultClass);

  useEffect(() => {
    const clickHandler = () => setCls(defaultClass);

    const rightClickHandler = (e) => {
      if (menu.current.contains(e.target)) return;
      e.preventDefault();

      setCls(
        `block top-[${e.offsetY}px] right-[${menu.current.parentElement.offsetWidth - e.offsetX}px] w-auto`
      );
    };

    // Todo: contextmenu event is not supported in IOS, need to implement one using touchstart, touched and pointer event
    // menu.current.parentElement.addEventListener("touchstart", clickHandler);
    menu.current.parentElement.addEventListener("click", clickHandler);
    menu.current.parentElement.addEventListener("contextmenu", rightClickHandler);
    return () => {
      menu.current.parentElement.removeEventListener("click", clickHandler);
      menu.current.parentElement.removeEventListener("contextmenu", rightClickHandler);
    };
  }, []);

  return (
    // absolute mt-2 scale-75

    <ol
      ref={menu}
      role="menu"
      tabIndex="0"
      className={`z-15 absolute overflow-hidden transition duration-500 py-1 mt-2 rounded-md bg-l-bg dark:bg-d-c-bg shadow-lg ring-1 ring-l-c ring-opacity-20 ${cls}`}>
      {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
      <li tabIndex="0" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-0">
        Account settings
      </li>
      <li tabIndex="0" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-1">
        Support
      </li>
      {children}
    </ol>
  );
}
