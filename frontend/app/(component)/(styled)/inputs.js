"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "./button";

export function InputField({ children, label, editable, cls, inCls, onChange, onBlur, full, ...p }) {
  const inputRef = useRef(null);
  const [icon, setIcon] = useState("edit");

  const handleChange = (e) => {
    if (editable) setIcon("checkMark");
    if (onChange) onChange(e);
  };

  const handleBlur = (e) => {
    if (editable) setTimeout(() => setIcon("edit"), 200);
    if (onBlur) onBlur(e);
  };

  return (
    <div dir="auto" className={"relative flex " + (cls || "flex-col")}>
      {children}
      {label && (
        <>
          <label htmlFor={cls} className={`flex text-sm whitespace-nowrap ${p.required ? "rq" : ""}`}>
            {label}
          </label>
          <span className="w-2 h-2"></span>
        </>
      )}
      <span className={`relative inline-flex items-center ${full ? "w-full" : ""}`}>
        <span className={`relative inline-flex items-center ${full ? "w-full" : ""}`}>
          {!full && (
            <span className={(inCls || "") + " block opacity-0 px-2 py-1 pr-10"}>
              {p.defaultValue || p.value}
            </span>
          )}

          <input
            ref={inputRef}
            id={cls}
            dir={p.type == "number" ? "ltr" : "auto"}
            placeholder={p.title}
            title={p.title}
            aria-label={p.title}
            className={`${
              !full ? "absolute" : ""
            } w-full bg-cbg appearance-none px-2 py-1 leading-9 disabled:cursor-no-drop ${
              editable ? "pr-10" : "card " + (p.disabled ? "" : "cd_hr")
            } fs ${inCls || "rounded-md"}`}
            {...p}
            onChange={handleChange}
            onBlur={handleBlur}
            onClick={(e) => e.preventDefault()}
          />
        </span>

        {editable && (
          <Button
            onClick={() => icon == "edit" && inputRef.current?.focus()}
            icon={icon}
            className={`absolute right-0 w-[34px] p-1 cursor-pointer hover:text-red transition`}
          />
        )}
      </span>
    </div>
  );
}
export function InputWithSelect({ label, options, value, onChange, cls, ...p }) {
  const selectRef = useRef();
  const numProp = { inputMode: "numeric", pattern: `\d*`, min: "1", max: "1000", step: "1" };
  const values = value?.split("-") || [];

  return (
    <div className={`flex items-center w-auto ${cls || ""}`}>
      {typeof label != "string" ? (
        label
      ) : (
        <>
          <label htmlFor={cls}>{label}</label>
          <span className="w-2 h-2"></span>
        </>
      )}

      <div dir="ltr" className="flex-1 flex items-stretch">
        <input
          id={cls}
          {...(p.type == "number" ? numProp : {})}
          defaultValue={values[0]}
          onChange={(e) => onChange(e.target.value + "-" + (selectRef.current?.value || ""))}
          autoComplete="one"
          className="w-full px-2 py-1 leading-9 bg-cbg card appearance-none rounded-l-md hover:border-bf fs"
          {...p}
        />

        <select
          ref={selectRef}
          name={(p.name || "") + "-" + "suffix"}
          defaultValue={values[1]}
          title={p.title}
          aria-label={p.title}
          className="h-[100%] bg-cbg w-auto px-2 py-1 card cd_hr fs rounded-r-md">
          {options.map((op, i) => (
            <option value={op.key} key={i}>
              {op.text}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function CheckInput({ children, size = "20", color = 0, cls, onChange, ...p }) {
  const [changed, setChanged] = useState(false);
  const colors = ["border-red", "border-pc", "border-pc1", "border-bg3", "border-bg8"];
  const btnRef = useRef(null);
  const checkSize = Math.round(+size / 3);
  const checkBorder = Math.round(+size / 5);
  const radius = p.type == "radio" ? "rounded-full" : "rounded";
  const s = (w, h) => ({ width: `${w}px`, height: `${h}px` });

  const handleCheck = () => {
    if (p.type != "radio") setChanged(!changed);
    if (onChange) onChange();
  };

  useEffect(() => {
    if (p.type != "radio" && btnRef.current) btnRef.current.checked = p.checked;
  }, [p.checked]);

  return (
    <label htmlFor={cls} className={`inline-flex justify-center items-center ${cls}`}>
      <div style={s(size, size)} className={`relative flex justify-center items-center`}>
        <input
          onClick={handleCheck}
          onChange={() => {}}
          ref={btnRef}
          id={cls}
          title={p.title || p.name}
          aria-label={p.title || p.name}
          className={`peer absolute top-0 left-0 w-full h-full appearance-none bg-bc dark:bg-cbg border border-bf ${radius} cursor-pointer`}
          {...p}
        />
        <span
          style={{
            ...s(checkSize, checkSize),
            borderWidth: btnRef.current?.checked ? `${checkBorder}px` : 0,
          }}
          className={`box-content ${colors[color]} ${radius} duration-150`}></span>
      </div>
      {children && <span className="mx-1">{children}</span>}
    </label>
  );
}

export function CheckCard({ Tag = "label", children, cls, inCls, ...p }) {
  return (
    <Tag htmlFor={cls} className={`relative bg-cbg rounded-lg card cd_hr ${cls || ""}`}>
      <input
        id={cls}
        title={p.title || p.name}
        aria-label={p.title || p.name}
        className={`absolute top-0 left-0 w-full h-full appearance-none border-pc bg-[rgb(0,0,0,0.1)] dark:bg-blur checked:bg-[transparent] dark:checked:bg-[transparent] checked:border-4 rounded-lg fs ${inCls}`}
        {...p}
      />
      {children}
    </Tag>
  );
}

export function ToggleSwitch({ children, label, size = 50, cls, ...p }) {
  const h = Math.round(+size / 2);

  return (
    <div className={`inline-flex items-center ${cls}`}>
      {children}
      <label
        htmlFor={cls}
        dir="ltr"
        style={{ width: `${size}px`, height: `${h}px` }}
        className={`overflow-hidden relative inline-flex items-center rounded-full cursor-pointer`}>
        <input
          type="checkbox"
          id={cls}
          className="peer absolute top-0 left-0 w-full h-full appearance-none bg-lbg dark:bg-cbg rounded-full border border-bc checked:bg-pc dark:checked:bg-pc cursor-pointer focus:border-blue "
          {...p}
        />
        <span
          style={{ width: `${h - 2}px`, height: `${h - 2}px` }}
          className={`inline-block bg-bg absolute ml-[2px] border border-bc peer-checked:translate-x-full rounded-full transition-all duration-200`}></span>
      </label>
      <span className="w-2 h-2"></span>
      {label && <span className="text-sm font-medium">{label}</span>}
    </div>
  );
}

// Todo: Not done yet > https://codepen.io/pen?&editors=001
/* <ContentToggleSwitch name="status" checked={status} onCheck={({ checked }) => setStatus(checked)} /> */
export function ContentToggleSwitch({ checked, onCheck, size = 50, ...p }) {
  const handler = ({ target: { name, checked } }) => onCheck && onCheck({ name, checked });
  // const h = Math.round(+size / 2);

  return (
    <label
      dir="ltr"
      htmlFor={cls}
      className="overflow-hidden relative inline-block w-auto h-[24px] cursor-pointer bg-[#121212] rounded-full">
      <input
        type="checkbox"
        checked={checked}
        onChange={handler}
        id={cls}
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

export function Textarea({ children, label, editable, onChange, onBlur, cls, inCls, ...p }) {
  const inputRef = useRef(null);
  const [icon, setIcon] = useState("edit");

  const handleChange = (e) => {
    if (editable) setIcon("checkMark");
    if (onChange) onChange(e);
  };

  const handleBlur = (e) => {
    if (editable) setTimeout(() => setIcon("edit"), 200);
    if (onBlur) onBlur(e);
  };

  return (
    <div className={"relative mt-3 " + cls}>
      {label && (
        <>
          <label htmlFor={cls} className={`font-semibold flex ${p.required ? "rq" : ""}`}>
            {label}
          </label>
          <span className="w-2 h-2"></span>
        </>
      )}

      {children}
      <textarea
        dir="auto"
        ref={inputRef}
        id={cls}
        onChange={handleChange}
        onBlur={handleBlur}
        title={p.title}
        aria-label={p.title}
        placeholder={p.title}
        autoComplete="on"
        className={`block w-full p-2 bg-cbg ${
          editable ? "overflow-hidden focus:overflow-auto h-auto pr-10" : "h-32 card cd_hr"
        } fs ${"rounded-md " + inCls}`}
        {...p}></textarea>
      {editable && (
        <Button
          onClick={() => icon == "edit" && inputRef.current?.focus()}
          icon={icon}
          className={`absolute right-0 bottom-0 w-[34px] p-1 cursor-pointer hover:text-red transition print:hidden`}
        />
      )}
    </div>
  );
}

export function Select({ children, label, cls, inCls, onChange, value, defaultValue, ...p }) {
  const [v, setV] = useState(defaultValue || value);

  useEffect(() => {
    setV(defaultValue || value);
  }, [defaultValue, value]);

  return (
    <div className={"inline-block " + cls}>
      {label && (
        <>
          <label htmlFor={cls} className={`font-semibold ${p.required ? "rq" : ""}`}>
            {label}
          </label>
          <span className="w-2 h-2"></span>
        </>
      )}

      <select
        id={cls}
        onChange={(e) => (onChange ? onChange(e) : setV(e.target.value))}
        title={p.title}
        aria-label={p.title}
        value={v}
        className={
          "inline-block bg-cbg w-auto px-2 py-1 text-center card cd_hr fs " + (inCls || " rounded-md")
        }
        {...p}>
        {children}
      </select>
    </div>
  );
}

export function NumberInputWithControl({ label, onChange, cls, inCls, ...p }) {
  const inputRef = useRef(null);

  const ch = (param) => {
    if (param == "up") inputRef.current.stepUp();
    if (param == "down") inputRef.current.stepDown();
    onChange && onChange(+inputRef.current.value);
  };

  return (
    <div dir="auto" className={`inline-flex ${cls}`}>
      {typeof label != "string" ? (
        label
      ) : (
        <>
          <label htmlFor={cls} className="text-sm">
            {label}
          </label>
          <span className="!h-2 !w-2"></span>
        </>
      )}
      <div className="flex justify-center items-center bg-cbg rounded-full">
        <Button icon="minus" onClick={() => ch("down")} cls="w-7 h-7 !p-0 !rounded-full" iconCls="w-full" />
        <input
          ref={inputRef}
          dir="ltr"
          type="number"
          id={cls}
          title={p.title || p.name}
          aria-label={p.title || p.name}
          autoComplete="on"
          className={`appearance-none text-center leading-8 font-semibold md:-mr-3 bg-[transparent] text-lg ${
            inCls || "w-12"
          }`}
          {...p}
          onChange={(e) => ch(+e.target.value)}
        />
        <Button icon="plus" onClick={() => ch("up")} cls="w-7 h-7 !p-0 !rounded-full" iconCls="w-full" />
      </div>
    </div>
  );
}

// export function NumberInputWithControl2() {
//   return (
//     <div className="relative h-10 w-32 flex rounded-lg mx-3 bg-[#d1d5db]">
//       <input
//         type="number"
//         className="appearance-none absolute inset-0 w-full h-full text-center pl-4 font-semibold bg-[transparent] outline-none"
//         name="quantity"
//       />
//       <button
//         onclick="this.parentElement.children[0].stepDown()"
//         className="absolute top-0 left-0 h-full w-8 text-2xl flex justify-center items-center bg-[#d1d5db] hover:bg-[#9ca3af] rounded-l cursor-pointer fs">
//         -
//       </button>
//       <button
//         onclick="this.parentElement.children[0].stepUp()"
//         className="absolute top-0 right-0 h-full w-8 text-2xl flex justify-center items-center bg-[#d1d5db] hover:bg-[#9ca3af] rounded-r cursor-pointer fs">
//         +
//       </button>
//     </div>
//   );
// }
