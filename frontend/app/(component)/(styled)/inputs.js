import { useState } from "react";
import { Button } from "./button";
import SvgIcon from "./svg-icon";

export function InputField({ children, label, editable, cls, inCls, onChange, onBlur, full, ...p }) {
  const [changed, setChanged] = useState(false);
  const id = (Math.random() + "").replace("0.", "");

  const handleChange = (e) => {
    setChanged(true);
    if (onChange) onChange(e);
  };

  const handleBlur = (e) => {
    setChanged(false);
    if (onBlur) onBlur(e);
  };

  return (
    <label htmlFor={id} dir="auto" className={"block " + (cls || "")}>
      {children}
      {label && (
        <>
          <span className={`block text-sm mt-2 ${p.required ? "rq" : ""}`}>{label}</span>
          <span className="w-1 h-1"></span>
        </>
      )}
      <span className={`relative inline-flex items-center ${full ? "w-full" : ""}`}>
        <span className={`relative inline-flex items-center ${full ? "w-full" : ""}`}>
          {!full && (
            <span className={(inCls || "") + " block opacity-0 px-2 py-1 pr-10"}>{p.defaultValue}</span>
          )}

          <input
            id={id}
            dir={p.type == "number" ? "ltr" : "auto"}
            placeholder={p.title}
            title={p.title}
            aria-label={p.title}
            className={`${!full ? "absolute" : ""} w-full bg-cbg appearance-none px-2 py-1 ${
              editable ? "pr-10" : "card cd_hr"
            } fs ${inCls || "rounded-md"}`}
            {...p}
            onChange={editable ? handleChange : onChange}
            onBlur={editable ? handleBlur : onBlur}
          />
          {/* <p className="absolute -top-5 pl-2 bg-lbg black h-0 peer-invalid:h-auto text-red text-sm">
          Please provide a valid email address.
        </p> */}
        </span>

        {editable && (
          <span className={`absolute right-0 w-[34px] p-1 cursor-pointer hover:text-red duration-150`}>
            <SvgIcon name={changed ? "checkMark" : "edit"} />
          </span>
        )}
      </span>
    </label>
  );
}

export function CheckInput({ children, size = "20", color = "red", cls, ...p }) {
  const checkSize = Math.round(+size / 3);
  const checkBorder = Math.round(+size / 5);
  const radius = p.type == "radio" ? "rounded-full" : "rounded";
  const id = (Math.random() + "").replace("0.", "");

  return (
    <label htmlFor={id} className={`inline-flex justify-center items-center ${cls}`}>
      <div className={`relative w-[${size}px] h-[${size}px] flex justify-center items-center`}>
        <input
          id={id}
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
  const id = (Math.random() + "").replace("0.", "");

  return (
    <Tag htmlFor={id} className={`relative w-1/2 md:w-44 bg-cbg rounded-lg card cd_hr ${cls || ""}`}>
      <input
        id={id}
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
  const id = (Math.random() + "").replace("0.", "");
  const handler = ({ target: { name, checked } }) => onCheck && onCheck({ name, checked });

  return (
    <label htmlFor={id} className={`inline-flex items-center cursor-pointer ${cls}`}>
      {children}
      <div
        dir="ltr"
        className={`overflow-hidden relative w-[${size}px] h-[${h}px] inline-flex items-center rounded-full`}>
        <input
          type="checkbox"
          checked={checked}
          onChange={handler}
          id={id}
          className="peer absolute top-0 left-0 w-full h-full appearance-none bg-lbg dark:bg-cbg rounded-full border border-bc checked:bg-pc dark:checked:bg-pc cursor-pointer focus:border-blue "
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
/* <ContentToggleSwitch name="status" checked={status} onCheck={({ checked }) => setStatus(checked)} /> */

export function ContentToggleSwitch({ checked, onCheck, size = 50, ...p }) {
  const id = (Math.random() + "").replace("0.", "");
  const handler = ({ target: { name, checked } }) => onCheck && onCheck({ name, checked });
  // const h = Math.round(+size / 2);

  return (
    <label
      dir="ltr"
      htmlFor={id}
      className="overflow-hidden relative inline-block w-auto h-[24px] cursor-pointer bg-[#121212] rounded-full">
      <input
        type="checkbox"
        checked={checked}
        onChange={handler}
        id={id}
        className="absolute inset-0 w-full h-full bg-[transparent] border border-bc rounded-full appearance-none fs"
        {...p}
      />
      <span className={`block px-2`}>open</span>
      <span className={`block px-2`}>close</span>

      <span className="overflow-hidden flex items-center absolute inset-0 h-full">
        <span className={`px-2 text-center ${checked ? "ml-0" : "absolute -left-[100%]"}`}>open</span>
        <span className={`w-[22px] h-[22px] mx-[2px] bg-[#ffffff] rounded-full bg-pc`}></span>
        <span className={`px-2 text-center ${checked ? "absolute left-[100%]" : "left-[2px]"}`}>close</span>
      </span>
      {/* 
       
        <div
          className={`bg-bg absolute ml-[2px] border border-bc peer-checked:translate-x-full rounded-full transition-all duration-200`}>
          <span
            className={`inline-block w-[${h - 2}px] h-[${
              h - 2
            }px] bg-bg absolute ml-[2px] border border-bc peer-checked:translate-x-full rounded-full transition-all duration-200`}></span>
        </div>

      {p.title && <span className="ml-3 text-sm font-medium">{p.title}</span>} */}
    </label>
  );
}

export function Textarea({ editable, value, onChange, onBlur, cls, ...p }) {
  const [changed, setChanged] = useState(false);
  const id = (Math.random() + "").replace("0.", "");

  const handleChange = (e) => {
    setChanged(true);
    if (onChange) onChange(e);
  };
  const handleBlur = (e) => {
    setChanged(false);
    if (onBlur) onBlur(e);
  };

  return (
    <div className="relative">
      <textarea
        dir="auto"
        id={id}
        onChange={editable ? handleChange : onChange}
        onBlur={editable ? handleBlur : onBlur}
        title={p.title}
        aria-label={p.title}
        placeholder={p.title}
        autoComplete="on"
        className={`block w-full h-32 mt-3 p-2 bg-cbg ${editable ? "pr-10" : "card cd_hr"} fs ${
          cls || "rounded-md"
        }`}
        {...p}></textarea>
      {editable && (
        <label
          htmlFor={id}
          className={`absolute right-0 bottom-0 w-[34px] p-1 cursor-pointer hover:text-red duration-150`}>
          <SvgIcon name={changed ? "checkMark" : "edit"} />
        </label>
      )}
    </div>
  );
}

export function Select({ children, cls, inCls, ...p }) {
  const id = (Math.random() + "").replace("0.", "");
  // autoComplete="day"

  return (
    <label htmlFor={id} className={"inline-block mx-1 " + cls}>
      {p.title && <span className={`mb-1 font-semibold ${p.required ? "rq" : ""}`}>{p.title}</span>}

      <select
        id={id}
        title={p.title}
        aria-label={p.title}
        className={"inline-block bg-cbg w-auto px-2 py-1 card cd_hr fs " + (inCls || " rounded-md")}
        {...p}>
        {children}
      </select>
    </label>
  );
}

export function NumberInputField({ children, onChange, label, cls, inCls, ...p }) {
  const id = (Math.random() + "").replace("0.", "");
  const handler = (n) => onChange && onChange(n);

  return (
    <div dir="auto" className={`inline-flex bg-cbg rounded-full ${cls}`}>
      {children || (
        <>
          <label htmlFor={id} className="text-sm">
            {label}
          </label>
          <span className="!h-2 !w-2"></span>
        </>
      )}
      <div className="flex justify-center items-center">
        <Button icon="minus" handler={() => handler(-1)} cls="w-6 h-6 !p-0 !rounded-full" iconCls="w-full" />
        <input
          dir="ltr"
          type="number"
          id={id}
          onChange={(e) => handler(Math.round(+e.target.value || 0))}
          title={p.title || p.name}
          aria-label={p.title || p.name}
          autoComplete="on"
          className={`appearance-none text-center font-semibold md:-mr-3 bg-[transparent] ${inCls || "w-10"}`}
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
