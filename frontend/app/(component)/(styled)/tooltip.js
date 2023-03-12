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

  // Plain HTML tooltip: <a href="#"  title="Hooray!, this text will show up" role="tooltip">Hover over me</a>
  return (
    <a
      className="relative inline-flex"
      href="#"
      title={description}
      role="tooltip"
      aria-label={"Tooltip. " + description}
      aria-haspopup="true"
      aria-expanded={tooltipOpen}
      onClick={(e) => e.preventDefault() + setTooltipOpen(!tooltipOpen)}
      onMouseEnter={() => setTooltipOpen(true)}
      onMouseLeave={() => setTooltipOpen(false)}>
      <span className="block w-4 h-4 cursor-help">
        <SvgIcon name={exclamationMark} />{" "}
      </span>

      <Transition
        Tag="span"
        open={tooltipOpen}
        base={`block absolute overflow-hidden rounded-md transition bg-l-bg dark:bg-d-c-bg border border-d-c shadow-lg 
          ${positionOuterClasses(position)} 
          ${sizeClasses(size)}`}
        enter={`opacity-100 ${positionInnerClasses(position)}`}
        exit="m-0 opacity-0 translate-y-0"
        time="100">
        {description || children}
      </Transition>
    </a>
  );
}
