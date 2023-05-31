"use client";

import { useContext } from "react";
import { AppSessionContext } from "../../../app-session-context";
import Image from "next/image";

export default function Images({ productName, images }) {
  const { lang, user } = useContext(AppSessionContext);
  const [imgPreviewIndex, setImgPreviewIndex] = useState(0);

  return (
    <div className="flex my-5">
      <div className="relative flex justify-center items-center h-32 ">
        <Image
          src={images.data[imgPreviewIndex].attributes.url}
          alt={productName}
          width="250"
          height="250"
          className="h-full w-auto"
        />
      </div>
      {images.data.map((img, i) => (
        <button
          className="overflow-hidden h-14 w-14 border border-bc mx-1 rounded-md"
          onClick={() => setImgPreviewIndex(i)}
          key={i}>
          <Image
            src={img.attributes.format.thumbnail.url}
            alt={productName}
            width="250"
            height="250"
            className="h-auto w-full"
          />
        </button>
      ))}
    </div>
  );
}
