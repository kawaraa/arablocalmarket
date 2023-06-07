"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../app-session-context";
import Modal from "./(styled)/modal";
import { CheckCard } from "./(styled)/inputs";
import { Cookies } from "../(service)/utilities";

export default function SelectLanguage({ serverLang }) {
  const router = useRouter();
  const { lang, updateLang } = useContext(AppSessionContext);
  const [open, setOpen] = useState(false);

  const changeLanguage = (lang) => {
    updateLang(lang);
    setOpen(false);
  };

  useEffect(() => {
    const clientLang = Cookies.get("lang");
    if (!clientLang || clientLang != serverLang) setTimeout(() => setOpen(true), 300);
    // else if (clientLang && clientLang != serverLang && !user?.loading)  {}
    else if (clientLang == lang) router.refresh();

    // setAppLoading(true);
    // Cookies.set("lang", lang);
    // router.refresh();
    // setTimeout(() => window.location.reload(), 500);
    // window.location.reload();
  }, [lang, serverLang]);

  return (
    <Modal lang={lang} open={open} center title={content.h[lang]}>
      <div className="flex justify-center items-center">
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
