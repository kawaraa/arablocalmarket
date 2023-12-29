import { getCssDelay } from "../../(service)/utilities";
import Footer from "../../(layout)/footer";

export default function HowToInstall({ params }) {
  const lang = params.lang;

  return (
    <>
      <h1 className="text-center mt-10 leading-10">
        <span className="text-2xl sm:text-3xl text-center font-bold">{content.h1[lang][0]}</span>
        <br />
        <span className="">{content.h1[lang][1]}</span>
      </h1>

      <p className="mb-10 text-center lazy-b" style={getCssDelay()}>
        {content.h1P[lang]}
      </p>

      <section className="flex flex-wrap mb-24">
        <article className="w-1/1 sm:w-1/2 px-3 text-center">
          <h2 className="mb-3 font-semibold lazy-b" style={getCssDelay()}>
            {content.android.h[lang]}
          </h2>
          <video
            width="200"
            height="350"
            controls
            muted
            title={content.android.h[lang]}
            className="block mx-auto rounded-lg lazy-b"
            style={getCssDelay()}>
            <source src={content.android.video.replace("xxx", lang)} type="video/mp4"></source>
            {content.android.h[lang]}
          </video>
        </article>

        <article className="w-1/1 sm:w-1/2 px-3 text-center">
          <h2 className="mb-3 font-semibold lazy-b" style={getCssDelay()}>
            {content.iphone.h[lang]}
          </h2>
          <video
            width="200"
            height="350"
            controls
            muted
            title={content.iphone.h[lang]}
            className="block mx-auto rounded-lg  lazy-b"
            style={getCssDelay()}>
            <source src={content.iphone.video.replace("xxx", lang)} type="video/mp4"></source>
            {content.iphone.h[lang]}
          </video>
        </article>
      </section>

      <Footer lang={lang} />
    </>
  );
}

export function generateMetadata({ params: { lang } }) {
  return { title: content.h1[lang].join(" ") };
}

const content = {
  h1: {
    en: ["How to install ArabLocalMarket App?", "Install on Android, Iphone and Tablet devices"],
    ar: [
      "كيفية تنزيل وتثبيت برنامج السوق المحلي العربي (ArabLocalMarket)",
      "التنزيل والتثبيت على أجهزة الاندرويد والايفون والأجهزة لوحية",
    ],
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
      ar: "مقطع فيديو حول كيفية تثبيت التطبيق على نظام الاندرويد (Android)",
    },
    video: "/video/install-on-android-xxx.mp4",
  },
  iphone: {
    h: {
      en: "Here is a video on how you can install the app on Iphone",
      ar: "مقطع فيديو حول كيفية تثبيت التطبيق على الايفون (Iphone)",
    },
    video: "/video/install-on-iphone-xxx.mp4",
  },
};
