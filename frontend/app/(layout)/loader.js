"use client";

export default function Loader({ size = "10", cls = "" }) {
  const borderSize = Math.round(+size / 2);

  return (
    <div className="flex justify-center items-center ml-1" role="img" aria-label="loading">
      <div
        className={`w-${size} h-${size} border-[${borderSize}px] border-t-[transparent] border-d-c rounded-full animate-spin ${cls}`}></div>
    </div>
  );
}
