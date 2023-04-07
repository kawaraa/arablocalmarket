"use client";
export default function VariantOptions({ name, values, onSelect, selectedOptions, label }) {
  return (
    <div className="flex items-center mt-3">
      {label && <h3 className="w-16">{name}</h3>}
      <span className="w-2 h-2"></span>
      <ul className="flex-1 flex items-center">
        {values.map((v, i) => (
          <li className="overflow-hidden relative flex mx-1" key={i}>
            <input
              type="radio"
              id={v}
              className="peer absolute inset-0 opacity-0 w-full cursor-pointer"
              onChange={() => onSelect(v)}
              checked={selectedOptions.includes(v)}
            />
            <label
              htmlFor={v}
              className="text-center w-full py-[5px] px-[10px] text-sm bg-dbg border border-bc rounded-full dark:bg-pc text-dt dark:text-t peer-checked:bg-red peer-checked:text-dt">
              {v}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
