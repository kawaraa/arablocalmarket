import { cookies } from "next/headers";
import Link from "next/link";
import { getCssDelay } from "./(service)/functions";
import Footer from "./(layout)/footer";
import content from "./page.json";
import SvgIcon from "./(component)/(styled)/svg-icon";

export default function LandingPage({ searchParams }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";

  return (
    <>
      <section className="absolute inset-0 h-[100vh] w-full bg-hpbg dark:bg-dbg border-b border-b-2 border-b-bc">
        <div
          className="relative h-1/3 md:h-1/2 mt-24 md:mt-16 md:pt-6 md:w-2/3 mx-auto rounded-xl bg-d-c-bg lazy-c"
          style={{
            ...getCssDelay(),
            backgroundImage: "url('img/a.png')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}>
          <div className="absolute inset-0 w-ful dark:bg-[#0000001a]"></div>

          {/* text-gradient-to-b from-pc to-c */}
          <h1 className="mt-5 mx-6 sm:mx-20 md:mx-4 text-xl md:text-3xl mt-0 mb-5 text-left font-bold">
            {content.h1.text[lang]} <span className="sr-only">{content.h1.hidden[lang]}</span>
          </h1>

          <p className="mb-10 px-3 opacity-0">
            Look for a nearby store or supermarket, Select and add the products you need to the cart, Select
            the payment method you like, checkout and let the store deliver you order to you.
          </p>
        </div>

        <article dir="auto" className="relative text-center top-0 px-4 pt-6 md:pt-3 w-full">
          <p className="text-md text-center font-medium lazy-c" style={getCssDelay()}>
            {content.h1P[lang]}
          </p>

          <h2 className="text-lg mt-10 md:mt-3 mb-6 md:mb-3 font-bold lazy-c" style={getCssDelay()}>
            {content.h2[lang]}
          </h2>

          <Link
            href="/store"
            className="inline-flex justify-center px-3 py-1 text-sm bg-dbg dark:bg-pc text-dt dark:text-t rounded-full md:px-4 md:py-2 font-medium shadow-md border border-bc hover:border-bf hover:bg-pc dark:hover:bg-lbg hover:text-t duration-200 lazy-c"
            style={getCssDelay()}>
            Find a store to order from
          </Link>

          <a href="#section2" className="block w-10 mt-14 md:mt-8 mx-auto hover:text-dbg animate-bounce">
            <SvgIcon name="arrowDownInCircle" />
          </a>
        </article>
      </section>

      <section id="section2" className="mt-[100vh] text-center">
        <h3 className="text-lg mt-5 mb-3 font-bold lazy-c" style={getCssDelay()}>
          {content.h3[lang]}
        </h3>
        <p className="text-lg my-5 mb-3 lazy-c" style={getCssDelay()}>
          {content.h3P[lang]}
        </p>

        <Link
          href="/join"
          className="inline-block text-sm bg-dbg text-dt px-2 rounded-full duration-200 hover:opacity-50 hover:shadow-xl lazy-c"
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
