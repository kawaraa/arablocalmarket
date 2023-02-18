"use client";
import { useEffect, useState } from "react";

export default function Transition({ base = "", enter = "", exit = "", time = "300", open, ...props }) {
  const [active, setActive] = useState(open);
  const [cls, setCls] = useState(enter);
  const newProps = props.wrapperProps || {};

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
    <props.tag {...newProps} className={`transition-all duration-${time} ease-in-out ${base} ${cls}`}>
      {props.children}
    </props.tag>
  );
}
