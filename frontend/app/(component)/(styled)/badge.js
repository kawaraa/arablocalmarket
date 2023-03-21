"use client";
import SvgIcon from "./svg-icon";

export default function Badge({ text, color, icon, cls }) {
  let c = (colors[color - 1] ? `bg-${colors[color - 1]} ` : `bg-[${color}] `) + cls;
  if (color == 8) c += " !text-bg";

  return (
    <span
      className={`inline-flex justify-center items-center py-[1px] px-2 text-t rounded-full print:text-3xl print:text-t print:font-bold ${c}`}>
      {icon && (
        <span className="h-4 mx-1">
          <SvgIcon name={icon} />
        </span>
      )}
      {text}
    </span>
  );
}

const colors = ["bg1", "bg2", "bg3", "bg4", "bg5", "bg6", "bg7", "bg8"];
