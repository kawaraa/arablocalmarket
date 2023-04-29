"use client";
import { useEffect, useState } from "react";
import { IconButton } from "./(styled)/button";

export default function ScrollToTopBtn({ cls = "" }) {
  let [visible, setVisible] = useState(false);

  const handleScrollEvent = () => {
    if (document.documentElement.scrollTop > 2000) setVisible(true);
    else setVisible(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  return !visible ? null : (
    <IconButton
      icon="chevronDown"
      size="16"
      onClick={() => window.scroll(0, 0) + setTimeout(() => setVisible(false), 400)}
      cls={
        "rotate-180 fixed bottom-5 right-1/2 translate-x-1/2 !p-0 rounded-full border-2 hover:border-pc " +
        cls
      }
    />
  );
}
