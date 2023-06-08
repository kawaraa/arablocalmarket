import { cookies } from "next/headers";
import Link from "next/link";
import { getCssDelay } from "./(service)/style-methods";
import Footer from "./(layout)/footer";
import SvgIcon from "./(component)/(styled)/svg-icon";
import CheckUser from "./(component)/check-user";
import Image from "next/image";

export default async function LandingPage({ params, searchParams }) {
  const cookieStore = cookies();
  let lang = (params?.lang || cookieStore.get("lang")?.value || searchParams?.lang)?.toLowerCase();
  if (!/en|ar/gim.test(lang)) lang = "en";

  return (
    <>
      <CheckUser />
      <section className="min-h-[calc(100vh-55px)] w-full flex flex-col dark:bg-dbg">
        <div
          className="relative mb-5 sm:mb-8 flex-auto mt-10 md:pt-6 mx-auto rounded-xl bg-[url(/img/landing-page.png)] bg-contain bg-no-repeat bg-center lazy-b"
          style={{ ...getCssDelay() }}>
          {/* <div className="absolute inset-0 w-ful dark:bg-[#0000001a]"></div> */}

          <h1 className="mx-6 sm:mx-20 md:mx-4 text-xl md:text-3xl mt-0 mb-5 text-left font-bold">
            {content.h1[lang]}. <span className="sr-only">{content.h1Hidden[lang]}</span>
          </h1>

          <p className="px-3 opacity-0">{content.h1PHidden[lang]}</p>
        </div>

        <article dir="auto" className="relative text-center px-4 w-full">
          <p className="text-md text-center font-medium lazy-l" style={getCssDelay()}>
            {content.h1P[lang]}
          </p>

          <h2 className="text-lg mt-10 md:mt-3 mb-6 md:mb-3 font-bold lazy-r" style={getCssDelay()}>
            {content.h2[lang]}
          </h2>

          <Link passHref legacyBehavior href="/store">
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
            <SvgIcon name="arrowDownInCircle" />
          </a>
        </article>
      </section>

      <div id="section2" className="h-12"></div>

      <section className="min-h-screen pt-14 pb-24 px-1 -mx-1 sm:-mx-2 md:-mx-4 lg:-mx-6 xl:-mx-8 text-dbg text-center bg-pc bg-gradient-to-tl from-bg9">
        <h3 className="text-3xl sm:text-4xl mb-4 font-bold mb-sm" style={getCssDelay()}>
          {content.h3[lang]}
        </h3>
        <p className="text-lg lazy-b" style={getCssDelay()}>
          {content.h3P[lang][0]}
        </p>
        <p className="text-lg lazy-b" style={getCssDelay()}>
          {content.h3P[lang][1]}
        </p>

        <h3 className="text-xl mt-10 mb-5 font-bold mb-sm lazy-b" style={getCssDelay()}>
          {content.stepsH[lang]}
        </h3>
        <ul className="mb-10 flex flex-wrap items-center justify-around">
          {content.steps.map((step, i) => (
            <li id={i + 1} className="mt-5 lazy-b" key={i}>
              <h4 className="font-semibold" style={getCssDelay()}>
                <span className="text-lg font-semibold">{i + 1} </span>
                {step[lang]}
              </h4>
              <div className="overflow-hidden h-80 mt-5 rounded-lg">
                <Image src={step.image} width="200" height="400" alt={step.alt} className="h-full" />
              </div>
            </li>
          ))}
        </ul>

        <Link passHref legacyBehavior href="/admin/store?tab=my">
          <a
            style={getCssDelay()}
            className="inline-block mt-3 px-6 py-3 text-lg bg-dbg text-bg rounded-full duration-200 hover:opacity-90 hover:shadow-xl lazy-b">
            {content.stepsLink[lang]}
          </a>
        </Link>
      </section>
      {/* 
        <p>Todo: Here should show what the app can do for you, the App features and how to use it.</p>
        <p>Some images, GIFTs and videos </p> */}

      {/* <section>
        <h3 h3 className="text-3xl sm:text-4xl mb-4 font-bold mb-sm">
          Become Representative and start making money with us
        </h3>
      </section> */}
      <Footer lang={lang} />
    </>
  );
}

const content = {
  h1: { en: "Arab Local Market", ar: "السوق المحلي العربي" },
  h1Hidden: {
    en: "Arabic Stores Supermarkets near you Halal food around the world Create your store and start selling Halal food products online locally",
    ar: "المتاجر العربية سوبر ماركت بالقرب منك أطعمة حلال حول العالم أنشئ متجرك وابدأ في بيع منتجات الأطعمة الحلال عبر الإنترنت محليًا",
  },
  h1P: {
    en: "Welcome to the first Local Arabic Stores platform where you can look for Arabic stores or supermarkets nearby. Discover Hundreds of Unique Stores in One Place, a nice, easy and free Smartphone app for groceries markets and restaurants delivery at home",
    ar: "مرحبًا بك في أول منصة متاجر عربية محلية حيث يمكنك البحث عن المتاجر العربية ومحلات السوبر ماركت القريبة. اكتشف المئات من المتاجر الفريدة في مكان واحد، تطبيق هاتف ذكي لطيف وسهل ومجاني لأسواق والبقالة والمطاعم التي يتم توصيلها إلى المنزل",
  },
  h1PHidden: {
    en: "Look for a nearby store or supermarket, Select and add the products you need to the cart, Select the payment method you like, checkout and let the store deliver you order to you",
    ar: "ابحث عن متجر أو سوبر ماركت قريب ، حدد المنتجات التي تريدها وأضفها إلى سلة التسوق ، وحدد طريقة الدفع التي تريدها ، وقم بتسجيل الخروج ، ودع المتجر يقوم بتسليم طلبك إليك",
  },
  h2: {
    en: "Find an Arabic Store and Supermarket near you.",
    ar: "ابحث عن متجر عربي وسوبر ماركت بالقرب منك.",
  },
  findStoreLink: { en: "Find a store to order from", ar: "ابحث عن متجر للطلب منه" },
  h3: { en: "Grow your business here", ar: "نمي عملك هنا" },
  h3P: {
    en: [
      "Are you a store owner or you have a grocery store and want to grow your business?",
      "Then you are in the right place, We are here to help you grow and manage your business and make it easy and fun.",
    ],
    ar: [
      "هل أنت صاحب متجر أو لديك متجر بقالة وترغب في تنمية عملك؟",
      "إذا أنت في المكان المناسب، نحن هنا لمساعدتك على تنمية أعمالك وإدارتها وجعلها سهلة وممتعة.",
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
      image: "/img/step-1.png",
      alt: {
        en: "Step 1 Create ArabLocalMarket account / signup",
        ar: "الخطوة 1 إنشاء حساب / تسجيل في ArabLocalMarket",
      },
    },
    {
      en: "Select a plan",
      ar: "حدد اشتراكًا",
      image: "/img/step-2.gif",
      alt: {
        en: "Step 2 Select a store plan from the available plan on ArabLocalMarket",
        ar: "الخطوة 2 حدد اشتراك للمتجر من الاشتراكات المتاحة على ArabLocalMarket",
      },
    },
    {
      en: "Create a store",
      ar: "أنشئ متجرً",
      image: "/img/step-3.gif",
      alt: {
        en: "Step 2 Create a store based on the plan you chose",
        ar: "الخطوة 2 قم بإنشاء متجر بناءً على الاشتراك التي اخترته",
      },
    },
    {
      en: "List your products",
      ar: "أضف منتجاتك",
      image: "/img/step-4.gif",
      alt: {
        en: "Step 2 List your products in the store you created",
        ar: "الخطوة 2 أضف منتجاتك إلى المتجر الذي أنشأته",
      },
    },
  ],
  stepsLink: { en: "Start free", ar: "ابدأ مجانا" },
  readMore: {
    en: "Read more on how to create a store and manage you the store inventory",
    ar: "اقرأ المزيد حول كيفية إنشاء متجر وإدارة مخزون المتجر",
  },
};
