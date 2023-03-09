import SvgIcon from "./svg-icon";

export function Radio({ name, onCheck, required, title, size = "20", color = "red" }) {
  const id = "id-r-" + Math.random();
  const checkSize = Math.round(+size / 3);
  const checkBorder = Math.round(+size / 5);

  return (
    <label htmlFor={id} className={`relative w-[${size}px] h-[${size}px] flex justify-center items-center`}>
      <input
        type="radio"
        name={name}
        id={id}
        onChange={onCheck}
        required={required}
        title={title || name}
        aria-label={title || name}
        className="peer absolute top-0 left-0 w-full h-full appearance-none bg-bc dark:bg-cbg border border-bf rounded-full cursor-pointer"
      />
      <span
        className={`box-content w-[${checkSize}px] h-[${checkSize}px] border-0 border-${color} rounded-full peer-checked:border-[${checkBorder}px] duration-150`}></span>
    </label>
  );
}

export function RadioCard({ children, name, onCheck, required, title, cls, ...p }) {
  return (
    <p.tag className={`relative w-1/2 md:w-44 h-32 bg-cbg space-y-3 rounded-lg card cd_hr ${cls || ""}`}>
      <input
        type="radio"
        name={name}
        onChange={onCheck}
        required={required}
        title={title || name}
        aria-label={title || name}
        className="absolute top-0 left-0 w-full h-full appearance-none border-pc bg-[rgb(0,0,0,0.1)] dark:bg-blur checked:bg-[transparent] dark:checked:bg-[transparent] checked:border-4 rounded-lg"
      />
      {children}
    </p.tag>
  );
}
