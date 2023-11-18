"use client";
import { useEffect, useState } from "react";

export default function Transition({ Tag, children, base, enter, exit, time = "300", open, ...p }) {
  const [active, setActive] = useState(open);
  const [cls, setCls] = useState(enter);

  useEffect(() => {
    if (open) {
      setActive(true);
      setTimeout(() => setCls(enter), 50);
    } else {
      setCls(exit);
      setTimeout(() => setActive(false), +time + 50);
    }
  }, [open]);

  if (!active) return null;
  return (
    <Tag className={`transition-all duration-${time} ease-in-out ${base} ${cls}`} {...p}>
      {children}
    </Tag>
  );
}
