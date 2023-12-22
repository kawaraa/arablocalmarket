import getMetadata from "../../metadata";
import Footer from "../../(layout)/footer";
import Link from "next/link";

export default function Sitemap({ params }) {
  const lang = params.lang;

  return (
    <>
      <section className="min-h-[75vh] max-w-4xl mx-auto mb-24 pt-10 px-2">
        <h1 className="text-3xl font-semibold mt-8 mb-3">{content.h1[lang]}</h1>
        <ul className="flex flex-wrap">
          {content.links.map((link, i) => (
            <li className="min-w-[200px] my-3 text-link underline underline-offset-8" key={i}>
              <Link href={link.href.replace("lang", lang)} className="">
                {link[lang]}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Footer lang={lang} />
    </>
  );
}

export function generateMetadata({ params }) {
  const lang = params.lang;
  return getMetadata({ lang, title: content.h1[lang] + " - ALM" });
}

const content = {
  h1: { en: "Sitemap", ar: "خريطة الموقع" },
  links: [
    { en: "Homepage", ar: "الصفحة الرئيسية", href: "/" },
    { en: "Stores nearby", ar: "المتاجر القريبة", href: "/store" },
    { en: "Pricing", ar: "أسعار الاشتراكات", href: "/lang/pricing" },
    { en: "About us", ar: "لمحة عنا", href: "/lang/about" },
    { en: "How to install", ar: "كيفية تثبيت التطبيق", href: "/lang/how-to-install" },
    { en: "Make money", ar: "جني المال", href: "/lang/make-money" },
    { en: "Help", ar: "المساعدة", href: "/lang/help" },
    { en: "Contact us", ar: "اتصل بنا", href: "/contact" },
    { en: "Privacy policy", ar: "سياسة الخصوصية", href: "/lang/privacy-policy" },
    { en: "Shopping cart", ar: "عربة التسوق", href: "/cart" },
    { en: "Favorite products", ar: "المنتجات المفضلة", href: "/cart?tab=favorite" },
    // { en: "Admin dashboard", ar: "لوحة تحكم المشرف", href: "/admin" },
    { en: "My orders", ar: "طلباتي", href: "/order" },
    { en: "My Stores", ar: "متاجري", href: "/admin/store" },
    { en: "New store", ar: "متجر جديد", href: "/admin/new-store" },
    { en: "Clients", ar: "العملاء", href: "/admin/client" },
    { en: "Settings", ar: "إعدادات", href: "/settings" },
    { en: "Signin", ar: "تسجيل الدخول", href: "/signin" },
    { en: "Sign up", ar: "إنشاء حساب", href: "/signup" },
    { en: "Forgot password", ar: "نسيت كلمة السر", href: "/forgot-password" },
    // { en: "", ar: "", href: "" },
  ],
};
