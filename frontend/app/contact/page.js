import { cookies } from "next/headers";
import Footer from "../(layout)/footer";

export default function Contact({ searchParams }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";

  return (
    <>
      <section className="max-w-4xl mx-auto mb-20 pt-10 px-2">
        <h1 className="text-2xl font-bold mt-8 mb-3">{content.h1[lang]}</h1>

        <div>
          <p>Technical issue</p>
          <p>Suggest new feature</p>
        </div>
      </section>

      <Footer lang={lang} />
    </>
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

const content = { h1: { en: "Contact", ar: "تواصل" } };
