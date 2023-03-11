"use client";
import { useEffect, useState } from "react";

export default function Transition({ Tag, children, base, enter, exit, time = "300", open, ...p }) {
  const [active, setActive] = useState(open);
  const [cls, setCls] = useState(enter);

  useEffect(() => {
    if (open) {
      setActive(open);
      setTimeout(() => setCls(enter), 10);
    } else {
      setCls(exit);
      setTimeout(() => setActive(open), +time);
    }
  }, [open]);

  if (!active) return null;
  return (
    <Tag className={`transition-all duration-${time} ease-in-out ${base} ${cls}`} {...p}>
      {children}
    </Tag>
  );
}
