"use client";
import Link from "next/link";
import SvgIcon from "../(styled)/svg-icon";
import Loader from "../../(layout)/loader";

export function Button({ children, type = "button", icon, loading, disabled, cls, iconCls, ...p }) {
  let c = `inline-flex justify-center items-center px-4 py-2 md:text-lg bg-pc text-t font-medium rounded-md shadow-md disabled:opacity-60 disabled:cursor-no-drop transition-all transition select-none `;
  if (!disabled && !loading) c += "hover:bg-gradient-to-tl hover:from-bg9 ";
  if (loading) c += "cursor-progress ";
  c += cls || "";

  return (
    <button type={type} disabled={disabled || loading} className={c} {...p}>
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
  let c = `overflow-hidden inline-flex items-center justify-center p-[5px] cursor-pointer disabled:hover:text-t disabled:opacity-60 disabled:cursor-no-drop transition select-none `;
  c += cls || "w-8 rounded-full hover:text-pc";
  const t = p.title || p.name;

  return (
    <button type="button" title={t} aria-label={t} className={c} {...p}>
      {children}
      {(typeof icon === "string" && <SvgIcon name={icon} />) || icon}
    </button>
  );
}

export function LinkButton({ children, icon, cls, iconCls, href, ...p }) {
  let c = `inline-flex justify-center items-center px-4 py-2 md:text-lg bg-pc bg-gradient-to-tl hover:from-bg9 text-t font-medium rounded-md shadow-md transition-all transition select-none `;

  return (
    <Link passHref legacyBehavior href={href}>
      <a className={c + (cls || "")} {...p}>
        {children}
        {icon && (
          <span className={iconCls || "w-5"}>
            {" "}
            {typeof icon === "string" ? <SvgIcon name={icon} /> : icon}
          </span>
        )}
      </a>
    </Link>
  );
}
