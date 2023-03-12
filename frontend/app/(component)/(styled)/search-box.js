"use client";
import SvgIcon from "./svg-icon";

export default function SearchBox({ label, onSearch, search, onShowFilter, onFinish, cls }) {
  const id = label.replace(/\s/gim, "_");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hide the keyboard.
    e.target.search.setAttribute("readonly", true);
    setTimeout(() => e.target.search.removeAttribute("readonly"), 200);
    if (onFinish) onFinish();
  };

  return (
    <form onSubmit={handleSubmit} className={"relative w-full mt-3 mb-5 flex justify-end " + cls}>
      {onShowFilter && (
        <button
          type="button"
          onClick={() => onShowFilter(true)}
          className="w-8 p-1 hover:text-pc transition"
          title="Show search filter"
          aria-label="Search filter"
          aria-expanded="true"
          aria-haspopup="dialog">
          <SvgIcon name="filter" />
        </button>
      )}

      <input
        onChange={(e) => onSearch(e.target.value)}
        value={search}
        type="search"
        name="search"
        autoComplete="search"
        placeholder={label}
        className="flex-auto p-1 pl-3 pr-8 text-md bg-[transparent] rounded-lg card cd_hr fs peer duration-200"
        id={id}
        tabIndex="0"
      />

      <label
        onClick={onFinish}
        htmlFor={id}
        className="absolute top-1.5 right-2 w-5 text-black cursor-pointer hover:text-red peer-hover:right-1 duration-200">
        <SvgIcon name="search" />
      </label>
    </form>
  );
}
