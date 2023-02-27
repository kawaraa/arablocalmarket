"use client";
import icons from "../(styled)/icons";
import Loader from "../../(layout)/loader";

export default function Button({
  children,
  type = "button",
  handler,
  loading,
  disabled,
  label,
  cls = "",
  icon,
  iconCls = "",
}) {
  let c = `inline-flex justify-center px-3 py-1 text-sm bg-dbg dark:bg-pc text-dt dark:text-dt rounded-md md:px-4 md:py-2 font-medium shadow-md disabled:opacity-60 disabled:cursor-no-drop transition-all `;
  if (loading) c += "cursor-progress ";
  if (!disabled) c += "border border-bc hover:border-bf hover:bg-pc hover:text-t ";
  c += cls;

  return (
    <button className={c} type={type} onClick={handler} disabled={disabled} title={label} aria-label={label}>
      {children}
      {loading ? (
        <Loader size="4" />
      ) : (
        <span className={`max-w-4 ${iconCls}`}> {(typeof icon === "string" && icons[icon]) || icon}</span>
      )}
    </button>
  );
}
