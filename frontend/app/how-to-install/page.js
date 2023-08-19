import { cookies } from "next/headers";

export default function HowToInstall({ params, searchParams }) {
  const cookieStore = cookies();
  let lang = (params?.lang || cookieStore.get("lang")?.value || searchParams?.lang)?.toLowerCase();
  if (!/en|ar/gim.test(lang)) lang = "en";

  return (
    <>
      <h1 className="text-3xl sm:text-4xl text-center font-bold mt-10 mb-5">{content.h1[lang]}</h1>

      <p className="lazy-b">{content.h1P[lang]}</p>

      <section>
        <article>
          <h2>{content.android.h[lang]}</h2>
          <video src={content.android.video}></video>
        </article>
        <article>
          <h2>{content.iphone.h[lang]}</h2>
          <video src={content.iphone.video}></video>
        </article>
      </section>
    </>
  );
}

const content = {
  h1: {
    en: "How to install ArabLocalMarket App on Android, Iphone and Tablet devices?",
    ar: "كيفية تنزيل وتثبيت برنامج السوق المحلي العربي (ArabLocalMarket) على أجهزة لوحية والاندرويد والايفون",
  },
  h1P: {
    en: [
      "ArabLocalMarket.com is built using the latest technology which makes it easy to install on any device directly from ArabLocalMarket.com in just one click",
    ],
    ar: [
      "تم تصميمه السوق المحلي العربي باستخدام أحدث التقنيات التي تجعل من السهل تثبيته على أي جهاز مباشرة من ArabLocalMarket.com بنقرة واحدة فقط",
    ],
  },
  android: {
    h: {
      en: "Here is a video on how you can install the app on Android",
      ar: "",
    },
    video: "",
  },
  iphone: {
    h: { en: "Here is a video on how you can install the app on Iphone", ar: "" },
    video: "",
  },
};
