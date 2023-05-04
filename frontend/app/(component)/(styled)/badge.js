"use client";
import SvgIcon from "./svg-icon";

export default function Badge({ text, color, icon, cls, ...p }) {
  let c = (colors[color - 1] || "") + " " + cls;
  if (color == 8) c += " !text-bg";

  return (
    <span
      className={`inline-flex justify-center items-center py-[1px] px-2 text-t rounded-full print:text-3xl print:text-t print:font-bold ${c}`}>
      {icon && (
        <span className="h-4 mx-1">
          <SvgIcon name={icon} />
        </span>
      )}
      {text || p.children}
    </span>
  );
}

const colors = ["bg-bg1", "bg-bg2", "bg-bg3", "bg-bg4", "bg-bg5", "bg-bg6", "bg-bg7", "bg-bg8"];
