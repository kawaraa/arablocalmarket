import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { extractLang } from "../../(service)/utilities";
import { serverRequest } from "../../(service)/api-provider";
import SectionImage from "../section-image";
import Section from "../section";
import SectionList from "../section-list";

export default async function Article({ params, searchParams }) {
  const cookieStore = cookies();
  const lang = extractLang({}, searchParams, cookieStore.get("lang")?.value);

  console.log({ lang }, params);
  // /api/blogs?locale=ar&populate[0]=image,list,sections&populate[1]=sections.image,sections.list,sections.subsections&populate[2]=sections.subsections.image,sections.subsections.list,sections.subsections.headings&populate[3]=sections.subsections.headings.image,sections.subsections.headings.list

  const query = `?locale=${lang}&populate[0]=image,list,sections&populate[1]=sections.image,sections.list,sections.subsections&populate[2]=sections.subsections.image,sections.subsections.list,sections.subsections.headings&populate[3]=sections.subsections.headings.image,sections.subsections.headings.list`;

  const data = await serverRequest("blog", "GET", { query })
    .then((res) => res.data[0])
    .catch(() => null);
  if (!data?.id) return notFound();

  const { title, image, heading, p, list, sections } = data.attributes;

  return (
    <article className="">
      <SectionImage {...image} alt={heading} cls="overflow-hidden h-[30vh] text-center" />
      <h1 className="text-center my-5 leading-10 text-2xl sm:text-3xl">{heading}</h1>
      <p className="text-center leading-8">{p}</p>
      <SectionList list={list} />
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
  );
}

// export async function generateMetadata({ params }) {
//   const store = await serverRequest("store", "GET", { query: `/${params.storeId}${q}` })
//     .then((res) => res.data?.attributes)
//     .catch(() => null);
//   if (!store) return {};
//   return { title: store.name + " - ALM", description: store.about };
// }
