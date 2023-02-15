"use client";

import { useState } from "react";

export default function OptionXIcon({ onChange, mobileOnly, barsCls = "" }) {
  const [xIconClass, setXIconClass] = useState("");
  const barCls = `relative w-[30px] h-[3px] my-[5px] bg-d-bg dark:bg-d-c rounded-full transition duration-300 ease-in-out ${barsCls}`;

  const handleToggle = () => {
    if (xIconClass !== "group") {
      setXIconClass("group");
      onChange(true);
    } else {
      setXIconClass("");
      onChange(false);
    }
  };

  return (
    <button
      type="button"
      className={`${xIconClass + (mobileOnly && " md:hidden")} transition duration-300 ease-in-out`}
      onClick={handleToggle}
      aria-controls="mobile-menu"
      aria-expanded="false">
      <div
        className={`${barCls} group-[.group]:-rotate-45 group-[.group]:-translate-x-[1px] group-[.group]:translate-y-[9px]`}></div>
      <div className={`${barCls} group-[.group]:opacity-0`}></div>
      <div
        className={`${barCls} group-[.group]:rotate-45 group-[.group]:-translate-x-[1px] group-[.group]:translate-y-[-7px]`}></div>
      <span className="sr-only">Open main menu</span>
    </button>
  );
}
