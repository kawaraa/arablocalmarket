"use client";
import { useEffect, useState } from "react";

export default function Transition({ base = "", enter = "", exit = "", time = "100", open, ...props }) {
  const [cls, setCls] = useState("");

  useEffect(() => {
    setCls(open ? enter : exit);
  }, [open]);

  return (
    <props.tag className={`transition-all duration-${time} ${base} ${enter} ${cls}`}>
      {open && props.children}
    </props.tag>
  );
}
