export default function SectionList({ list, cls = "" }) {
  if (!list || !list[0]) return null;

  const listType = (list && list[0])?.style;
  const listStyles = ["list-[disc]", "list-[circle]", "list-[square]", "list-[lower-alpha]"];

  return (
    <ol className={`px-6 ${listStyles.find((c) => c.includes(listType)) || ""} ${cls}`}>
      {list.map((item, i) => (
        <li key={i}>{!item.link ? item.text : <a href={item.link}>{item.text}</a>}</li>
      ))}
    </ol>
  );
}
