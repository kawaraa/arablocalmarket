import { cookies } from "next/headers";
const h2Cls = "text-lg font-bold mt-8 mb-3 text-l-tc";

export default function About({ searchParams }) {
  console.log("About: >>>");
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";

  return (
    <section className="pt-10">
      <p className="my-10 text-center text-4xl font-extrabold sm:text-5xl">{content.title[lang]}</p>

      <h1 className={h2Cls}>{content.h1[lang]}</h1>
      <p>{content.h1P[lang]}.</p>

      <article>
        <p>{content.story.t[lang]}</p>
        <h2 className={h2Cls}>{content.story.h[lang]}</h2>
        <p>
          {content.story.p[lang][0]}.
          <br />
          {content.story.p[lang][1]}.
          <br />
          {content.story.p[lang][2]}.
        </p>
      </article>

      <article>
        <p>{content.mission.t[lang]}</p>
        <h2 className={h2Cls}>{content.mission.h[lang]}</h2>
        <p>
          {content.mission.p[lang][0]}.
          <br />
          {content.mission.p[lang][1]}.
        </p>
      </article>

      <article>
        <p>{content.commitment.t[lang]}</p>
        <h2 className={h2Cls}>{content.commitment.h[lang]}</h2>
        <p>{content.commitment.p[lang]}.</p>
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
  title: { en: "About us", ar: "معلومات عنا" },
  // title: { en: "", ar: "" },
  h1: {
    en: "ArabLocalMarket is best solution for supermarket, grocery and small market stores",
    ar: "ArabLocalMarket هو أفضل حل للسوبر ماركت والبقالة والمتاجر الصغيرة",
  },
  h1P: {
    en: "The all-in-one local market based commerce platform to start, run, and grow a business",
    ar: "منصة التجارة الشاملة القائمة على السوق المحلية لبدء الأعمال التجارية وإدارتها وتنميتها",
  },
  story: {
    t: { en: "ArabLocalMarket story", ar: "قصة ArabLocalMarket" },
    h: { en: "The first ArabLocalMarket store was our own", ar: "أول ArabLocalMarket متجر كانت كان متجرنا" },
    p: {
      en: [
        "It all began in Jan 2023 when the owner was looking for an Arabic market to buy some Eastern and Halal food, then he realized that he can develop a platform that help Arabic Community find food and other products easily",
        "So he built a solutions that gather all the Arabic eastern markets in one place and give them what they need",
        "Today, markets of all sizes can ArabLocalMarket, whether they're selling online, in retail stores, or on-the-go",
      ],
      ar: [
        "بدأ كل شيء في يناير 2023 عندما كان المالك يبحث عن سوق عربي لشراء بعض الأطعمة الشرقية والحلال ، ثم أدرك أنه يمكنه تطوير منصة تساعد المجتمع العربي في العثور على الطعام والمنتجات الأخرى بسهولة",
        "لذلك بنى حلولًا تجمع كل الأسواق العربية الشرقية في مكان واحد وتعطيها ما يحتاجون إليه",
        "اليوم ، يمكن للأسواق بجميع أحجامها ArabLocalMarket ، سواء كانت تبيع عبر الإنترنت أو في متاجر البيع بالتجزئة أو أثناء التنقل",
      ],
    },
  },

  mission: {
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
  commitment: {
    t: { en: "Our commitment to sustainability", ar: "التزامنا بالاستدامة" },
    h: { en: "We're building a 100-year company", ar: "نحن نبني شركة مدتها 100 عام" },
    p: {
      en: "ArabLocalMarket builds for the long term, and that means investing in our planet so that we can future proof ArabLocalMarket and help our Clients future proof their businesses, too",
      ar: "يبني ArabLocalMarket على المدى الطويل ، وهذا يعني الاستثمار في كوكبنا حتى نتمكن من إثبات موقع ArabLocalMarket في المستقبل ومساعدة عملائنا في إثبات أعمالهم في المستقبل أيضًا",
    },
  },
};
