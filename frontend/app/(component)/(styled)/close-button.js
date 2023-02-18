"use client";
import icons from "./icons";

export default function CloseButton({ children, icon, size = "8", handler, disabled, cls = "" }) {
  let c = `transition w-${size} h-${size} inline-flex items-center justify-center p-[5px] rounded-full disabled:opacity-75 disabled:cursor-no-drop `;
  if (!disabled) c += "hover:text-ico-c dark:hover:text-d-tc  ";
  c += cls;

  return (
    <button className={c} type="button" onClick={handler} disabled={disabled}>
      {children || (icon && icons[icon])}
    </button>
  );
}
