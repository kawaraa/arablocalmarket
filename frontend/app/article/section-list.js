import Link from "next/link";
import { getCssDelay } from "../(service)/utilities";

export default function SectionList({ list, cls = "" }) {
  if (!list || !list[0]) return null;

  const listType = (list && list[0])?.style;
  const c = ["list-[disc]", "list-[circle]", "list-[square]", "list-[decimal]", "list-[lower-alpha]"];

  return (
    <ol className={`px-6 ${c.find((c) => c.includes(listType)) || ""} ${cls} lazy-b`} style={getCssDelay()}>
      {list.map((item, i) => (
        <li key={i}>
          {!item.link ? (
            item.text
          ) : (
            <Link href={item.link} className="underline underline-offset-4 hover:text-link">
              {item.text}
            </Link>
          )}
        </li>
      ))}
    </ol>
  );
}
