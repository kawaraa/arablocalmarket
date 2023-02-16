"use client";

import { useState } from "react";
import icons from "../(component)/(styled)/icons";
import Transition from "../(layout)/transitions";

export default function Dropdown({ children, event = "hover", btnText = "", icon = "" }) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const btnProps = {};

  if (event === "click") btnProps.onClick = () => setTooltipOpen(!tooltipOpen);
  else {
    btnProps.onMouseEnter = () => setTooltipOpen(true);
    btnProps.onMouseLeave = () => setTooltipOpen(false);
  }

  return (
    <div className="group relative inline-block">
      <button
        type="button"
        {...btnProps}
        className="inline-flex w-full justify-end rounded-md"
        aria-expanded="true"
        aria-haspopup="true">
        {btnText}
        <span className="inline-block max-w-[25px]">{icons[icon] || icon}</span>
      </button>
      <Transition
        tag="ul"
        open={tooltipOpen}
        base={`absolute right-0 whitespace-nowrap overflow-hidden transition-all ease-in-out duration-200 text-left bg-l-bg dark:bg-d-c-bg dark:text-d-c border border-d-c rounded shadow-lg `}
        enter="transform opacity-100 scale-100 mt-0 mr-0"
        exit="transform opacity-0 scale-90 mt-[-5px]  mr-[-5px]"
        time="300">
        {children}
      </Transition>
    </div>
  );
}
