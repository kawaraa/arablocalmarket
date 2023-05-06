"use client";
import Link from "next/link";
import SvgIcon from "../(styled)/svg-icon";
import Loader from "../../(layout)/loader";

export function Button({ children, type = "button", icon, loading, disabled, cls, iconCls, ...p }) {
  let c = `inline-flex justify-center items-center px-3 py-1 text-sm md:text-lg bg-pc text-t font-medium rounded-md shadow-md md:px-4 md:py-2 disabled:opacity-60 disabled:cursor-no-drop transition-all transition `;
  if (!disabled) c += "hover:bg-gradient-to-tl hover:from-pc2 ";
  if (loading) c += "cursor-progress ";
  c += cls || "";

  return (
    <button type={type} disabled={disabled} className={c} {...p}>
      {children}
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

export function IconButton({ children, icon, cls, ...p }) {
  let c = `overflow-hidden inline-flex items-center justify-center p-[5px] cursor-pointer disabled:hover:text-t disabled:opacity-60 disabled:cursor-no-drop transition `;
  c += cls || "w-8 rounded-full hover:text-pc";
  const t = p.title || p.name;

  return (
    <button type="button" title={t} aria-label={t} className={c} {...p}>
      {children}
      {(typeof icon === "string" && <SvgIcon name={icon} />) || icon}
    </button>
  );
}

export function LinkButton({ children, icon, cls, iconCls, ...p }) {
  let c = `inline-flex justify-center items-center px-3 py-1 text-sm md:text-lg bg-pc bg-gradient-to-tl hover:from-pc2 text-t font-medium rounded-md shadow-md md:px-4 md:py-2 transition-all transition `;

  return (
    <Link className={c + (cls || "")} {...p}>
      {children}
      {icon && (
        <span className={iconCls || "w-5"}> {typeof icon === "string" ? <SvgIcon name={icon} /> : icon}</span>
      )}
    </Link>
  );
}
