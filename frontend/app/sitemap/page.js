import { cookies } from "next/headers";
import Footer from "../(layout)/footer";
import Link from "next/link";

export default function Sitemap({ searchParams }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";

  return (
    <>
      <section className="max-w-4xl mx-auto mb-32 pt-10 px-2">
        <h1 className="text-2xl font-bold mt-8 mb-3">{content.h1[lang]}</h1>
        <ul className="flex flex-wrap">
          {content.links.map((link, i) => (
            <li className="min-w-[200px] my-3 text-pc2 underline underline-offset-8" key={i}>
              <Link href={link.href} className="">
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

export async function generateMetadata({ params, searchParams }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";
  return {
    title: content.h1[lang] + " - ALM",
    // description: content.desc[lang],
  };
}

const content = {
  h1: { en: "Sitemap", ar: "خريطة الموقع" },
  links: [
    { en: "Homepage", ar: "الصفحة الرئيسية", href: "/" },
    { en: "Pricing", ar: "أسعار الاشتراكات", href: "/pricing" },
    { en: "About us", ar: "معلومات عنا", href: "/about" },
    { en: "Help", ar: "المساعدة", href: "/help" },
    { en: "Contact us", ar: "اتصل بنا", href: "/contact" },
    { en: "Privacy policy", ar: "سياسة الخصوصية", href: "/privacy-policy" },
    { en: "Signin", ar: "تسجيل الدخول", href: "/signin" },
    { en: "Sign up", ar: "إنشاء حساب", href: "/signup" },
    { en: "Stores nearby", ar: "المتاجر القريبة", href: "/store" },
    { en: "Shopping cart", ar: "عربة التسوق", href: "/cart" },
    { en: "Favorite products", ar: "المنتجات المفضلة", href: "/cart?tab=favorite" },
    // { en: "Admin dashboard", ar: "لوحة تحكم المشرف", href: "/admin" },
    { en: "My orders", ar: "طلباتي", href: "/order" },
    { en: "My Stores", ar: "متاجري", href: "/admin/store" },
    { en: "New store", ar: "متجر جديد", href: "/admin/new-store" },
    { en: "Clients", ar: "العملاء", href: "/admin/client" },
    { en: "Settings", ar: "إعدادات", href: "/settings" },
    { en: "Forgot password", ar: "هل نسيت كلمة السر", href: "/forgot-password" },
    // { en: "", ar: "", href: "" },
  ],
};
