"use client";
import icons from "./icons";

export default function Button({ type, icon, text, handler, cls }) {
  return (
    <button
      type={type}
      onClick={handler}
      className={`transition inline-flex items-center bg-d-c-bg text-l-c hover:bg-l-h border border-l-b dark:bg-p-c dark:text-l-c dark:border-d-b rounded-md px-4 py-2 text-sm font-medium shadow-sm  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${cls}`}>
      {icons[icon] || icon}
      {text}
    </button>
  );
}
Button.defaultProps = {
  type: "button",
  icon: "",
  text: "OK",
  cls: "",
  onClick: null,
};
