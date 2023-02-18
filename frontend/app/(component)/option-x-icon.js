"use client";

export default function OptionXIcon({ onChange, open = false, mobileOnly, cls = "", barsCls = "" }) {
  const barCls = `relative w-[25px] h-[2px] my-[5px] bg-l-c dark:bg-d-c group-hover:bg-l-tc dark:group-hover:bg-d-tc rounded-full transition duration-300 ease-in-out ${barsCls}`;
  const xIconClass = !open ? "" : "active";

  return (
    <button
      type="button"
      className={`${
        xIconClass + (mobileOnly && " md:hidden")
      } group transition duration-300 ease-in-out ${cls}`}
      onClick={onChange}
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
