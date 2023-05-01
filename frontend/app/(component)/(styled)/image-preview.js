"use client";
import { useContext, useEffect, useState } from "react";
import { AppSessionContext } from "../../app-session-context";

export default function ImagePreview({}) {
  // Todo: Add title to image and close button
  const { lang } = useContext(AppSessionContext);
  const [src, setSrc] = useState(null);

  const handler = ({ target }) => {
    if (target.tagName != "IMG" || !target.className?.includes("preview")) return;
    setSrc(target.src);
  };

  useEffect(() => {
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  if (!src) return null;
  return (
    <div
      id="picture-preview-outer"
      className="z-9 fixed inset-0 bg-bg dark:bg-dbg flex justify-center items-center">
      <div className="relative overflow-scroll duration-500 w-full md:w-1/3 lg:1/2 lazy-c">
        <span
          onClick={() => setSrc(null)}
          className="block w-6 h-6 text-4xl bg-blur text-bg absolute top-1 right-1 flex justify-center items-center rotate-45 font-monospace rounded-full cursor-pointer">
          +
        </span>
        <img src={src} className="w-full" />
      </div>
    </div>
  );
}
