import { headers } from "next/headers";
import Cookies from "./(service)/cookies";
import Button from "./(component)/(styled)/button";
import Dropdown from "./(component)/(styled)/dropdown";
import Select from "./(component)/select";
import SelectList from "./(component)/select-list";
import Switch from "./(component)/switch";
import Breadcrumb from "./(component)/breadcrumb";
import ContextMenu from "./(component)/context-menu";
import Footer from "./(layout)/footer";
import content from "./page.json";
import icons from "./(component)/(styled)/icons";
import Link from "next/link";

export default function LandingPage(props) {
  const headersList = headers();
  const { lang, themeMode } = Cookies.parse(headersList.get("cookie"));

  return (
    <>
      <section className="absolute inset-0 h-[100vh] w-full p-g-bg">
        <div className="h-32 flex justify-center mt-24 mx-3 py-5 rounded-xl bg-d-c-bg lazy-c">
          <img src="/logo-with-letters.svg" />
        </div>

        <article dir="auto" className="relative top-0 px-4 pt-10 w-full">
          <h1 className="text-4xl md:text-5xl mt-0 mb-5 text-center lazy-c">
            {content.h1.text[lang]} <span className="sr-only">{content.h1.hidden[lang]}</span>
          </h1>
          <p className="text-md text-center lazy-c">{content.h1P[lang]}</p>

          <h2 className="text-xl mt-8 mb-3 text-center lazy-c">{content.h2[lang]}</h2>
          <div className="text-center lazy-c">
            <Link href="/store" className="inline-flex w-10 animate-bounce">
              {icons.arrowDownInCircle}
            </Link>
          </div>

          <h3 className="text-md mt-2 mb-3 text-center lazy-c">{content.h3[lang]}</h3>
          <div className="text-center lazy-c">
            <Link
              href="/join"
              className="bg-d-bg text-l-bg py-1 px-3 inline-flex rounded-full duration-200 hover:opacity-50  hover:shadow-xl ">
              {content.h3Link[lang]}
            </Link>
          </div>
          <p className="text-sm mt-2 text-center lazy-c">{content.h3P[lang]}</p>
        </article>
      </section>
      <section className="mt-[100vh]">
        <h4>Hello from landing page second section</h4>
        <p>Here we will show you what the app can do for you, the App features and how to use it.</p>
        <p>Some images, GIFTs and videos </p>
      </section>
      <Footer />
    </>
  );
}
