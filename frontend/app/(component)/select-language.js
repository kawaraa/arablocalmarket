"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../app-session-context";
import Modal from "./(styled)/modal";
import { CheckCard } from "./(styled)/inputs";
import { Cookies } from "../(service)/utilities";

export default function SelectLanguage({ language }) {
  const router = useRouter();
  const { lang, updateLang } = useContext(AppSessionContext);
  const [open, setOpen] = useState(false);

  const changeLanguage = (lang) => {
    updateLang(lang);
    setOpen(false);
  };

  useEffect(() => {
    console.log(language, lang);
    if (!lang) setTimeout(() => setOpen(true), 300);
    else if (lang && lang != language) router.refresh();
    // else if (lang && lang != language) window.location.reload();
  }, [lang, language]);
  return (
    <Modal lang={lang} open={open} center title={content.h[lang]}>
      <div className="flex justify-center items-center">
        {language}-{lang}-{Cookies.get("lang")}
        <CheckCard
          type="radio"
          name="language"
          onChange={() => changeLanguage("en")}
          cls="w-1/2 md:w-44 !h-10 mx-1 flex justify-center items-center text-lg">
          English
        </CheckCard>
        <CheckCard
          type="radio"
          name="language"
          onChange={() => changeLanguage("ar")}
          cls="w-1/2 md:w-44 !h-10 mx-1 flex justify-center items-center text-lg">
          العربية
        </CheckCard>
      </div>
    </Modal>
  );
}

const content = {
  h: { en: "Chose language", ar: "اختار اللغة" },
};
