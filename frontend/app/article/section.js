import SectionImage from "./section-image";
import SectionList from "./section-list";

export default function Section({ children, heading, image, p, list, level }) {
  const HTag = ["h2", "h3", "h4", "h5", "h6"].find((h) => h.includes(level));

  return (
    <section className="">
      <HTag className="mt-5 mb-2 leading-8 text-lg font-semibold">{heading}</HTag>
      <SectionImage {...image} alt={heading} cls="overflow-hidden h-[30%] text-center" />
      <pre className="overflow-hidden whitespace-pre-wrap">{p}</pre>
      <SectionList list={list} cls="mt-3" />
      {children}
    </section>
  );
}
