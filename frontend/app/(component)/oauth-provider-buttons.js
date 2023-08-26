"use client";
import Link from "next/link";
import Image from "next/image";

export default function OAuthProviderButtons({ lang, onClick }) {
  return (
    <>
      <p className="max-w-md mx-auto text-center text-xl my-8 leading-[0px] border-b-[0.5px] border-b-bf">
        <span className="bg-bg dark:bg-dbg px-3">{content.or[lang]}</span>
      </p>
      <div>
        <Link passHref legacyBehavior href="https://api.arablocalmarket.com/api/connect/google">
          <a
            onClick={onClick}
            dir="ltr"
            className="flex justify-center items-center max-w-md mx-auto p-2 text-lg border-[0.5px] border-bf rounded-lg">
            <Image
              src="/img/google-icon.png"
              width="100"
              height="100"
              alt="Google icon"
              className="w-6 h-6 mr-2"
            />
            {content.oAuth[lang]}
          </a>
        </Link>
      </div>
    </>
  );
}

const content = {
  or: { en: "or", ar: "أو" },
  oAuth: { en: "Google", ar: "Google" },
};
