"use client";
import Image from "next/image";
import SvgIcon from "./svg-icon";

export default function Avatar({ initial, alt, url }) {
  let avatar = !url ? (
    <SvgIcon name="avatar" />
  ) : (
    <Image className="block w-full" src={url} alt={alt} width="40" height="40" />
  );
  return (
    <div className="transition w-10 h-10 md:w-10 md:h-10 p-2 flex justify-center items-center bg-pc text-t bg-gradient-to-tl hover:from-pc2 shadow-md">
      {!initial ? avatar : <span className="uppercase font-semibold">{initial}</span>}
    </div>
  );
}
