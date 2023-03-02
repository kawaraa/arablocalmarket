"use client";
import SvgIcon from "../(styled)/svg-icon";
import Loader from "../../(layout)/loader";

export default function Button({ text, icon, type = "button", handler, loading, disabled, cls, iconCls }) {
  let c = `inline-flex justify-center px-3 py-1 text-sm bg-dbg dark:bg-pc text-dt dark:text-t rounded-md md:px-4 md:py-2 font-medium shadow-md disabled:opacity-60 disabled:cursor-no-drop transition-all duration-200`;
  if (!disabled) c += "border border-bc hover:border-bf hover:bg-pc dark:hover:bg-lbg hover:text-t ";
  if (loading) c += "cursor-progress ";
  c += cls;

  return (
    <button type={type} onClick={handler} disabled={disabled} className={c}>
      {text}
      {loading ? (
        <Loader size="4" />
      ) : (
        <span className={`max-w-4 ${iconCls}`}>
          {" "}
          {(typeof icon === "string" && <SvgIcon name={icon} />) || icon}
        </span>
      )}
    </button>
  );
}
