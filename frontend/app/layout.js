import Navigation from "./navigation";
import "./global.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <head>
        <title>Arab Local Market</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="/config.js"></script>
      </head>
      <body className="bg-white text-slate-600 dark:text-slate-300 dark:bg-slate-900">
        <Navigation />
        {children}
        <div
          id="loading-screen-wrapper"
          className="flex justify-center items-center fixed inset-0 z-15 bg-[#ffffffdc]">
          <div className="w-24 h-24 border-8 border-t-[transparent] border-[#999] rounded-full animate-spin"></div>
        </div>
      </body>
    </html>
  );
}
