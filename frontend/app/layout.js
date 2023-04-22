import AppSessionContextProvider from "./app-session-context";
import { cookies } from "next/headers";
import Navigation from "./(layout)/navigation";
import SelectLanguage from "./(component)/select-language";
import "./global.css";

// Todo: https://www.datocms.com/blog/dealing-with-nextjs-seo
export default function RootLayout({ children, searchParams }) {
  const cookieStore = cookies();
  const language = cookieStore.get("lang")?.value || searchParams?.lang;
  const lang = language || "en";
  const themeMode = cookieStore.get("themeMode")?.value || "auto";

  return (
    <html lang={lang} className={`scroll-smooth group ${themeMode}`}>
      <head>
        <title>{content.title[lang]}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="ArabLocalMarket" />
        <meta name="description" content={content.description[lang]} />
        <meta name="keywords" content={content.keywords[lang]} />
        <meta property="og:title" content={content.title[lang]} />
        <meta property="og:description" content={content.description[lang]} />
        <meta property="og:url" content="https://arablocalmarket.com" />
        <meta property="og:type" content="website" />

        {/* <!-- PAW Support --> */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png" />
        <link rel="shortcut icon" type="image/ico" sizes="48x48" href="/img/favicon.ico" />
        <link rel="apple-touch-icon" type="image/png" sizes="180x180" href="/img/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/img/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/img/android-chrome-512x512.png" />
        <meta name="apple-mobile-web-app-status-bar" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="background-color" content="#ffffff" />

        {/* <script src="https://cdn.tailwindcss.com"></script> */}
        <script src="/tailwind-css-script.js"></script>
        <script src="/config.js"></script>
      </head>
      <body
        className={`relative min-h-screen bg-bg dark:bg-dbg text-t dark:text-dt print:min-h-fit print:text-t ${
          lang == "ar" && "font-arabic"
        }`}>
        <AppSessionContextProvider language={lang} theme={themeMode}>
          <header>
            <Navigation />
          </header>
          <main
            className="min-h-screen pt-14 md:pt-16 px-1 sm:px-2 md:px-4 lg:px-6 xl:px-8 print:min-h-fit"
            dir="auto">
            {children}
            {!language && <SelectLanguage selected={false} />}
          </main>
        </AppSessionContextProvider>

        <div id="global-screen-loader" className="z-10 flex justify-center items-center fixed inset-0">
          <div className="w-20 h-20 border-[6px] border-t-[transparent] border-dbg dark:border-bg dark:border-t-[transparent] rounded-full animate-spin"></div>
        </div>
      </body>
    </html>
  );
}

const content = {
  title: { en: "Arab Local Market", ar: "السوق المحلي العربي" },
  description: {
    en: "Arab Local Market is the first platform for Arabic markets, stores and supermarkets that sell Arabic Halal Food Products where the user can look for the nearby stores and order food.",
    ar: "السوق المحلي العربي هو أول منصة للأسواق العربية والمتاجر ومحلات السوبر ماركت التي تبيع المنتجات الغذائية العربية الحلال حيث يمكن للمستخدم البحث عن المتاجر القريبة وطلب الطعام",
  },
  keywords: {
    en: "Nearby grocery stores, local markets, supermarkets, Halal food, heigh quality Halal food",
    ar: "محلات البقالة قريبة, الأسواق المحلية, طعام منتجات غذائية حلال, طعام حلال عالي الجودة",
  },
};
