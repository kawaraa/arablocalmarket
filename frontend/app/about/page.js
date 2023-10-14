import { cookies } from "next/headers";
import { extractLang } from "../(service)/utilities";
import Footer from "../(layout)/footer";
import Article from "../(component)/article";

export default function About({ params, searchParams }) {
  const cookieStore = cookies();
  const lang = extractLang(params, searchParams, cookieStore.get("lang")?.value);

  return (
    <>
      <section className="max-w-4xl mx-auto mb-20 pt-10 px-2">
        <p className="my-10 text-center text-4xl font-extrabold sm:text-5xl">{content.title[lang]}</p>

        <h1 className="text-lg font-bold mt-8 mb-3">{content.h1[lang]}</h1>
        <p>{content.h1P[lang]}.</p>

        {content.articles.map((a, i) => (
          <Article lang={lang} article={a} key={i} />
        ))}
      </section>
      <Footer lang={lang} />
    </>
  );
}

export async function generateMetadata({ params, searchParams }) {
  const cookieStore = cookies();
  const lang = extractLang(params, searchParams, cookieStore.get("lang")?.value);
  return {
    title: content.h1[lang] + " - ALM",
    // description: content.desc[lang],
  };
}

const content = {
  title: { en: "About us", ar: "معلومات عنا" },
  h1: {
    en: "ArabLocalMarket is best solution for supermarket, grocery and small market stores",
    ar: "ArabLocalMarket هو أفضل حل للسوبر ماركت والبقالة والمتاجر الصغيرة",
  },
  h1P: {
    en: "The all-in-one local marketplace based e-commerce platform to start, run, and grow a business",
    ar: "السوق لمحلية المحلية التجارة الشاملة القائمة لبدء الأعمال التجارية وإدارتها وتنميتها",
  },
  articles: [
    {
      t: { en: "ArabLocalMarket story", ar: "قصة ArabLocalMarket" },
      h: {
        en: "The first ArabLocalMarket store was our own",
        ar: "أول ArabLocalMarket متجر كانت كان متجرنا",
      },
      p: {
        en: [
          "It all began in Jan 2023 when the owner was looking for an Arabic market to buy some Eastern and Halal food, then he realized that he can develop a Local Online Marketplace that help Arabic Community find food and other products easily",
          "So he built a solutions that gather all the Arabic eastern stores in one place and give them what they need",
          "Today, stores of all sizes can join ArabLocalMarket, whether they're selling online, in retail stores, or on-the-go",
        ],
        ar: [
          "بدأ كل شيء في يناير 2023 عندما كان المالك يبحث عن متاجر عربي لشراء بعض الأطعمة الشرقية والحلال، ثم أدرك أنه يمكنه تطوير سوق محلية على الإنترنت حيث تساعد المجتمع العربي في العثور على الطعام والمنتجات الأخرى بسهولة",
          "لذلك بنى حلولًا تجمع كل المتاجر العربية والشرقية في مكان واحد وتوفير لهم ما يحتاجونه",
          "اليوم ، يمكن للمتاجر من جميع الأحجام الانضمام إلى ArabLocalMarket ، سواء كانت تبيع عبر الإنترنت أو في متاجر البيع بالتجزئة أو أثناء التنقل",
        ],
      },
    },

    ,
    {
      t: { en: "Our mission", ar: "مهمتنا" },
      h: {
        en: "Making Markets, Groceries and other local stores reachable and easily for everyone",
        ar: "جعل الأسواق ومحلات البقالة والمتاجر المحلية الأخرى في متناول الجميع بسهولة",
      },
      p: {
        en: [
          "We help people find the nearest Supermarkets, Groceries and other Markets stores where they can either order or go and buy from",
          "We also believe the future of commerce has more voices, not fewer, so we're reducing the barriers to Market based business ownership to make better for everyone",
        ],
        ar: [
          "نحن نساعد الناس في العثور على أقرب محلات السوبر ماركت والبقالة ومتاجر الأسواق الأخرى حيث يمكنهم إما الطلب أو الذهاب والشراء منها",
          "نعتقد أيضًا أن مستقبل التجارة له المزيد من الأصوات ، وليس أقل ، لذلك نحن نعمل على تقليل الحواجز التي تحول دون ملكية الأعمال القائمة على السوق لجعلها أفضل للجميع",
        ],
      },
    },
    ,
    {
      t: { en: "Our commitment to sustainability", ar: "التزامنا بالاستدامة" },
      h: { en: "We're building a 100-year company", ar: "نحن نبني شركة مدتها 100 عام" },
      p: {
        en: "ArabLocalMarket builds for the long term, and that means investing in our planet so that we can future proof ArabLocalMarket and help our Clients future proof their businesses, too",
        ar: "يبني ArabLocalMarket على المدى الطويل ، وهذا يعني الاستثمار في كوكبنا حتى نتمكن من إثبات موقع ArabLocalMarket في المستقبل ومساعدة عملائنا في إثبات أعمالهم في المستقبل أيضًا",
      },
    },
  ],
};
