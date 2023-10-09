"use client";

import { useEffect, useRef, useState } from "react";
const defaultClass = "hidden h-0 w-0 border-none";

// Note: the parent should have position="relative" so this menu appears on mouse right click within the parent
export default function ContextMenu({ children }) {
  const menu = useRef(null);
  const [cls, setCls] = useState(defaultClass);

  useEffect(() => {
    const menu = menu.current;
    const clickHandler = () => setCls(defaultClass);

    const rightClickHandler = (e) => {
      if (menu.contains(e.target)) return;
      e.preventDefault();

      const c = `block top-[${e.offsetY}px] right-[${menu.parentElement.offsetWidth - e.offsetX}px] w-auto`;

      setCls(c + " opacity-0 scale-0 -mt-10 -mr-10");

      setTimeout(() => setCls(c), 120);
    };

    // Todo: contextmenu event is not supported in IOS, need to implement one using touchstart, touched and pointer event
    // menu.parentElement.addEventListener("touchstart", clickHandler);
    menu.parentElement.addEventListener("click", clickHandler);
    menu.parentElement.addEventListener("contextmenu", rightClickHandler);
    return () => {
      menu.parentElement.removeEventListener("click", clickHandler);
      menu.parentElement.removeEventListener("contextmenu", rightClickHandler);
    };
  }, []);

  return (
    <ul
      ref={menu}
      role="menu"
      tabIndex="0"
      className={`z-15 absolute overflow-hidden py-1 mt-2 bg-bg dark:bg-cbg border border-bc rounded-md shadow-lg select-none duration-300 ${cls}`}>
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
