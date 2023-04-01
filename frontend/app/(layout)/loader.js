"use client";

export default function Loader({ size = "10", wrapperCls = "", cls = "" }) {
  let borderSize = Math.round(+size / 8);
  if (borderSize > 7) borderSize = 7;
  const c = !screen ? wrapperCls : "z-10 flex justify-center items-center fixed inset-0" + wrapperCls;
  return (
    <div className={`flex justify-center items-center ml-1 ${c}`} role="img" aria-label="loading">
      <div
        className={`w-[${size}px] h-[${size}px] border-[${borderSize}px] border-t-[transparent] border-d-c rounded-full animate-spin ${cls}`}></div>
    </div>
  );
}
