"use client";
import { useRef } from "react";
import SvgIcon from "./svg-icon";

export default function SearchBox({ label, onSearch, search, onBlur, onFinish, cls, inCls }) {
  const inputRef = useRef();
  const valueAttr = onSearch ? { value: search } : { defaultValue: search };

  const handleFinish = (e) => {
    e.preventDefault();
    inputRef.current?.setAttribute("readonly", true); // This will hide the keyboard.
    setTimeout(() => inputRef.current?.removeAttribute("readonly"), 200);
    if (onFinish) onFinish(inputRef.current?.value.toLowerCase().trim());
  };

  const handleEnterKey = (e) => {
    if (e.code.toLowerCase() == "enter" || e.keyCode == 13) handleFinish(e);
  };

  return (
    <div className={"relative flex items-center " + cls}>
      <input
        ref={inputRef}
        type="search"
        name="search"
        onChange={(e) => onSearch && onSearch(e.target.value.toLowerCase() || "")}
        onBlur={onBlur && handleFinish}
        onKeyUp={handleEnterKey}
        onKeyDown={handleEnterKey}
        {...valueAttr}
        autoComplete="search"
        placeholder={label}
        className={`w-full p-1 pl-3 pr-8 text-md bg-[transparent] leading-9 rounded-lg card cd_hr fs peer duration-150 ${
          inCls || ""
        }`}
      />

      <button
        type="button"
        onClick={handleFinish}
        className="absolute right-2 w-5 text-black cursor-pointer hover:text-red peer-hover:right-1 duration-150">
        <SvgIcon name={"search"} />
      </button>
    </div>
  );
}
