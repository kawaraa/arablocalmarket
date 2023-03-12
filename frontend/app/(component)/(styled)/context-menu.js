"use client";

import { useEffect, useRef, useState } from "react";
const defaultClass = "hidden h-0 w-0 border-none";

// Note: the parent should have position="relative" so this menu appears on mouse right click within the parent
export default function ContextMenu({ children }) {
  const menu = useRef(null);
  const [cls, setCls] = useState(defaultClass);

  useEffect(() => {
    const clickHandler = () => setCls(defaultClass);

    const rightClickHandler = (e) => {
      if (menu.current.contains(e.target)) return;
      e.preventDefault();

      const c = `block top-[${e.offsetY}px] right-[${
        menu.current.parentElement.offsetWidth - e.offsetX
      }px] w-auto`;

      setCls(c + " opacity-0 scale-0 -mt-10 -mr-10");

      setTimeout(() => setCls(c), 120);
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
    <ul
      ref={menu}
      role="menu"
      tabIndex="0"
      className={`z-15 absolute overflow-hidden py-1 mt-2 bg-bg dark:bg-cbg border border-bc rounded-md shadow-lg duration-300 ${cls}`}>
      {/* {cls && (
        <>
          <li tabIndex="0" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-0">
            Account settings
          </li>
          <li tabIndex="0" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-1">
            Support
          </li>
        </>
      )} */}
      {cls && children}
    </ul>
  );
}
