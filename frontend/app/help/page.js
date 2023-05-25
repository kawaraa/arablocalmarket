import { cookies } from "next/headers";

export default function Help({ searchParams }) {
  console.log("Help: >>>");
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";

  return (
    <section>
      <article>
        <h1>{content.h1[lang]}</h1>
      </article>
    </section>
  );
}

export async function generateMetadata({ params, searchParams }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";
  return {
    title: content.h1[lang] + " - ALM",
    // description: content.desc[lang],
  };
}

const content = {
  h1: { en: "Help", ar: "المساعدة" },
};
