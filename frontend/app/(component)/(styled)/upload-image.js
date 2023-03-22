"use client";
import { useRef, useState } from "react";
import SvgIcon from "./svg-icon";

export default function ImageUpload({ id, onChange, ...p }) {
  const [files, setFiles] = useState(false);
  const input = useRef(null);

  const handleChange = (e) => {
    setFiles(!files);
    if (onChange) onchange(e.target.file);
  };

  //   const handleChange = (e) => {
  //     console.log(e.target.files[0]);
  //     setLoading(true);
  //     const reader = new FileReader();
  //     reader.onload = () => setImageData(reader.result) + setLoading(false);
  //     reader.readAsDataURL(e.target.files[0]);
  //     if (onChange) onchange(e.target.file);
  //   };
  // <img src={imageData} alt="Store cover image" className="w-full" />

  return (
    <div className="overflow-hidden h-60 mb-3 flex justify-center items-center bg-lbg dark:bg-cbg rounded-lg ">
      {input?.current?.files[0] ? (
        // To make responsive: max-w-full max-h-full
        <img src={URL.createObjectURL(input?.current?.files[0])} alt="Store cover image" className="w-full" />
      ) : (
        <label htmlFor={id} className="relative w-32 mx-auto p-3 border border-bc rounded-lg  cursor-pointer">
          <SvgIcon name="image" />
          <input
            ref={input}
            type="file"
            accept="image/*"
            onChange={handleChange}
            id={id}
            className="w-0 h-0 hidden"
            {...p}
          />
          <div className="w-6 mx-auto">
            <SvgIcon name="download" />
          </div>
        </label>
      )}
    </div>
  );
}

// export default function ImageUpload({ onChange, ...p }) {
//   const [loading, setLoading] = useState(false);
//   const [imageData, setImageData] = useState("");

//   const handleChange = (e) => {
//     console.log(e.target.files[0]);
//     setLoading(true);
//     const reader = new FileReader();
//     reader.onload = () => setImageData(reader.result) + setLoading(false);
//     reader.readAsDataURL(e.target.files[0]);
//     if (onChange) onchange(e.target.file);
//   };

//   return (
//     <div className="overflow-hidden h-60 mb-3 flex justify-center items-center bg-lbg dark:bg-cbg rounded-lg ">
//       {imageData ? (
//         // To make responsive: max-w-full max-h-full
//         <img src={imageData} alt="Store cover image" className="w-full" />
//       ) : (
//         <label
//           htmlFor="store-cover"
//           className="relative w-32 mx-auto p-3 border border-bc rounded-lg  cursor-pointer">
//           <SvgIcon name="image" />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleChange}
//             id="store-cover"
//             className="w-0 h-0 hidden"
//             {...p}
//           />
//           <div className="w-6 mx-auto">
//             <SvgIcon name="download" />
//           </div>
//         </label>
//       )}
//     </div>
//   );
// }
