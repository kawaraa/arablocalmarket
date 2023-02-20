import AppSessionContextProvider from "./app-session-context";
import Navigation from "./(layout)/navigation";
// import Breadcrumb from "./(component)/breadcrumb";
import "./global.css";

// https://www.datocms.com/blog/dealing-with-nextjs-seo
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="group auto">
      <head>
        <title>Arab Local Market</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Complete description of the content showed in this sample page." />
        {/* <meta property="og:title" content="My Sample Page"/>
        <meta property="og:description" content="Complete description of the content showed in this sample page for Open Graph."/>
        <meta property="og:url" content="https://mydomain.com/"/>
        <meta property="og:type" content="website"/> */}
        {/* <script src="/loading-screen.js" defer></script> */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="/config.js"></script>
      </head>
      <body className="relative">
        <div className="pt-14 md:pt-16 bg-l-bg text-l-t dark:bg-d-bg dark:text-d-t opacity-0">
          <AppSessionContextProvider>
            <header>
              <Navigation />
            </header>
            <main className="px-3 md:px-8">{children}</main>
          </AppSessionContextProvider>
        </div>
        <div className="z10 flex justify-center items-center fixed inset-0 bg-[transparent]">
          <div className="w-24 h-24 border-8 border-t-[transparent] border-[#999] rounded-full animate-spin"></div>
        </div>
      </body>
    </html>
  );
}
