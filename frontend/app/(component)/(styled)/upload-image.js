"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import SvgIcon from "./svg-icon";

export default function ImageUpload({ children, onChange, imageUrl, alt, fullHeight, cls, ...p }) {
  const [files, setFiles] = useState(false);
  const input = useRef(null);
  const idRf = useRef((Math.random() + "").replace("0.", ""));

  const handleChange = (e) => {
    setFiles(!files);
    if (onChange) onchange(e.target.file);
  };

  const inputElement = (
    <input
      ref={input}
      type="file"
      accept="image/*"
      onChange={handleChange}
      id={idRf.current}
      aria-label={p.title}
      className="w-0 h-0 hidden"
      {...p}
    />
  );

  return (
    <div
      className={`relative overflow-hidden mb-3 -mx-1 sm:mx-0 flex justify-center items-center bg-lbg dark:bg-cbg sm:rounded-lg ${
        cls || "h-44"
      }`}>
      {input?.current?.files[0] || imageUrl ? (
        <>
          <Image
            src={input?.current?.files[0] ? URL.createObjectURL(input?.current?.files[0]) : imageUrl}
            width="250"
            height="250"
            alt={alt}
            className={fullHeight ? "h-full" : "w-full"}
          />

          <label
            htmlFor={idRf.current}
            className="absolute top-5 right-5 bg-blur text-dt w-8 rounded-full cursor-pointer hover:text-red">
            <SvgIcon name="edit" />
            {inputElement}
          </label>
        </>
      ) : (
        <label
          htmlFor={idRf.current}
          className="relative w-32 mx-auto p-3 border border-bc rounded-lg  cursor-pointer">
          <SvgIcon name="image" />
          {inputElement}
          <div className="w-6 mx-auto">
            <SvgIcon name="download" />
          </div>
        </label>
      )}
      {children}
    </div>
  );
}
