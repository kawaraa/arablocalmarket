import { getCssDelay } from "../../(service)/utilities";
import SectionImage from "./section-image";
import SectionList from "./section-list";

export default function Section({ children, heading, image, p, list, level }) {
  const HTag = ["h2", "h3", "h4", "h5", "h6"].find((h) => h.includes(level));
  const hCls = ["", "", "text-xl sm:text-2xl", "text-lg sm:text-xl", "sm:text-lg"][+level] || "";
  const sectionPadding = ["", "", "", "px-3", "px-5", "px-7"][+level] || "";

  return (
    <section className={sectionPadding}>
      <HTag className={`mt-5 mb-2 ${hCls} font-semibold lazy-r`} style={getCssDelay()}>
        {heading}
      </HTag>
      <SectionImage
        {...image}
        alt={heading}
        cls="overflow-hidden h-[30%] text-center lazy-r"
        style={getCssDelay()}
      />
      <p className="overflow-hidden whitespace-pre-line lazy-l" style={getCssDelay()}>
        {p}
      </p>
      <SectionList list={list} cls="mt-3 lazy-b" style={getCssDelay()} />
      {children}
    </section>
  );
}
