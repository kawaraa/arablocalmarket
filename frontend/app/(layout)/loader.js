"use client";

export default function Loader({ size = "10", wrapperCls = "", cls = "" }) {
  let borderSize = Math.round(+size / 8);
  if (borderSize > 10) borderSize = 10;

  return (
    <div className={`flex justify-center items-center ml-1 ${wrapperCls}`} role="img" aria-label="loading">
      <div
        className={`w-[${size}px] h-[${size}px] border-[${borderSize}px] border-t-[transparent] border-d-c rounded-full animate-spin ${cls}`}></div>
    </div>
  );
}
