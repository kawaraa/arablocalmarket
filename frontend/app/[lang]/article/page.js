import Link from "next/link";
import { getCssDelay } from "../../(service)/utilities";
import Footer from "../../(layout)/footer";

export default function Articles({ params }) {
  const lang = params.lang;
  return (
    <>
      <section className="min-h-[75vh] max-w-4xl mx-auto mb-32 pt-10 px-2">
        <h1 className="my-5 text-2xl sm:text-3xl font-semibold">{content.h1[lang]}</h1>
        <ul className="flex flex-wrap">
          {content.list.map((item, i) => (
            <li
              className="w-full lg:w-auto lg:min-w-[45%] lg:max-w-[45%] m-3 lazy-b"
              style={getCssDelay()}
              key={i}>
              <Link
                href={item[lang].link}
                className="text-link text-lg py-[7px] underline underline-offset-8">
                {item[lang].text}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <Footer lang={lang} />
    </>
  );
}

export function generateMetadata({ params: { lang } }) {
  return { title: content.h1[lang] };
}

const content = {
  h1: { en: "Articles and Useful links", ar: "مقالات وروابط مفيدة" },
  list: [
    {
      en: { text: "What is ArabLocalMarket", link: "/en/article/What-is-arablocalmarket" },
      ar: { text: "ما هو السوق المحلي العربي", link: "/ar/article/ما-هو-السوق-المحلي-العربي" },
    },
    {
      en: {
        text: "Let you customers find your storefront",
        link: "/en/article/let-you-customers-find-your-storefront",
      },
      ar: {
        text: "تسهل لزبائنك العثور على متجرك المحلي",
        link: "/ar/article/تسهل-لزبائنك-العثور-على-متجرك-المحلي",
      },
    },
    {
      en: {
        text: "How to make money with arablocalmarket",
        link: "/en/article/how-to-make-money-with-arablocalmarket",
      },
      ar: {
        text: "كيف تربح المال من خلال السوق المحلي العربي",
        link: "/ar/article/كيف-تربح-المال-من-خلال-السوق-المحلي-العربي",
      },
    },
    // {
    //   en: { text: "", link: "/en/article/" },
    //   ar: { text: "", link: "/ar/article/" },
    // },
  ],
};
