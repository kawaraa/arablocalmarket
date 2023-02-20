"use client";
import { useState } from "react";

export default function OptionXIcon({ onChange, open = false, cls = "", barsCls = "" }) {
  const [hover, setHover] = useState("bg-l-c dark:bg-d-c");

  const hCls = hover ? "bg-l-tc dark:bg-d-tc" : "bg-l-c dark:bg-d-c";
  const barCls = `relative w-[25px] h-[2px] my-[5px] rounded-full duration-200 ease-in-out ${hCls} ${barsCls}`;

  return (
    <button
      type="button"
      className={`group ${open && "active"} ${cls}`}
      onClick={onChange}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-controls="mobile-menu"
      aria-expanded="false"
      aria-haspopup="menu">
      <div
        className={`${barCls} group-[.active]:-rotate-45 group-[.active]:-translate-x-[0px] group-[.active]:translate-y-[7px]`}></div>
      <div className={`${barCls} group-[.active]:opacity-0`}></div>
      <div
        className={`${barCls} group-[.active]:rotate-45 group-[.active]:-translate-x-[0px] group-[.active]:translate-y-[-7px]`}></div>
      <span className="sr-only">Open main menu</span>
    </button>
  );
}
