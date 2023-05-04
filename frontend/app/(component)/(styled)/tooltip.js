"use client";
import { useState } from "react";
import Transition from "../../(layout)/transitions";
import SvgIcon from "./svg-icon";

export default function Tooltip({ children, description = "", size, position }) {
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
    <div
      className="relative inline-flex"
      onClick={() => setTooltipOpen(!tooltipOpen)}
      onMouseEnter={() => setTooltipOpen(true)}
      onMouseLeave={() => setTooltipOpen(false)}>
      <button
        type="button"
        // title={description}
        role="tooltip"
        aria-label={"Tooltip. " + description}
        className="inline-block w-4 h-4 mx-1 cursor-help">
        <SvgIcon name="exclamationMark" />
      </button>

      <Transition
        Tag="span"
        open={tooltipOpen}
        base={`z-2 block absolute rounded-md transition bg-bg dark:bg-dbg border border-bc shadow-lg 
          ${positionOuterClasses(position)} 
          ${sizeClasses(size)}`}
        enter={`opacity-100 ${positionInnerClasses(position)}`}
        exit="m-0 opacity-0 translate-y-0"
        time="100">
        {description || children}
      </Transition>
    </div>
  );
}
