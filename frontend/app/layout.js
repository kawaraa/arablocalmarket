import { cookies } from "next/headers";
import Script from "next/script";
import { extractLang } from "./(service)/utilities";
import AppSessionContextProvider from "./app-session-context";
import Navigation from "./(layout)/navigation";
import getMetadata from "./metadata";
import "./global.css";

// revalidate all the underneath routes and layouts
// export const revalidate = 60;

export default function RootLayout({ children, params, searchParams }) {
  const cookieStore = cookies();
  const themeMode = cookieStore.get("themeMode")?.value || "auto";
  let lang = extractLang(params, searchParams, cookieStore.get("lang")?.value);
  if ((children?.props?.childProp?.segment || []).includes("ar")) lang = "ar";
  // console.log("RootLayout lang: ", params, searchParams, children?.props?.childProp?.segment);

  return (
    <html translate="no" lang={lang} className={`scroll-smooth group ${themeMode}`}>
      <body
        className={`relative min-h-screen bg-bg antialiased font-base dark:bg-dbg text-t dark:text-dt print:min-h-fit print:text-t ${
          lang == "ar" && "font-arabic"
        }`}>
        {/* Google tag (gtag.js)  */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-11358381234" />
        <Script strategy="beforeInteractive" id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-11358381234');
        `}
        </Script>

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

export function generateMetadata({ params, searchParams }) {
  // console.log("generateMetadata: ", params, searchParams);
  const cookieStore = cookies();
  const lang = extractLang(params, searchParams, cookieStore.get("lang")?.value);
  return getMetadata({ lang, themeMode: cookieStore.get("themeMode")?.value });
}
