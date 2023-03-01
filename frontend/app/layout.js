import AppSessionContextProvider from "./app-session-context";
import Navigation from "./(layout)/navigation";
// import Breadcrumb from "./(component)/breadcrumb";
import "./global.css";

// https://www.datocms.com/blog/dealing-with-nextjs-seo
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth group auto">
      <head>
        <title>Arab Local Market</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Complete description of the content showed in this sample page." />
        {/* <meta property="og:title" content="My Sample Page"/>
        <meta property="og:description" content="Complete description of the content showed in this sample page for Open Graph."/>
        <meta property="og:url" content="https://mydomain.com/"/>
        <meta property="og:type" content="website"/> */}
        {/* <script src="/loading-screen.js" defer></script> */}
        {/* <script src="https://cdn.tailwindcss.com"></script> */}
        <script src="/tailwind-css-script.js"></script>
        <script src="/config.js"></script>
      </head>
      <body className="relative">
        <div className="min-h-[100vh] pt-14 md:pt-16 bg-bg dark:bg-dbg text-t dark:text-dt opacity-0">
          <AppSessionContextProvider>
            <header>
              <Navigation />
            </header>
            <main dir="auto" className="px-1 sm:px-2 md:px-4 lg:px-6 xl:px-8">
              {children}
            </main>
          </AppSessionContextProvider>
        </div>
        <div className="z10 flex justify-center items-center fixed inset-0 bg-[transparent]">
          <div className="w-24 h-24 border-8 border-t-[transparent] border-[#999] rounded-full animate-spin"></div>
        </div>
      </body>
    </html>
  );
}
