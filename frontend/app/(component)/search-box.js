"use client";
import icons from "./(styled)/icons";

export default function SearchBox({ label, onSearch, search, onShowFilter, onFinish }) {
  const id = label.replace(/\s/gim, "_");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onFinish) onFinish();
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full mt-3 mb-5 flex justify-end">
      {onShowFilter && (
        <button
          type="button"
          onClick={() => onShowFilter(true)}
          className="w-8 p-1 text-t hover:text-lt transition"
          title="Show search filter"
          aria-label="Search filter"
          aria-expanded="true"
          aria-haspopup="dialog">
          {icons.filter}
        </button>
      )}

      <input
        onChange={(e) => onSearch(e.target.value)}
        value={search}
        type="text"
        name="search"
        autoComplete="search"
        placeholder={label}
        className="flex-auto p-1 pl-3 pr-8 text-md bg-[transparent] rounded-lg focus:outline-none border border-bc hover:border-bf focus:shadow-lg"
        id={id}
        tabIndex="0"
      />

      <label
        onClick={onFinish}
        htmlFor={id}
        className="absolute top-1.5 right-2 w-5 text-black cursor-pointer hover:text-red">
        {icons.search}
      </label>
    </form>
  );
}
