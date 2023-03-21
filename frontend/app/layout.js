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
        <title>Arab Local Market</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Complete description of the content showed in this sample page." />
        {/* <meta name="theme-color" content="black" /> */}
        {/* <meta property="og:title" content="My Sample Page"/>
        <meta property="og:description" content="Complete description of the content showed in this sample page for Open Graph."/>
        <meta property="og:url" content="https://mydomain.com/"/>
        <meta property="og:type" content="website"/> */}
        {/* <script src="/loading-screen.js" defer></script> */}
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
            {!language && <SelectLanguage selectedLanguage={false} />}
          </main>
        </AppSessionContextProvider>

        <div id="global-screen-loader" className="z-10 flex justify-center items-center fixed inset-0">
          <div className="w-20 h-20 border-[6px] border-t-[transparent] border-dbg dark:border-bg dark:border-t-[transparent] rounded-full animate-spin"></div>
        </div>
      </body>
    </html>
  );
}
