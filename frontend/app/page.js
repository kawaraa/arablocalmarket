import { cookies } from "next/headers";
import Link from "next/link";
import { extractLang, getCssDelay } from "./(service)/utilities";
import Footer from "./(layout)/footer";
import SvgIcon from "./(component)/(styled)/svg-icon";
import CheckUser from "./(component)/check-user";
import Image from "next/image";

export default async function HomePage({ params, searchParams }) {
  const cookieStore = cookies();
  const lang = extractLang(params, searchParams, cookieStore.get("lang")?.value);

  return (
    <>
      <CheckUser />
      <article className="min-h-[calc(100vh-55px)] w-full flex flex-col dark:bg-dbg">
        <div
          className="relative flex-auto mt-12 mb-5 -mx-1 sm:-mx-2 md:-mx-4 lg:-mx-6 xl:max-w-4xl xl:mx-auto bg-[url(/img/home-page-image.svg)] bg-contain bg-no-repeat bg-center lazy-b"
          style={{ ...getCssDelay() }}>
          <h1 className="-mt-8 sm:mt-0 mx-6 sm:mx-20 md:mx-4 text-xl md:text-3xl mb-5 text-left font-bold">
            {content.h1[lang]} <span className="sr-only">{content.h1Hidden[lang]}</span>
          </h1>

          <p className="px-3 opacity-0">{content.h1PHidden[lang]}</p>
        </div>

        <div dir="auto" className="relative text-center px-4 w-full">
          <p className="text-md text-center font-medium lazy-l" style={getCssDelay()}>
            {content.h1P[lang][0]}
          </p>
          <p className="text-md text-center font-medium lazy-l" style={getCssDelay()}>
            {content.h1P[lang][1]}
          </p>

          <p className="text-lg mt-6 md:mt-3 mb-6 md:mb-3 font-bold lazy-r" style={getCssDelay()}>
            {content.h1P2[lang]}
          </p>

          <Link passHref legacyBehavior hrefLang={lang} href="/store">
            <a
              className="inline-flex justify-center px-4 py-2 text-sm bg-pc text-t bg-gradient-to-tl hover:from-bg9 rounded-full md:px-4 md:py-2 font-medium shadow-md duration-200 lazy-b"
              style={getCssDelay()}>
              {content.findStoreLink[lang]}
            </a>
          </Link>

          <a
            href="#section2"
            title={content.readMore[lang]}
            aria-label={content.readMore[lang]}
            className="block w-10 mt-8 mx-auto animate-bounce">
            <span className="sr-only">{content.readMore[lang]}</span>
            <SvgIcon name="arrowDownInCircle" />
          </a>
        </div>
      </article>

      <div id="section2" className="h-12"></div>

      <section className="min-h-screen pt-14 pb-24 px-1 -mx-1 sm:-mx-2 md:-mx-4 lg:-mx-6 xl:-mx-8 text-dbg text-center bg-pc bg-gradient-to-tl from-bg9">
        <h2 className="text-3xl sm:text-4xl mb-4 font-bold mb-sm" style={getCssDelay()}>
          {content.h2[lang]} <span className="sr-only">{content.h2Hidden[lang]}</span>
        </h2>
        <p className="text-lg lazy-b" style={getCssDelay()}>
          {content.h2P[lang][0]}
        </p>
        <p className="text-lg lazy-b" style={getCssDelay()}>
          {content.h2P[lang][1]}
        </p>
        <p className="text-sm mt-3 lazy-b" style={getCssDelay()}>
          {content.h2P[lang][2]}
        </p>

        <h3 className="text-xl mt-8 mb-5 font-bold mb-sm lazy-b" style={getCssDelay()}>
          {content.stepsH[lang]}
        </h3>
        <ul className="mb-10 flex flex-wrap items-center justify-around">
          {content.steps.map((step, i) => (
            <li id={i + 1} className="mt-5 lazy-b" key={i}>
              <h4 className="font-semibold" style={getCssDelay()}>
                <span className="text-lg font-semibold">{i + 1} </span>
                {step[lang]}
              </h4>

              <div className="overflow-hidden w-[200px] h-[350px] mt-5 rounded-lg">
                {step.image.includes("video") ? (
                  <video
                    width="200"
                    height="350"
                    autoPlay
                    loop
                    controls
                    muted
                    playsInline
                    title={step.alt[lang]}
                    className="w-full h-auto">
                    <source src={step.image.replace("lang", lang)} type="video/mp4" />
                    {step.alt[lang]}
                  </video>
                ) : (
                  <Image
                    src={step.image.replace("lang", lang)}
                    width="200"
                    height="350"
                    alt={step.alt[lang]}
                    className="w-full h-full"
                  />
                )}
              </div>
            </li>
          ))}
        </ul>

        <p>{content.stepsP2[lang]}</p>

        <Link passHref legacyBehavior hrefLang={lang} href="/admin/store?tab=my">
          <a
            style={getCssDelay()}
            className="inline-block mt-3 px-6 py-3 text-lg bg-dbg text-bg rounded-full duration-200 hover:opacity-90 hover:shadow-xl lazy-b">
            {content.stepsLink[lang]}
          </a>
        </Link>
      </section>

      <section className="pt-12 px-1 mb-20 -mx-1 sm:-mx-2 md:-mx-4 lg:-mx-6 xl:-mx-8 text-center">
        <h4 className="text-xl mt-8 mb-8 font-bold">{content.storeOwnerVideoAd[lang].title}</h4>
        <div className="max-w-[700px] m-auto aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={content.storeOwnerVideoAd[lang].src}
            title={content.storeOwnerVideoAd[lang].alt}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen></iframe>
        </div>
      </section>

      <Footer lang={lang} />
    </>
  );
}

const content = {
  h1: { en: "Arab Local Market", ar: "السوق المحلي العربي" },
  h1Hidden: {
    en: "Create your online store and start selling Halal food products locally for free, Best local services Arabic Stores Supermarkets and Halal food near you",
    ar: "أنشئ متجرك على الإنترنت وابدأ في بيع منتجات الأطعمة الحلال محليًا مجانا، أفضل الخدمات محلية ومتاجر ومحلات سوبر ماركت العربية وأطعمة الحلال بالقرب منك",
  },
  h1P: {
    en: [
      "Welcome to the first Local Arabic Stores platform where you can look for Arabic stores and supermarkets nearby.",
      "Discover hundreds of unique stores in one place, a nice, easy and free Smartphone app for local services, groceries stores, markets and restaurants delivery at home",
    ],
    ar: [
      "مرحبًا بك في أول منصة متاجر عربية محلية حيث يمكنك البحث عن المتاجر العربية ومحلات السوبر ماركت القريبة.",
      "اكتشف المئات من المتاجر الفريدة في مكان واحد، تطبيق هاتف ذكي لطيف وسهل ومجاني الخدمات محلية والأسواق والمحلات التجارية والبقالة والمطاعم التي يتم توصيلها إلى المنزل",
    ],
  },
  h1PHidden: {
    en: "Look for local services, Grocery store or supermarket in your neighborhood, Select and add the products you need to the cart, Select the payment method you like, pay checkout and let the store deliver you order to you",
    ar: "ابحث عن خدمات محلية أو متجر أو سوبر ماركت قريب، حدد المنتجات التي تريدها وأضفها إلى سلة التسوق، وحدد طريقة الدفع التي تريدها، وقم بالدفع، ودع المتجر يقوم توصيل طلبك إليك",
  },
  h1P2: {
    en: "Look for local services, Grocery store or supermarket in your neighborhood",
    ar: "ابحث عن الخدمات المحلية أو محلات البقالة والسوبر ماركت في منطقتك",
  },
  findStoreLink: { en: "Find a store near you", ar: "ابحث عن متجر بالقرب منك" },
  // storeOwnerLink: { en: "I'm a store owner", ar: "أنا صاحب متجر" },
  readMore: {
    en: "Are you a store owner? Read more on how to create an online store and manage you the store inventory",
    ar: "هل انت صاحب محل؟ اقرأ المزيد حول كيفية إنشاء متجر على الانترنت وإدارة مخزون المتجر",
  },
  h2: { en: "Grow your local business here", ar: "نمي عملك المحلي هنا" },
  h2Hidden: {
    en: "Setup free online store Bring your store to the internet and start selling your products locally online for free",
    ar: "قم بإعداد متجر إلكتروني مجاني اجعل متجرك متاحًا على الانترنت وابدأ في بيع منتجاتك محليًا عبر الإنترنت مجانًا",
  },
  h2P: {
    en: [
      "Are you a store owner, You provide a local service or you have a grocery store and want to grow your business and make your customers happy?",
      "Then you are in the right place, We are here to help you grow and Manage your local business, and make it easy and fun",
      "No credit cared required, you can start rgiht away and free",
    ],
    ar: [
      "هل أنت صاحب متجر أو لديك متجر بقالة وترغب في تنمية عملك وجعل عملائك سعداء؟",
      "إذا أنت في المكان المناسب، نحن هنا لمساعدتك على تنمية أعمالك المحلية وإدارتها وجعلها سهلة وممتعة",
      "لا حاجة لبطاقة ائتمان مصرفية، يمكنك البدء على الفور ومجانيًا",
    ],
  },
  stepsH: {
    en: "Create your first store and set it up in 4 steps",
    ar: "أنشئ متجرك الأول وقم بإعداده في 4 خطوات",
  },
  steps: [
    // Enrol Flow.
    {
      en: "Signup",
      ar: "إنشاء حساب",
      image: "/img/step-1-lang.png",
      alt: {
        en: "Step 1 Create ArabLocalMarket account / signup",
        ar: "الخطوة 1 إنشاء حساب / تسجيل في ArabLocalMarket",
      },
    },
    {
      en: "Select a plan",
      ar: "حدد اشتراكًا",
      image: "/video/step-2-lang.mp4",
      alt: {
        en: "Step 2 Select a store plan from the available plan on ArabLocalMarket",
        ar: "الخطوة 2 حدد اشتراك للمتجر من الاشتراكات المتاحة على ArabLocalMarket",
      },
    },
    {
      en: "Create a store",
      ar: "أنشئ متجرً",
      image: "/video/step-3-lang.mp4",
      alt: {
        en: "Step 2 Create a store based on the plan you chose",
        ar: "الخطوة 2 قم بإنشاء متجر بناءً على الاشتراك التي اخترته",
      },
    },
    {
      en: "List your products",
      ar: "أضف منتجاتك",
      image: "/video/step-4-lang.mp4",
      alt: {
        en: "Step 2 List your products in the store you created",
        ar: "الخطوة 2 أضف منتجاتك إلى المتجر الذي أنشأته",
      },
    },
  ],
  stepsP2: {
    en: "Don't miss out Manage your local business for free, Create your first online store and start adding products and let your customers see the products you sell",
    ar: "لا تفوت إدارة أعمالك المحلية مجانًا, أنشئ متجرك الأول على الإنترنت وابدأ في إضافة المنتجات حتى يتمكن عملاؤك من رؤية المنتجات التي تبيعها",
  },
  stepsLink: { en: "Start free", ar: "ابدأ مجانا" },
  storeOwnerVideoAd: {
    en: {
      title: "Learn more about ArabLocalMarket",
      alt: "ArabLocalMarket - Create your online store and start selling products locally for free ",
      src: "https://www.youtube.com/embed/WMwmgPzlpNY?si=FR-bC99orjItfOW9",
    },
    ar: {
      title: "تعرف على المزيد حول السوق المحلي العربي ArabLocalMarket",
      alt: "السوق المحلي العربي - أنشئ متجرك على الإنترنت وابدأ في بيع منتجات محليًا مجانا - ArabLocalMarket",
      src: "https://www.youtube.com/embed/WMwmgPzlpNY?si=FR-bC99orjItfOW9",
    },
  },
};
