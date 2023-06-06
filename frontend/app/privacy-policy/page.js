import { cookies } from "next/headers";
import Footer from "../(layout)/footer";
import Article from "../(component)/article";

export default function PrivacyPolicy({ searchParams }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";

  return (
    <>
      <section className="max-w-4xl mx-auto pt-10">
        <h1 className="my-10 text-center text-4xl sm:text-5xl font-extrabold">{content.title[lang]}</h1>
        <p className="text-center text-sm mb-5">{content.updated[lang]}</p>

        <p>
          {content.declare[lang][0]}.
          <br />
          {content.declare[lang][1]}.
        </p>

        {content.articles.map((a) => (
          <Article lang={lang} article={a} />
        ))}
      </section>

      <Footer lang={lang} />
    </>
  );
}

const content = {
  title: { en: "Privacy policy", ar: "سياسة الخصوصية" },
  updated: { en: "Last updated on November 2, 2023", ar: "تم التحديث الأخير في 2 نوفمبر 2023" },
  declare: {
    en: [
      'This privacy policy ("Policy") describes how ArabLocalMarket Labs Inc. ("ArabLocalMarket","we", "us" or "our") collects, protects and uses the personally identifiable information ("Personal Information") you ("User", "you" or "your") may provide through the ArabLocalMarket website (arablocalmarket.com) or in in the course of subscripting to any ArabLocalMarket Store Plan (Plan, Subscription)',
      "The Policy also describes the choices available to you regarding our use of your Personal Information and how you can access and update this information. This Policy does not apply to the practices of companies that we do not own or control, or to individuals that we do not employ or manage",
    ],
    ar: [
      'تصف سياسة الخصوصية هذه ("السياسة") كيف تقوم شركة ArabLocalMarket Labs Inc. ("ArabLocalMarket" أو "نحن" أو "نحن" أو "خاصتنا") بجمع وحماية واستخدام معلومات التعريف الشخصية ("المعلومات الشخصية") أنت ("المستخدم "،" أو "أنت" أو "الخاص بك") من خلال موقع ArabLocalMarket (arablocalmarket.com) أو في سياق الاشتراك في أي خطة متجر ArabLocalMarket (خطة ، اشتراك)',
      "توضح السياسة أيضًا الخيارات المتاحة لك فيما يتعلق باستخدامنا لمعلوماتك الشخصية وكيف يمكنك الوصول إلى هذه المعلومات وتحديثها. لا تنطبق هذه السياسة على ممارسات الشركات التي لا نملكها أو نتحكم فيها ، أو على الأفراد الذين لا نوظفهم أو نديرهم",
    ],
  },
  articles: [
    {
      h: { en: "Collection of personal information", ar: "" },
      p: { en: [""], ar: [""] },
    },
    {
      h: { en: "Collection of non-personal information", ar: "" },
      p: { en: [""], ar: [""] },
    },
    {
      h: { en: "Purchases", ar: "" },
      p: { en: [""], ar: [""] },
    },
    {
      h: { en: "Managing personal information", ar: "" },
      p: { en: [""], ar: [""] },
    },
    {
      h: { en: "Use and processing of collected information", ar: "" },
      p: { en: [""], ar: [""] },
    },
    {
      h: { en: "Information transfer and storage", ar: "" },
      p: { en: [""], ar: [""] },
    },
    {
      h: { en: "The rights of users", ar: "" },
      p: { en: [""], ar: [""] },
    },
    {
      h: { en: "Privacy of children", ar: "" },
      p: { en: [""], ar: [""] },
    },
    {
      h: { en: "Cookies", ar: "" },
      p: { en: [""], ar: [""] },
    },
    {
      h: { en: "Links to other websites", ar: "" },
      p: { en: [""], ar: [""] },
    },
    {
      h: { en: "Information security", ar: "" },
      p: { en: [""], ar: [""] },
    },
    {
      h: { en: "Data breach", ar: "" },
      p: { en: [""], ar: [""] },
    },
    {
      h: { en: "Legal disclosure", ar: "" },
      p: { en: [""], ar: [""] },
    },
    {
      h: { en: "Changes and amendments / Changelogs", ar: "" },
      p: { en: [""], ar: [""] },
    },
    {
      h: { en: "Acceptance of this policy", ar: "" },
      p: { en: [""], ar: [""] },
    },
    {
      h: { en: "Contacting us", ar: "" },
      p: { en: [""], ar: [""] },
    },
  ],
};
