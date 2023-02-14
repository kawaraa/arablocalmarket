"use client";
import { useEffect, useState } from "react";

export default function Transition({
  children,
  base = "",
  enter = "",
  exit = "",
  time = 100,
  open,
  deleted,
  remove,
  ...props
}) {
  const [endClass, setEndClass] = useState("");

  useEffect(() => {
    if (deleted) {
      setEndClass(exit);
      if (remove) setTimeout(remove, time);
    }
  }, [deleted]);

  useEffect(() => {
    if (!remove) {
      if (open) setEndClass(enter);
      else if (!open) setEndClass(exit);
    }
  }, [open]);

  return (
    <props.tag className={`${remove && enter} ${base} transition-all duration-${time} ${endClass}`}>
      {children}
    </props.tag>
  );
}
