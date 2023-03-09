export function Radio({ name, onCheck, required, size = "20", color = "red" }) {
  const id = "id-" + Math.random();
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
        className="peer absolute top-0 left-0 w-full h-full appearance-none bg-bc dark:bg-cbg border border-bf rounded-full cursor-pointer"
      />
      <span
        className={`box-content w-[${checkSize}px] h-[${checkSize}px] border-0 border-${color} rounded-full peer-checked:border-[${checkBorder}px] duration-150`}></span>
    </label>
  );
}
