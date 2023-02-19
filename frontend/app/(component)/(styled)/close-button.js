"use client";
import icons from "./icons";

export default function CloseButton({
  children,
  icon,
  size = "8",
  handler,
  disabled,
  label = "Close",
  cls = "",
}) {
  let c = `transition w-${size} h-${size} inline-flex items-center justify-center p-[5px] rounded-full disabled:opacity-75 disabled:cursor-no-drop `;
  if (!disabled) c += "hover:text-ico-c dark:hover:text-d-tc  ";
  c += cls;

  // Close And Cancel Icon
  return (
    <button
      type="button"
      onClick={handler}
      disabled={disabled}
      className={c}
      title={label}
      aria-label={label}>
      {children || (icon && icons[icon])}
    </button>
  );
}
