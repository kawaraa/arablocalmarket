"use client";
import { Cookies } from "./(service)/utilities";

export default function NotFound() {
  const lang = Cookies.get("lang") || "en";

  return (
    <article dir="auto" className="min-h-full text-center py-24 px-6 sm:py-32 lg:px-8">
      <h1 className="mt-4 font-semibold text-3xl">
        <span className="text-2xl">404</span>
        <br />
        <span>{content.h1[lang]}</span>
      </h1>
      <p className="mt-6">{content.p[lang]}</p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <a
          href={`/${lang}`}
          className="text-center ml-3 px-3 py-1 text-sm rounded-md lg:px-4 lg:py-2 bg-pc text-t bg-gradient-to-tl hover:from-pc2">
          {content.back[lang]}
        </a>
        <a href="/contact" className="font-medium  hover:text-bg9 duration">
          {content.contact[lang]} <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </article>
  );
}

const content = {
  h1: { en: "Page not found!", ar: "الصفحة غير موجودة!" },
  p: {
    en: "Sorry, we couldn't find the page you're looking for.",
    ar: "عذرًا، لم نتمكن من العثور على الصفحة التي تبحث عنها.",
  },
  back: { en: "Go back home", ar: "حاول ثانية" },
  contact: { en: "Contact support", ar: "حاول ثانية" },
};
