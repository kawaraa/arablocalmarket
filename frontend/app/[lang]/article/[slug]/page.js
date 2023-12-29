import { notFound } from "next/navigation";
import getMetadata from "../../../metadata";
import { getCssDelay } from "../../../(service)/utilities";
import { serverRequest } from "../../../(service)/api-provider";
import Footer from "../../../(layout)/footer";
import SectionImage from "../section-image";
import Section from "../section";
import SectionList from "../section-list";
const extractQuery = (q) => q.replace(/arablocalmarket|السوق-المحلي-العربي|-/gim, " ").slice(0, 20);

export default async function Article({ params }) {
  const lang = params.lang;
  const slug = extractQuery(decodeURI(params.slug || "")).trim();

  const query = `?locale=${lang}&filters[$or][0][heading][$contains]=${slug}&filters[$or][1][p][$contains]=${slug}&populate[0]=image,list,sections&populate[1]=sections.image,sections.list,sections.subsections&populate[2]=sections.subsections.image,sections.subsections.list,sections.subsections.headings&populate[3]=sections.subsections.headings.image,sections.subsections.headings.list`;

  const data = await serverRequest("article", "GET", { query })
    .then((res) => res.data[0])
    .catch(() => null);
  if (!data?.id) return notFound();

  const { title, image, heading, p, list, sections } = data.attributes;
  const [visibleP, hiddenP] = p.split("::");

  return (
    <>
      <article className="mb-24">
        {image.data ? "" : <div className="h-10"></div>}
        <SectionImage {...image} alt={heading} cls="overflow-hidden max-w-xl h-[30vh] mx-auto text-center" />
        <h1 className="text-center my-5 text-2xl sm:text-3xl font-semibold">{heading}</h1>
        <p className="text-center leading-8 lazy-b">{visibleP}</p>
        <p className="sr-only">{hiddenP}</p>
        <SectionList list={list} cls="lazy-b" style={getCssDelay()} />
        <div className="h-10"></div>
        {sections.map((section, i) => (
          <Section {...section} level="2" key={i}>
            {section.subsections.map((subsection, i) => (
              <Section {...subsection} level="3" key={i}>
                {subsection.headings.map((heading, i) => (
                  <Section {...heading} level="4" key={i} />
                ))}
              </Section>
            ))}
          </Section>
        ))}
      </article>

      <Footer lang={lang} />
    </>
  );
}

export async function generateMetadata({ params }) {
  const lang = params.lang;
  const slug = (params.slug || "").split("-");
  const q = slug.reduce(
    (acc, word, i) =>
      acc +
      `&filters[$or][${i + i}][heading][$contains]=${word}&filters[$or][${i + 1}][p][$contains]=${word}`,
    ""
  );

  const query = `?locale=${lang}${q}&populate[0]=image,list,sections&populate[1]=sections.image,sections.list,sections.subsections&populate[2]=sections.subsections.image,sections.subsections.list,sections.subsections.headings&populate[3]=sections.subsections.headings.image,sections.subsections.headings.list`;

  const data = await serverRequest("article", "GET", { query })
    .then((res) => res.data[0])
    .catch(() => null);
  if (!data?.id) return {};

  const { title, keywords, heading, p } = data.attributes;
  return getMetadata({
    lang: params.lang,
    title: (title || heading) + " - ArabLocalMarket",
    description: p,
    keywords,
  });
}
