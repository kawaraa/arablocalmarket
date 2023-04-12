"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import SvgIcon from "./svg-icon";

export default function ImageUpload({ children, onFile, imageUrl, alt, fullHeight, cls, ...p }) {
  const [fileChanged, setFileChanged] = useState(false);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setFileChanged(!fileChanged);
    if (onFile) onFile(e.target.files[0]);
  };

  const sss = () => {
    document.querySelector("input").onchange = function () {
      var img = new Image();
      img.onload = convert;
      img.src = URL.createObjectURL(this.files[0]);
    };

    function convert() {
      URL.revokeObjectURL(this.src); // free up memory
      var c = document.createElement("canvas"), // create a temp. canvas
        ctx = c.getContext("2d");
      c.width = this.width; // set size = image, draw
      c.height = this.height;
      ctx.drawImage(this, 0, 0);

      // convert to File object, NOTE: we're using binary mime-type for the final Blob/File
      c.toBlob(
        function (blob) {
          var file = new File([blob], "MyJPEG.jpg", { type: "application/octet-stream" });
          window.location = URL.createObjectURL(file);
        },
        "image/jpeg",
        0.75
      ); // mime=JPEG, quality=0.75
    }
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
            src={inputRef.current?.files[0] ? URL.createObjectURL(inputRef.current?.files[0]) : imageUrl}
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
