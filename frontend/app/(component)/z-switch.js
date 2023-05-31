"use client";

import { useState } from "react";

export default function Switch({ a }) {
  const [checked, setChecked] = useState(false);

  console.log("Switch: >>>", a);

  return (
    <div className="py-16">
      <div className="bg-teal-700 relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-[transparent] transition-colors duration-200 ease-in-out focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75">
        <input id="headlessui-switch-:R2:" type="checkbox" tabindex="0" checked={checked} />
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className="translate-x-0
    pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"></span>
      </div>
    </div>
  );
}
