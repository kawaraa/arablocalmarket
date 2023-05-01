"use client";
import { useContext, useEffect, useState } from "react";
import { AppSessionContext } from "../../app-session-context";
import { IconButton } from "./button";

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
    <div className="z-9 fixed inset-0 bg-bg dark:bg-dbg flex justify-center items-center">
      <IconButton onClick={() => setSrc(null)} icon="crossMark" cls="absolute top-3 right-3" />
      <div className="w-full max-h-full lg:w-1/2 overflow-scroll duration-500 lazy-c">
        <img src={src} className="w-full max-h-full" />
      </div>
    </div>
  );
}
