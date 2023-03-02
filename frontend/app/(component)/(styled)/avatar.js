"use client";
import SvgIcon from "./svg-icon";

export default function Avatar({ initial, alt, url }) {
  let avatar = !url ? <SvgIcon name="avatar" /> : <img className="block w-full" src={url} alt={alt} />;
  return (
    <div className="transition w-8 h-8 md:w-10 md:h-10 p-2 flex justify-center items-center bg-p-c hover:text-lt dark:hover:text-dt shadow-md">
      {!initial ? avatar : <span className="uppercase text-lg font-bold">{initial}</span>}
    </div>
  );
}
