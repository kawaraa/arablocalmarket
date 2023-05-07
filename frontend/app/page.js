import { cookies } from "next/headers";
import Link from "next/link";
import { getCssDelay } from "./(service)/style-methods";
import Footer from "./(layout)/footer";
import SvgIcon from "./(component)/(styled)/svg-icon";
import CheckUser from "./(component)/check-user";

export default async function LandingPage({ params, searchParams }) {
  const cookieStore = cookies();
  let lang = (params?.lang || cookieStore.get("lang")?.value || searchParams?.lang)?.toLowerCase();
  if (!/en|ar/gim.test(lang)) lang = "en";

  return (
    <>
      <CheckUser />
      <section className="absolute inset-0 h-[100vh] w-full bg-hpbg dark:bg-dbg border-b border-b-2 border-b-bc">
        <div
          className="relative h-1/3 md:h-1/2 mt-24 md:mt-16 md:pt-6 md:w-2/3 mx-auto rounded-xl bg-d-c-bg lazy-b"
          style={{
            ...getCssDelay(),
            backgroundImage: "url('/img/landing-page.png')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}>
          <div className="absolute inset-0 w-ful dark:bg-[#0000001a]"></div>

          <h1 className="mt-5 mx-6 sm:mx-20 md:mx-4 text-xl md:text-3xl mt-0 mb-5 text-left font-bold">
            {content.h1.text[lang]} <span className="sr-only">{content.h1.hidden[lang]}</span>
          </h1>

          <p className="mb-10 px-3 opacity-0">
            Look for a nearby store or supermarket, Select and add the products you need to the cart, Select
            the payment method you like, checkout and let the store deliver you order to you.
          </p>
        </div>

        <article dir="auto" className="relative text-center top-0 px-4 pt-6 md:pt-3 w-full">
          <p className="text-md text-center font-medium lazy-l" style={getCssDelay()}>
            {content.h1P[lang]}
          </p>

          <h2 className="text-lg mt-10 md:mt-3 mb-6 md:mb-3 font-bold lazy-r" style={getCssDelay()}>
            {content.h2[lang]}
          </h2>

          <Link
            passHref
            href="/store"
            className="inline-flex justify-center px-4 py-2 text-sm bg-pc text-t bg-gradient-to-tl hover:from-pc2  rounded-full md:px-4 md:py-2 font-medium shadow-md duration-200 lazy-b"
            style={getCssDelay()}>
            {content.findStoreLink[lang]}
          </Link>

          <a
            href="#section2"
            title={content.readMore[lang]}
            aria-label={content.readMore[lang]}
            className="block w-10 mt-14 md:mt-8 mx-auto hover:text-dbg animate-bounce">
            <SvgIcon name="arrowDownInCircle" />
          </a>
        </article>
      </section>

      <section id="section2" className="mt-[100vh] text-center">
        <h3 className="text-lg mt-5 mb-3 font-bold lazy-b" style={getCssDelay()}>
          {content.h3[lang]}
        </h3>
        <p className="text-lg my-5 mb-3 lazy-b" style={getCssDelay()}>
          {content.h3P[lang]}
        </p>

        <Link
          passHref
          href="/join"
          className="inline-block text-sm bg-dbg text-dt px-2 rounded-full duration-200 hover:opacity-50 hover:shadow-xl lazy-b"
          style={getCssDelay()}>
          {content.h3Link[lang]}
        </Link>

        {/* <h4>Hello from landing page second section</h4>
        <p>Here we will show you what the app can do for you, the App features and how to use it.</p>
        <p>Some images, GIFTs and videos </p> */}
      </section>
      <Footer />
    </>
  );
}

const content = {
  h1: {
    text: { en: "Arab Local Market", ar: "السوق المحلي العربي" },
    hidden: {
      en: "Arabic Stores Supermarkets near you Halal food around the world Create your store and start selling Halal food products online locally.",
      ar: ".المتاجر العربية سوبر ماركت بالقرب منك أطعمة حلال حول العالم أنشئ متجرك وابدأ في بيع منتجات الأطعمة الحلال عبر الإنترنت محليًا",
    },
  },
  h1P: {
    en: "Welcome to the first Arabic Local Stores platform where you can look for Arabic stores or supermarkets nearby.",
    ar: "مرحبًا بك في أول منصة متاجر عربية محلية حيث يمكنك البحث عن المتاجر العربية ومحلات السوبر ماركت القريبة.",
  },
  h2: {
    en: "Find an Arabic Store and Supermarket near you.",
    ar: "ابحث عن متجر عربي وسوبر ماركت بالقرب منك.",
  },
  findStoreLink: { en: "Find a store to order from", ar: "ابحث عن متجر للطلب منه" },
  h3: {
    en: "Are you a store owner and you want to create a store to list your products?",
    ar: "هل أنت صاحب متجر وتريد إنشاء متجر لعرض منتجاتك؟",
  },
  h3P: {
    en: "Then you are in the right place, We are here to help you grow and manage your business and make it easy and fun.",
    ar: "فأنت في المكان المناسب، نحن هنا لمساعدتك على تنمية أعمالك وإدارتها وجعلها سهلة وممتعة.",
  },
  h3Link: {
    en: "Create a store",
    ar: "أنشئ متجرًا",
  },
  readMore: {
    en: "Read more on how to create a store and manage you the store inventory",
    ar: "اقرأ المزيد حول كيفية إنشاء متجر وإدارة مخزون المتجر",
  },
};
