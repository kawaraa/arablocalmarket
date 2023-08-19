"use client";
import { useContext, useEffect, useState } from "react";
import { AppSessionContext } from "../app-session-context";
import { CheckCard } from "./(styled)/inputs";
import { Cookies } from "../(service)/utilities";

export default function SelectLanguage() {
  const { updateLang } = useContext(AppSessionContext);
  const [cls, setCls] = useState("-translate-y-24");
  const [open, setOpen] = useState(false);

  const changeLanguage = (lang) => {
    updateLang(lang);
    setCls("-translate-y-24");
    setTimeout(() => setOpen(false), 200);
  };

  useEffect(() => {
    if (!Cookies.get("lang")) {
      setOpen(true);
      setTimeout(() => setCls("-translate-y-0"), 1500);
    }
  }, []);

  if (!open) return null;
  return (
    <div
      className={`card fixed z-9 top-2 right-1/2 translate-x-1/2 px-5 py-3 bg-bg dark:bg-dcbg dark:text-bg shadow-lg rounded-lg flex justify-center items-center transition ${cls}`}>
      <CheckCard
        type="radio"
        name="language"
        onChange={() => changeLanguage("en")}
        cls="w-28 !h-10 mx-1 flex justify-center items-center text-lg">
        English
      </CheckCard>
      <CheckCard
        type="radio"
        name="language"
        onChange={() => changeLanguage("ar")}
        cls="w-28 !h-10 mx-1 flex justify-center items-center text-lg font-arabic">
        العربية
      </CheckCard>
    </div>
  );
}

const content = {
  h: { en: "Chose language", ar: "اختار اللغة" },
};
