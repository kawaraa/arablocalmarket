"use client";
import Link from "next/link";
import SvgIcon from "../(styled)/svg-icon";
import Loader from "../../(layout)/loader";

export function Button({ text, type = "button", icon, handler, loading, disabled, cls, iconCls, ...p }) {
  let c = `inline-flex justify-center items-center px-3 py-1 text-sm md:text-lg bg-pc text-t font-medium rounded-md shadow-md md:px-4 md:py-2 disabled:opacity-60 disabled:cursor-no-drop transition-all duration-200 `;
  if (!disabled) c += "hover:bg-gradient-to-tl hover:from-pc2 ";
  if (loading) c += "cursor-progress ";
  c += cls || "";

  return (
    <button type={type} onClick={handler} disabled={disabled} className={c} {...p}>
      {text}
      {loading ? (
        <Loader size="18" />
      ) : (
        icon && (
          <span className={iconCls || "w-5"}>
            {" "}
            {typeof icon === "string" ? <SvgIcon name={icon} /> : icon}
          </span>
        )
      )}
    </button>
  );
}

export function IconButton({ icon, size = "8", handler, disabled, label, cls }) {
  let c = `w-${size} h-${size} inline-flex items-center justify-center p-[5px] rounded-full disabled:hover:text-t disabled:opacity-60 disabled:cursor-no-drop duration-200 `;
  c += cls || "hover:text-pc";

  return (
    <button
      type="button"
      onClick={handler}
      disabled={disabled}
      title={label}
      aria-label={label}
      className={c}>
      {(typeof icon === "string" && <SvgIcon name={icon} />) || icon}
    </button>
  );
}

export function LinkButton({ link, text, icon, cls, iconCls, ...p }) {
  let c = `inline-flex justify-center items-center px-3 py-1 text-sm md:text-lg bg-pc bg-gradient-to-tl hover:from-pc2 text-t font-medium rounded-md shadow-md md:px-4 md:py-2 transition-all duration-150 `;

  return (
    <Link href={link} className={c + (cls || "")} {...p}>
      {text}
      {icon && (
        <span className={iconCls || "w-5"}> {typeof icon === "string" ? <SvgIcon name={icon} /> : icon}</span>
      )}
    </Link>
  );
}
