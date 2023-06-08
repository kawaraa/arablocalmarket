import Link from "next/link";

export default function Footer({ lang = "en" }) {
  return (
    <footer className="mx-auto w-full max-w-container pt-8 px-4 sm:px-6 lg:px-8">
      <h6 className="rounded-full mx-auto text-lg text-center">{content.h6[lang]}</h6>
      <p className="mt-5 text-center text-sm leading-6 text-slate-500">
        © 2023 ArabLocalMarket Inc. {content.rights[lang]}
      </p>

      {/* Todo: list Facebook and Youtube here E.g. https://tailwindui.com/components/marketing/sections/footers */}
      <div className="flex mt-10 justify-around">
        {content.linksGroup.map((g, i) => (
          <div className="" key={i}>
            <h6 className="text-base font-bold">{g.h[lang]}</h6>
            <ul className="mt-1 text-sm">
              {g.links.map((link, i) => (
                <li key={i}>
                  <Link passHref legacyBehavior href={link.path}>
                    <a className="inline-block my-2 hover:underline underline-offset-4 hover:text-black">
                      {link.text[lang]}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}

const content = {
  h6: { en: "Arab Local Market", ar: "السوق المحلي العربي" },
  rights: { en: "All rights reserved", ar: "كل الحقوق محفوظة" },
  linksGroup: [
    {
      h: { en: "We", ar: "نحن" },
      links: [
        { text: { en: "About", ar: "لمحة" }, path: "/about" },
        // { text: { en: "Investors", ar: "المستثمرون" }, path: "" },
        // { text: { en: "Press and Media", ar: "صحافة واعلام" }, path: "" },
        { text: { en: "Privacy policy", ar: "سياسة الخصوصية" }, path: "/privacy-policy" },
        {
          text: { en: "Terms and conditions", ar: "الأحكام والشروط" },
          path: "/privacy-policy/#terms-conditions",
        },
        { text: { en: "Changelog", ar: "التغييرات" }, path: "/privacy-policy/#changelog" },
      ],
    },
    {
      h: { en: "Support", ar: "الدعم" },
      links: [
        { text: { en: "Contact", ar: "تواصل" }, path: "/contact" },
        { text: { en: "Help", ar: "المساعدة" }, path: "/help" },
        // { text: { en: "Community", ar: "الجمهور" }, path: "/community" },
        { text: { en: "Sitemap", ar: "خريطة الموقع" }, path: "/sitemap" }, // https://www.shopify.com/sitemap
      ],
    },
    // {
    //   h: { en: "Products", ar: "المنتجات" },
    //   links: [{ text: { en: "Store", ar: "المتجر" }, path: "" }],
    // },
  ],
};
