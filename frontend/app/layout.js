import AppSessionContextProvider from "./app-session-context";
import { cookies } from "next/headers";
import Navigation from "./(layout)/navigation";
import "./global.css";

// revalidate all the underneath routes and layouts
// export const revalidate = 60;

export default function RootLayout({ children, params, searchParams }) {
  const cookieStore = cookies();
  let lang = (params?.lang || searchParams?.lang || cookieStore.get("lang")?.value)?.toLowerCase();
  if (!/en|ar/gim.test(lang)) lang = "en";
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
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";
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
      icon: { type: "image/png", url: "/img/favicon-16x16.png", sizes: "16x16" },
      shortcut: { type: "image/ico", url: "/img/favicon.ico", sizes: "48x48" },
      apple: { type: "image/png", url: "/img/apple-touch-icon.png", sizes: "180x180" },
      other: [
        { rel: "icon", type: "image/png", url: "/img/favicon-32x32.png", sizes: "32x32" },
        { rel: "icon", type: "image/png", url: "/img/android-chrome-192x192.png", sizes: "192x192" },
        { rel: "icon", type: "image/png", url: "/img/android-chrome-512x512.png", sizes: "512x512" },
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
      title: content.title[lang],
      statusBarStyle: "black-translucent",
    },
  };
}

const content = {
  title: {
    en: "Arab Local Market - local stores - Arabic stores nearby",
    ar: "السوق العربي المحلي - المتاجر المحلية - المتاجر العربية القريبة",
  },
  description: {
    en: "ArabLocalMarket is a platform where Arabic stores sell Arabic Halal Food Products or provide services and users can look for nearby stores and order from it",
    ar: "السوق العربي المحلي ArabLocalMarket هو عبارة عن منصة حيث تبيع المتاجر العربية المنتجات الغذائية الحلال العربية أو تقدم خدمات ويمكن للمستخدمين البحث عن المتاجر القريبة والطلب منها",
  },
  keywords: {
    en: "Nearby grocery stores, local Arabic Stores and supermarkets, Halal food, heigh quality Arabic Halal food",
    ar: "محلات البقالة قريبة, المتاجر والسوبر ماركت العربية المحلية, طعام منتجات غذائية حلال, طعام حلال عربي عالي الجودة",
  },
};
