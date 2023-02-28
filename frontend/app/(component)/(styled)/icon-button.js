"use client";
import icons from "./icons";

export default function IconButton({ icon, size = "8", handler, disabled, label, cls }) {
  let c = `transition w-${size} h-${size} inline-flex items-center justify-center p-[5px] rounded-full disabled:opacity-60 disabled:cursor-no-drop `;
  if (!disabled) c += "hover:text-red ";
  c += cls;

  // Close And Cancel Icon
  return (
    <button
      type="button"
      onClick={handler}
      disabled={disabled}
      title={label}
      aria-label={label}
      className={c}>
      {(typeof icon === "string" && icons[icon]) || icon}
    </button>
  );
}
