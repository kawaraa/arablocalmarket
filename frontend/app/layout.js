import Breadcrumb from "./(component)/breadcrumb";
import Navigation from "./(component)/navigation";
import "./global.css";

// https://www.datocms.com/blog/dealing-with-nextjs-seo
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="auto">
      <head>
        <title>Arab Local Market</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Complete description of the content showed in this sample page." />
        {/* <meta property="og:title" content="My Sample Page"/>
        <meta property="og:description" content="Complete description of the content showed in this sample page for Open Graph."/>
        <meta property="og:url" content="https://mydomain.com/"/>
        <meta property="og:type" content="website"/> */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="/config.js"></script>
      </head>
      <body className="bg-l-bg text-l-t dark:bg-d-bg dark:text-d-t">
        <main>
          <header>
            <Navigation />
            {/* <Breadcrumb /> */}
          </header>
          {children}
        </main>
        <div
          id="loading-screen-wrapper"
          className="flex justify-center items-center fixed inset-0 z-15 bg-[#ffffffdc]">
          <div className="w-24 h-24 border-8 border-t-[transparent] border-[#999] rounded-full animate-spin"></div>
        </div>
      </body>
    </html>
  );
}
