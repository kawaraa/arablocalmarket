export default function getMetadata({ lang, title, description, keywords, author, themeMode, data }) {
  const themeColor = themeMode == "dark" ? "#121212" : "#ffffff";

  return {
    title: title || content.title[lang],
    description: description || content.description[lang],
    keywords: keywords || content.keywords[lang],
    category: "retail", // grocery
    authors: [author || content.author],
    themeColor,
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
    other: { google: "notranslate" },
    metadataBase: new URL("https://arablocalmarket.com"),
    ...(data || {}),
    openGraph: {
      title: title || content.title[lang],
      description: description || content.description[lang],
      url: "https://arablocalmarket.com",
      siteName: "ArabLocalMarket",
      images: [
        { url: "https://arablocalmarket.com/img/android-chrome-512x512.png", width: 600, height: 600 },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title || content.title[lang],
      description: description || content.description[lang],
      siteId: "1467726470533754880",
      creator: "@ArabLocalMarket",
      creatorId: "1467726470533754880",
      images: ["https://arablocalmarket.com/img/android-chrome-512x512.png"],
    },
    appleWebApp: { title: "ALM", statusBarStyle: "black-translucent" },
  };
}

const content = {
  title: {
    en: "Arab Local Market - local stores - Arabic stores nearby",
    ar: "السوق المحلي العربي - المتاجر المحلية - المتاجر العربية القريبة",
  },
  // ArabLocalMarket was founded by Kawara to help shoppers find and buy products at their favorite nearby stores
  description: {
    en: "ArabLocalMarket is a Local Online Marketplace where Local stores sell Arabic Halal Food Products or provide services and users can look for nearby stores and order from it",
    ar: "السوق المحلي العربي ArabLocalMarket هو عبارة عن سوق محلية على الإنترنت حيث تبيع المتاجر المحلية المنتجات الغذائية الحلال العربية أو تقدم خدمات ويمكن للمستخدمين اكتشف عن المتاجر القريبة والطلب منها",
  },
  keywords: {
    en: "ArabLocalMarket, Arab Local Market, Local Online Marketplace, find and buy products at nearby stores, Nearby grocery stores, local Arabic Stores and supermarkets, Halal food, heigh quality Arabic Halal food, Create online store free, Connect your local store with online store, Mange your local business, Mange your grocery store, Sell products locally online",
    ar: "السوق المحلي العربي, السوق العربي المحلي, سوق محلية على الإنترنت, اكتشف عن المنتجات وشرائها من المتاجر القريبة, محلات البقالة قريبة, المتاجر والسوبر ماركت العربية المحلية, طعام منتجات غذائية حلال, طعام حلال عربي عالي الجودة, إنشاء متجر على الإنترنت مجانً, قم بتوصيل متجرك المحلي بالمتجر عبر الإنترنت, إدارة عملك المحلي, إدارة متجر البقالة الخاص بك, بيع المنتجات محليا عبر الإنترنت",
  },
  author: { name: "ArabLocalMarket", url: "https://arablocalmarket.com" },
};
