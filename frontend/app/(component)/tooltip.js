"use client";
import { useState } from "react";
import Transition from "./transitions";
import icons from "./icons";

export default function Tooltip({ children, size, position }) {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const positionOuterClasses = (position) => {
    switch (position) {
      case "right":
        return "left-full top-1/2 -translate-y-1/2";
      case "left":
        return "right-full top-1/2 -translate-y-1/2";
      case "bottom":
        return "top-full left-1/2 -translate-x-1/2";
      default:
        return "bottom-full left-1/2 -translate-x-1/2";
    }
  };

  const sizeClasses = (size) => {
    switch (size) {
      case "lg":
        return "min-w-82 p-3";
      case "md":
        return "min-w-56 p-3";
      case "sm":
        return "min-w-44 p-2";
      default:
        return "p-2";
    }
  };

  const positionInnerClasses = (position) => {
    switch (position) {
      case "right":
        return "ml-2";
      case "left":
        return "mr-2";
      case "bottom":
        return "mt-2";
      default:
        return "mb-2";
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onMouseEnter={() => setTooltipOpen(true)}
        onMouseLeave={() => setTooltipOpen(false)}
        className="block w-4 h-4 text-l-tc dark:text-d-tc cursor-help"
        aria-haspopup="true"
        aria-expanded={tooltipOpen}>
        {icons.exclamationMark}
      </button>
      <div className={`z-10 absolute ${positionOuterClasses(position)}`}>
        <Transition
          tag="div"
          open={tooltipOpen}
          base={`rounded overflow-hidden transition ease-out duration-200 bg-l-bg dark:bg-d-c-bg dark:text-d-c border border-[#e2e8f0] shadow-lg ${sizeClasses(
            size
          )} ${positionInnerClasses(position)}`}
          enter=" transform opacity-100 -translate-y-2"
          exit="opacity-0 translate-y-0">
          {children}
        </Transition>
      </div>
    </div>
  );
}
