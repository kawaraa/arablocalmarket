export const tdClass = "px-2 py-3 whitespace-nowrap";
export const trClass = "cursor-pointer border-b border-bc dark:border-lt";
export default function Table({ children, lang, header, cls = "", hCls = "" }) {
  const thCls = `px-2 py-3 whitespace-nowrap ${lang == "en" ? "text-left" : "text-right"} ${hCls}`;

  return (
    <div className={"overflow-x-auto mt-5 no-srl-bar " + cls}>
      <table className="table-auto w-full">
        {/* Table header */}
        <thead className="text-base font-semibold uppercase bg-lbg dark:bg-dcbg">
          <tr>
            {header.map((k, i) => (
              <th className={thCls} key={i}>
                {k}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table body */}
        <tbody className="">
          {/* Row */}
          {children}
        </tbody>
      </table>
    </div>
  );
}
