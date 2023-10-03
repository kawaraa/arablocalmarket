import { cookies } from "next/headers";
import { extractLang } from "./(service)/utilities";
import AppSessionContextProvider from "./app-session-context";
import Navigation from "./(layout)/navigation";
import "./global.css";

// revalidate all the underneath routes and layouts
// export const revalidate = 60;

export default function RootLayout({ children, params, searchParams }) {
  const cookieStore = cookies();
  const lang = extractLang(params, searchParams, cookieStore.get("lang")?.value);
  const themeMode = cookieStore.get("themeMode")?.value || "auto";

  return (
    <html translate="no" lang={lang} className={`scroll-smooth group ${themeMode}`}>
      <body
        className={`relative min-h-screen bg-bg dark:bg-dbg text-t dark:text-dt print:min-h-fit print:text-t ${
          lang == "ar" && "font-arabic"
        }`}>
        <AppSessionContextProvider language={lang} theme={themeMode}>
          <header>
            <Navigation />
          </header>
          <main
            className="min-h-screen pt-14 pb-24 md:pt-16 px-1 sm:px-2 md:px-4 lg:px-6 xl:px-8 print:min-h-fit"
            dir="auto">
            {children}
          </main>
        </AppSessionContextProvider>

        <div id="global-screen-loader" className="z-10 fixed inset-0 flex justify-center items-center">
          <div className="w-20 h-20 border-[6px] border-t-[transparent] border-dbg dark:border-bg dark:border-t-[transparent] rounded-full animate-spin"></div>
        </div>
      </body>
    </html>
  );
}

export async function generateMetadata({ params, searchParams }) {
  const cookieStore = cookies();
  const lang = extractLang(params, searchParams, cookieStore.get("lang")?.value);
  const themeMode = cookieStore.get("themeMode")?.value;

  return {
    title: content.title[lang],
    description: content.description[lang],
    keywords: content.keywords[lang],
    category: "retail", // grocery
    authors: [{ name: "ArabLocalMarket", url: "https://arablocalmarket.com" }],
    themeColor: themeMode == "dark" ? "#121212" : "#ffffff",
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#ffffff" },
      { media: "(prefers-color-scheme: dark)", color: "#121212" },
    ],
    colorScheme: themeMode,
    icons: {
      shortcut: { type: "image/ico", sizes: "48x48", url: "/img/favicon.ico" },
      icon: { type: "image/png", sizes: "16x16", url: "/img/favicon-16x16.png" },
      apple: { type: "image/png", sizes: "180x180", url: "/img/apple-touch-icon.png" },
      other: [
        { rel: "icon", type: "image/png", sizes: "32x32", url: "/img/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "192x192", url: "/img/android-chrome-192x192.png" },
        { rel: "icon", type: "image/png", sizes: "512x512", url: "/img/android-chrome-512x512.png" },
      ],
    },
    manifest: "/manifest.json",
    other: {
      google: "notranslate",
    },
    openGraph: {
      title: content.title[lang],
      description: content.description[lang],
      url: "https://arablocalmarket.com",
      siteName: "ArabLocalMarket",
      images: [
        { url: "https://arablocalmarket.com/img/android-chrome-512x512.png", width: 600, height: 600 },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: content.title[lang],
      description: content.description[lang],
      siteId: "1467726470533754880",
      creator: "@ArabLocalMarket",
      creatorId: "1467726470533754880",
      images: ["https://arablocalmarket.com/img/android-chrome-512x512.png"],
    },
    appleWebApp: {
      title: "ALM",
      statusBarStyle: "black-translucent",
    },
  };
}

const content = {
  title: {
    en: "Arab Local Market - local stores - Arabic stores nearby",
    ar: "السوق المحلي العربي - المتاجر المحلية - المتاجر العربية القريبة",
  },
  // ArabLocalMarket was founded by Kawara to help shoppers find and buy products at their favorite nearby stores
  description: {
    en: "ArabLocalMarket is a platform where Local stores sell Arabic Halal Food Products or provide services and users can look for nearby stores and order from it",
    ar: "السوق المحلي العربي ArabLocalMarket هو عبارة عن منصة حيث تبيع المتاجر المحلية المنتجات الغذائية الحلال العربية أو تقدم خدمات ويمكن للمستخدمين البحث عن المتاجر القريبة والطلب منها",
  },
  keywords: {
    en: "ArabLocalMarket, Arab Local Market, find and buy products at nearby stores, Nearby grocery stores, local Arabic Stores and supermarkets, Halal food, heigh quality Arabic Halal food, Create online store free, Connect your local store with online store, Mange your local business, Mange your grocery store, Sell products locally online",
    ar: "السوق المحلي العربي, السوق العربي المحلي, البحث عن المنتجات وشرائها من المتاجر القريبة, محلات البقالة قريبة, المتاجر والسوبر ماركت العربية المحلية, طعام منتجات غذائية حلال, طعام حلال عربي عالي الجودة, إنشاء متجر على الإنترنت مجانً, قم بتوصيل متجرك المحلي بالمتجر عبر الإنترنت, إدارة عملك المحلي, إدارة متجر البقالة الخاص بك, بيع المنتجات محليا عبر الإنترنت",
  },
};
