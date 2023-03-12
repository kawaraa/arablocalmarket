import SvgIcon from "./svg-icon";

export function Radio({ children, size = "20", color = "red", cls, ...p }) {
  const checkSize = Math.round(+size / 3);
  const checkBorder = Math.round(+size / 5);

  return (
    <label htmlFor={p.name} className={`flex justify-center items-center ${cls}`}>
      <div className={`relative w-[${size}px] h-[${size}px] flex justify-center items-center`}>
        <input
          type="radio"
          id={p.name}
          aria-label={p.title || p.name}
          className="peer absolute top-0 left-0 w-full h-full appearance-none bg-bc dark:bg-cbg border border-bf rounded-full cursor-pointer"
          {...p}
        />
        <span
          className={`box-content w-[${checkSize}px] h-[${checkSize}px] border-0 border-${color} rounded-full peer-checked:border-[${checkBorder}px] duration-150`}></span>
      </div>
      {children && <span className="mx-1">{children}</span>}
    </label>
  );
}

export function RadioCard({ Tag = "label", children, cls, ...p }) {
  return (
    <Tag className={`relative w-1/2 md:w-44 h-24 bg-cbg rounded-lg card cd_hr ${cls || ""}`}>
      <input
        type="radio"
        aria-label={p.title || p.name}
        className="absolute top-0 left-0 w-full h-full appearance-none border-pc bg-[rgb(0,0,0,0.1)] dark:bg-blur checked:bg-[transparent] dark:checked:bg-[transparent] checked:border-4 rounded-lg fs"
        {...p}
      />
      {children}
    </Tag>
  );
}

export function InputField({ cls, inCls, ...p }) {
  return (
    <label htmlFor={p.name} className={"block " + cls}>
      <span className="sr-only">{p.title || p.name}</span>
      <input
        id={p.name}
        placeholder={p.title || p.name}
        aria-label={p.title || p.name}
        className={`block peer w-full bg-cbg appearance-none border border-bc px-3 py-2 card cd_hr fs ${
          inCls || "rounded-md"
        }`}
        {...p}
      />
      {/* <p className="absolute -top-5 pl-2 bg-lbg black h-0 peer-invalid:h-auto text-red text-sm">
          Please provide a valid email address.
        </p> */}
    </label>
  );
}
