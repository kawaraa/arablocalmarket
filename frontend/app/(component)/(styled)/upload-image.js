"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import SvgIcon from "./svg-icon";

export default function ImageUpload({ children, onFile, imageUrl, alt, fullHeight, cls, ...p }) {
  const [fileChanged, setFileChanged] = useState(false);
  const inputRef = useRef(null);
  const [filePreview, setFilePreview] = useState(null);

  const handleChange = (e) => {
    setFileChanged(!fileChanged);
    if (!e.target.files[0]) return;

    const img = document.createElement("img");
    img.onload = () => convert(img);
    img.src = URL.createObjectURL(e.target.files[0]);

    const convert = (img) => {
      URL.revokeObjectURL(img); // free up memory
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const cb = (blob) => {
        blob.name = "new-image.jpg";
        setFilePreview(blob);
        if (onFile) onFile(blob);
      };

      canvas.toBlob(cb, "image/jpeg", 1); // mime=JPEG, quality=1, this will compress the image
    };
  };
  return (
    <div
      className={`relative overflow-hidden mb-3 -mx-1 sm:mx-0 flex justify-center items-center bg-lbg dark:bg-cbg sm:rounded-lg ${
        cls || "h-44"
      }`}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        aria-label={p.title}
        className="peer w-0 h-0 opacity-0"
        {...p}
      />
      {inputRef.current?.files[0] || imageUrl ? (
        <>
          <Image
            src={filePreview ? URL.createObjectURL(filePreview) : imageUrl}
            width="400"
            height="400"
            alt={alt}
            className={fullHeight ? "h-full" : "w-full"}
          />

          <label
            htmlFor={p.id}
            className="absolute top-5 left-5 bg-blur text-dt w-8 rounded-full cursor-pointer hover:text-red">
            <SvgIcon name="edit" />
          </label>
        </>
      ) : (
        <label
          htmlFor={p.id}
          className="relative w-32 mx-auto p-3 border border-bc rounded-lg hover:border-bf peer-focus:border-red cursor-pointer">
          <SvgIcon name="image" />
          <div className="w-6 mx-auto">
            <SvgIcon name="download" />
          </div>
        </label>
      )}
      {children}
    </div>
  );
}
