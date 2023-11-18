"use client";
import { useEffect, useRef, useState } from "react";
import SvgIcon from "./svg-icon";
import Transition from "../../(layout)/transition";
import { usePathname } from "next/navigation";

export default function Dropdown({ children, title, event, btnContent, icon, iconCls, cls, btnCls, ...p }) {
  const wrapper = useRef(null);
  const pathName = usePathname();
  const [active, setActive] = useState(false);
  const btnProps = {};

  if (event !== "click") {
    btnProps.onMouseEnter = () => setActive(true);
    btnProps.onMouseLeave = () => setActive(false);
  }

  useEffect(() => {
    setActive(false);
  }, [pathName]);

  useEffect(() => {
    if (event === "click") {
      const clickHandler = (e) => !wrapper.current?.contains(e.target) && setActive(false);
      window.document.addEventListener("click", clickHandler);
      return () => window.document.removeEventListener("click", clickHandler);
    }
  }, [event]);

  const mt = event == "click" ? "mt-[10px]" : "";
  return (
    <div ref={wrapper} {...btnProps} className={`relative inline-block select-none ${cls}`}>
      <button
        type="button"
        onClick={() => setActive(!active)}
        className={`overflow-hidden flex w-full items-center justify-end rounded-md hover:text-lt dark:hover:text-dt ${btnCls}`}
        title={title || "user menu"}
        aria-label={title}
        aria-expanded={active}
        aria-haspopup="menu">
        {btnContent}
        <span className={iconCls}>{typeof icon === "string" ? <SvgIcon name={icon} /> : icon}</span>
      </button>

      <Transition
        Tag="ul"
        open={active}
        // onClick={() => setActive(false)}
        base={`absolute right-0 max-h-[85vh] overflow-scroll no-srl-bar bg-bg dark:bg-dbg border border-bf rounded shadow-lg`}
        enter={`opacity-100 scale-100 ${mt} mr-0 translate-x-0 translate-y-0`}
        exit={`border-none opacity-0 scale-90 translate-x-4 translate-y-2`}
        time="200">
        {children}
      </Transition>
    </div>
  );
}
