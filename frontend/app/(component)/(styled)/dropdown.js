"use client";

import { useEffect, useRef, useState } from "react";
import icons from "./icons";
import Transition from "../../(layout)/transitions";

export default function Dropdown({
  children,
  event = "hover",
  btnContent = "",
  icon = "",
  iconSize = "25",
  wrapperCls = "",
  cls = "",
}) {
  const wrapper = useRef(null);
  const [active, setActive] = useState(false);
  const btnProps = {};

  if (event !== "click") {
    btnProps.onMouseEnter = () => setActive(true);
    btnProps.onMouseLeave = () => setActive(false);
  }

  useEffect(() => {
    const clickHandler = (e) => {
      if (wrapper.current?.contains(e.target)) setActive(!active);
      else setActive(false);
    };

    if (event === "click") window.document.addEventListener("click", clickHandler);

    return () => window.document.removeEventListener("click", clickHandler);
  }, []);

  return (
    <div ref={wrapper} {...btnProps} className={`relative inline-block text-l-c dark:text-d-c ${wrapperCls}`}>
      <button
        type="button"
        className={`overflow-hidden flex w-full items-center justify-end rounded-md text-l-c dark:text-d-c hover:text-l-tc dark:hover:text-d-tc ${cls}`}
        aria-expanded={active}
        aria-haspopup="menu"
        aria-label="Open user menu">
        {btnContent}
        <span className={`max-w-[${iconSize}px]`}>
          {typeof icon === "string" ? icons[icon] || icon : icon}
        </span>
      </button>

      <Transition
        tag="ul"
        open={active}
        base={`absolute right-0 whitespace-nowrap overflow-hidden text-left bg-l-bg dark:bg-d-c-bg dark:text-d-c border border-d-c rounded shadow-lg `}
        enter={`opacity-100 scale-100 mt-${event == "click" ? "[10px]" : 0} mr-0 translate-x-0 translate-y-0`}
        exit={`border-none opacity-0 scale-90 translate-x-2 translate-y-2`}
        time="200">
        {children}
      </Transition>
    </div>
  );
}
