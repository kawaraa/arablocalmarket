"use client";
export default function VariantOptions({ name, values, onSelect, selectedOptions, label }) {
  return (
    <div dir="auto" className="flex items-center mt-3">
      {label && <h3 className="w-20">{name}</h3>}
      <span className="w-2 h-2"></span>
      <ul className="flex-1 flex items-center flex-wrap overflow-auto">
        {values.map((v, i) => (
          <li className="overflow-hidden relative flex mx-1 mb-2" key={i}>
            <input
              type="radio"
              id={v}
              className="peer absolute inset-0 opacity-0 w-full cursor-pointer"
              onChange={() => onSelect(v)}
              checked={selectedOptions.includes(v)}
            />
            <label
              htmlFor={v}
              className="text-center w-full py-[5px] px-[10px] text-sm border border-bf rounded-full dark:text-dt peer-checked:border-bc peer-checked:bg-red peer-checked:text-dt peer-disabled:opacity-60">
              {v}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
