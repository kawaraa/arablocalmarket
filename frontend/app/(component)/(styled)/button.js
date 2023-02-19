"use client";
import icons from "../(styled)/icons";
import Loader from "../../(layout)/loader";

export default function Button({
  children,
  type = "button",
  icon,
  handler,
  loading,
  disabled,
  label = "",
  cls = "",
}) {
  let c = `transition inline-flex items-center justify-center bg-d-bg text-d-tc dark:bg-p-c dark:text-l-tc rounded-md px-3 md:px-4 py-1 md:py-2 text-sm font-medium shadow-md disabled:opacity-75 disabled:cursor-no-drop `;
  if (loading) c += "cursor-progress ";
  if (!disabled) c += "hover:bg-ico-bg dark:hover:bg-l-bg hover:text-ico-c ";
  c += cls;

  return (
    <button className={c} type={type} onClick={handler} disabled={disabled} title={label} aria-label={label}>
      {children}
      {loading ? (
        <Loader size="4" />
      ) : (
        <span className="max-w-4"> {(typeof icon === "string" && icons[icon]) || icon}</span>
      )}
    </button>
  );
}
