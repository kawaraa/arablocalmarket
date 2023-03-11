"use client";

import { useEffect, useRef, useState } from "react";
import SvgIcon from "./svg-icon";
import Transition from "../../(layout)/transitions";

export default function Dropdown({ children, title, event, btnContent, icon, iconCls, cls, btnCls, ...p }) {
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
    <div ref={wrapper} {...btnProps} className={`relative inline-block ${cls}`}>
      <button
        type="button"
        className={`overflow-hidden flex w-full items-center justify-end rounded-md hover:text-lt dark:hover:text-dt fs ${btnCls}`}
        title={title || "user menu"}
        aria-label={title}
        aria-expanded={active}
        aria-haspopup="menu">
        {btnContent}
        <span className={`${iconCls}`}>{typeof icon === "string" ? <SvgIcon name={icon} /> : icon}</span>
      </button>

      <Transition
        Tag="ul"
        open={active}
        base={`absolute right-0 whitespace-nowrap overflow-hidden text-left bg-l-bg dark:bg-dcbg border border-d-c rounded shadow-lg `}
        enter={`opacity-100 scale-100 mt-${event == "click" ? "[10px]" : 0} mr-0 translate-x-0 translate-y-0`}
        exit={`border-none opacity-0 scale-90 translate-x-2 translate-y-2`}
        time="200">
        {children}
      </Transition>
    </div>
  );
}
