import { useState } from "react";
import { Button } from "./button";
import SvgIcon from "./svg-icon";

export function InputField({ children, label, editable, cls, inCls, onChange, onBlur, ...p }) {
  const [changed, setChanged] = useState(false);

  const handleChange = (e) => {
    setChanged(true);
    if (onChange) onChange(e);
  };

  const handleBlur = (e) => {
    setChanged(false);
    if (onBlur) onBlur(e);
  };

  return (
    <label htmlFor={p.name} className={"block " + (editable ? "relative " : "") + cls}>
      {children}
      {label && <span className={`block mt-2 mb-1 ${p.required ? "rq" : ""}`}>{label}</span>}
      <input
        id={p.name}
        placeholder={p.title || p.name}
        title={p.title || p.name}
        aria-label={p.title || p.name}
        className={`block peer w-full bg-cbg appearance-none border border-bc px-2 py-1 card ${
          editable ? "pr-12" : "cd_hr"
        } fs ${inCls || "rounded-md"}`}
        {...p}
        onChange={editable ? handleChange : onChange}
        onBlur={editable ? handleBlur : onBlur}
      />
      {/* <p className="absolute -top-5 pl-2 bg-lbg black h-0 peer-invalid:h-auto text-red text-sm">
          Please provide a valid email address.
        </p> */}

      {editable && (
        <span
          className={`block absolute top-0 right-0 w-[42px] p-${
            changed ? 2 : 3
          } cursor-pointer hover:text-red duration-150`}>
          <SvgIcon name={changed ? "checkMark" : "edit"} />
        </span>
      )}
    </label>
  );
}

export function CheckInput({ children, size = "20", color = "red", cls, ...p }) {
  const checkSize = Math.round(+size / 3);
  const checkBorder = Math.round(+size / 5);
  const radius = p.type == "radio" ? "rounded-full" : "rounded";

  return (
    <label htmlFor={p.name} className={`inline-flex justify-center items-center ${cls}`}>
      <div className={`relative w-[${size}px] h-[${size}px] flex justify-center items-center`}>
        <input
          id={p.name}
          title={p.title || p.name}
          aria-label={p.title || p.name}
          className={`peer absolute top-0 left-0 w-full h-full appearance-none bg-bc dark:bg-cbg border border-bf ${radius} cursor-pointer`}
          {...p}
        />
        <span
          className={`box-content w-[${checkSize}px] h-[${checkSize}px] border-0 border-${color} ${radius} peer-checked:border-[${checkBorder}px] duration-150`}></span>
      </div>
      {children && <span className="mx-1">{children}</span>}
    </label>
  );
}

export function CheckCard({ Tag = "label", children, cls, ...p }) {
  return (
    <Tag className={`relative w-1/2 md:w-44 h-24 bg-cbg rounded-lg card cd_hr ${cls || ""}`}>
      <input
        title={p.title || p.name}
        aria-label={p.title || p.name}
        className="absolute top-0 left-0 w-full h-full appearance-none border-pc bg-[rgb(0,0,0,0.1)] dark:bg-blur checked:bg-[transparent] dark:checked:bg-[transparent] checked:border-4 rounded-lg fs"
        {...p}
      />
      {children}
    </Tag>
  );
}

export function ToggleSwitch({ children, checked, onCheck, size = 50, cls, ...p }) {
  const h = Math.round(+size / 2);

  const handler = ({ target: { name, checked } }) => onCheck && onCheck({ name, checked });
  return (
    <label className={`inline-flex items-center cursor-pointer ${cls}`}>
      {children}
      <div
        dir="ltr"
        className={`overflow-hidden relative w-[${size}px] h-[${h}px] inline-flex items-center rounded-full`}>
        <input
          type="checkbox"
          checked={checked}
          onChange={handler}
          className="peer absolute top-0 left-0 w-full h-full appearance-none bg-lbg dark:bg-cbg rounded-full border border-bc checked:bg-pc cursor-pointer focus:border-blue "
          {...p}
        />
        <span
          className={`inline-block w-[${h - 2}px] h-[${
            h - 2
          }px] bg-bg absolute ml-[2px] border border-bc peer-checked:translate-x-full rounded-full transition-all duration-200`}></span>
      </div>
      {p.title && <span className="ml-3 text-sm font-medium">{p.title}</span>}
    </label>
  );
}

// Todo: https://codepen.io/pen?&editors=001
// export function ContentToggleSwitch({ checked, onCheck, size = 50, ...p }) {
//   const h = Math.round(+size / 2);

//   const handler = ({ target: { name, checked } }) => onCheck && onCheck({ name, checked });
//   return (
//     <label className="inline-flex items-center cursor-pointer">
//       <div
//         dir="ltr"
//         className={`overflow-hidden relative w-[${size}px] h-[${h}px] inline-flex items-center rounded-full cursor-pointer"`}>
//         <input
//           type="checkbox"
//           checked={checked}
//           onChange={handler}
//           className="peer absolute top-0 left-0 w-full h-full appearance-none bg-lbg dark:bg-cbg rounded-full border border-bc checked:bg-pc fs "
//           {...p}
//         />
//         <div
//           className={`bg-bg absolute ml-[2px] border border-bc peer-checked:translate-x-full rounded-full transition-all duration-200`}>
//           <span
//             className={`inline-block w-[${h - 2}px] h-[${
//               h - 2
//             }px] bg-bg absolute ml-[2px] border border-bc peer-checked:translate-x-full rounded-full transition-all duration-200`}></span>
//         </div>
//       </div>
//       {p.title && <span className="ml-3 text-sm font-medium">{p.title}</span>}
//     </label>
//   );
// }

export function Textarea({ cls, ...p }) {
  return (
    <textarea
      dir="auto"
      title={p.title || p.name}
      aria-label={p.title || p.name}
      placeholder={p.title || p.name}
      autoComplete="on"
      className={"block w-full h-32 mt-3 p-2 bg-cbg card cd_hr fs " + (cls || "rounded-md")}
      {...p}></textarea>
  );
}

export function Select({ children, cls, inCls, ...p }) {
  // autoComplete="day"
  return (
    <label htmlFor={p.name} className={"inline-flex mx-1 " + cls}>
      {p.title}
      <select
        id={p.name}
        title={p.title || p.name}
        aria-label={p.title || p.name}
        className={"block bg-cbg w-full px-2 py-1 card cd_hr fs " + (inCls || " rounded-md")}
        {...p}>
        {children}
      </select>
    </label>
  );
}

export function NumberInputField({ children, onChange, cls, inCls, ...p }) {
  const handler = (n) => onChange && onChange(n);

  return (
    <div className={`inline-flex ${cls}`}>
      {children || <label className="">{p.title}</label>}
      <div className={`flex justify-center items-center ${p.title && "mx-2"}`}>
        <Button icon="minus" handler={() => handler(-1)} cls="w-6 h-6 !p-0 !rounded-full" iconCls="w-full" />
        <input
          onChange={(e) => handler(Math.round(+e.target.value || 0))}
          title={p.title || p.name}
          aria-label={p.title || p.name}
          autoComplete="on"
          className={`appearance-none text-center font-semibold ${inCls || "w-8"}`}
          {...p}
        />
        <Button icon="plus" handler={() => handler(1)} cls="w-6 s h-6 !p-0 !rounded-full" iconCls="w-full" />
      </div>
    </div>
  );
  // return (
  //   <div className="relative h-10 w-32 flex rounded-lg mx-3 bg-[#d1d5db]">
  //     <input
  //       type="number"
  //       className="appearance-none absolute inset-0 w-full h-full text-center pl-4 font-semibold bg-[transparent] outline-none"
  //       name="quantity"
  //     />
  //     <button className="absolute top-0 left-0 h-full w-8 text-2xl flex justify-center items-center bg-[#d1d5db] hover:bg-[#9ca3af] rounded-l cursor-pointer fs">
  //       -
  //     </button>
  //     <button className="absolute top-0 right-0 h-full w-8 text-2xl flex justify-center items-center bg-[#d1d5db] hover:bg-[#9ca3af] rounded-r cursor-pointer fs">
  //       +
  //     </button>
  //   </div>
  // );
}
