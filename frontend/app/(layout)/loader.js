"use client";
export default function Loader({ size = "10", screen, wrapperCls = "", cls = "" }) {
  let borderSize = Math.round(+size / 8);
  if (borderSize > 7) borderSize = 7;
  const c = !screen ? wrapperCls : "z-10 flex justify-center items-center fixed inset-0 " + wrapperCls;
  return (
    <div className={`flex justify-center items-center ml-1 ${c}`} role="img" aria-label="loading">
      <div
        className={`border-t-[transparent] border-bf rounded-full animate-spin ${cls}`}
        style={{ width: `${size}px`, height: `${size}px`, borderWidth: `${borderSize}px` }}></div>
    </div>
  );
}
