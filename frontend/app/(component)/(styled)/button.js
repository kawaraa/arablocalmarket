"use client";
import Link from "next/link";
import SvgIcon from "../(styled)/svg-icon";
import Loader from "../../(layout)/loader";

export default function Button({ text, icon, type = "button", handler, loading, disabled, cls, iconCls }) {
  let c = `inline-flex justify-center items-center px-3 py-1 text-sm md:text-lg bg-pc bg-gradient-to-tl text-t font-medium rounded-md shadow-md md:px-4 md:py-2 disabled:opacity-60 disabled:cursor-no-drop duration-200 `;
  // let c = `inline-flex justify-center px-3 py-1 text-sm md:text-lg bg-dbg dark:bg-pc text-dt dark:text-t rounded-md md:px-4 md:py-2 font-medium shadow-md disabled:opacity-60 disabled:cursor-no-drop transition-all duration-200`;
  if (!disabled) c += "hover:from-pc2 ";
  // if (!disabled) c += "border border-bc hover:border-bf hover:bg-pc dark:hover:bg-lbg hover:text-t ";
  if (loading) c += "cursor-progress ";
  c += cls || "";

  // Botton 1: bg-pc text-t bg-gradient-to-tl hover:from-pc2
  // Botton 2: bg-dbg text-dt hover:bg-pc hover:text-t dark:bg-pc dark:text-t dark:hover:bg-lbg duration-200

  return (
    <button type={type} onClick={handler} disabled={disabled} className={c}>
      {text}
      {loading ? (
        <Loader size="18" />
      ) : (
        <span className={`w-5 ${iconCls || ""}`}>
          {" "}
          {typeof icon === "string" ? <SvgIcon name={icon} /> : icon}
        </span>
      )}
    </button>
  );
}

// export function LinkButton({ href, icon, handler, loading, cls, iconCls }) {
//   let c = `inline-flex justify-center px-3 py-1 text-sm md:text-lg bg-pc bg-gradient-to-tl text-t font-medium rounded-md shadow-md md:px-4 md:py-2 disabled:opacity-60 disabled:cursor-no-drop duration-200 hover:from-pc2 `;
//   c = loading ? "cursor-progress " + cls : cls;

//   return (
//     <Link href={href} onClick={handler} title={text} className={c}>
//       {text}
//       {loading ? (
//         <Loader size="4" />
//       ) : (
//         <span className={`max-w-4 ${iconCls}`}>
//           {" "}
//           {(typeof icon === "string" && <SvgIcon name={icon} />) || icon}
//         </span>
//       )}
//     </Link>
//   );
// }
