import Link from "next/link";

export default function Footer(props) {
  return (
    <footer className="mx-auto mt-32 w-full max-w-container px-4 sm:px-6 lg:px-8">
      <Link href="/about">Who we are</Link>
      <Link href="/contact">Contact</Link>

      <div className="border-t border-slate-900/5 py-10">
        <div className="w-[170px] p-1 rounded-full mx-auto text-lg text-center [bg-p-c]">
          Arab Local Market
        </div>
        <p className="mt-5 text-center text-sm leading-6 text-slate-500">
          © 2023 ArabLocalMarket Inc. All rights reserved.
        </p>
        <div className="mt-16 flex items-center justify-center space-x-4 text-sm font-semibold leading-6">
          <a href="/privacy-policy">Privacy policy</a>
          <div className="h-4 w-px bg-slate-500/20"></div>
          <a href="/changelog">Changelog</a>
        </div>
      </div>
    </footer>
  );
}
