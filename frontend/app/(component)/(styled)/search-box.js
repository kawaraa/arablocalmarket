"use client";
import SvgIcon from "./svg-icon";

export default function SearchBox({ label, onSearch, search, onFinish, cls, inCls }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Hide the keyboard.
    e.target.search.setAttribute("readonly", true);
    setTimeout(() => e.target.search.removeAttribute("readonly"), 200);
    if (onFinish) onFinish(e.target.search.value || "");
  };

  return (
    <form onSubmit={handleSubmit} className={"relative flex items-center " + cls}>
      <input
        onChange={(e) => onSearch && onSearch(e.target.value)}
        value={search}
        type="search"
        name="search"
        autoComplete="search"
        placeholder={label}
        className={`w-full p-1 pl-3 pr-8 text-md bg-[transparent] rounded-lg card cd_hr fs peer duration-200 ${
          inCls || ""
        }`}
      />

      <button className="absolute right-2 w-5 text-black cursor-pointer hover:text-red peer-hover:right-1 duration-200">
        <SvgIcon name={"search"} />
      </button>
    </form>
  );
}
