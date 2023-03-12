"use client";
import { useContext, useState } from "react";
import { AppSessionContext } from "../app-session-context";
import Modal from "./(styled)/modal";
import { RadioCard } from "./(styled)/inputs";

export default function SelectLanguage({ SelectLanguage }) {
  const { updateLang } = useContext(AppSessionContext);
  const [open, setOpen] = useState(!SelectLanguage);

  const changeLanguage = (lang) => {
    updateLang(lang);
    setOpen(false);
    window.location.reload();
  };

  return (
    <Modal
      open={open}
      base="z-9 fixed left-5 top-[40%] right-5 p-4 overflow-hidden rounded-lg bg-bg dark:bg-dcbg md:min-w-[550px] md:max-w-xl md:left-1/2 md:bottom-1/2 md:-translate-x-1/2 md:translate-y-1/2">
      <div className="flex justify-center items-center">
        <RadioCard
          name="language"
          onChange={() => changeLanguage("en")}
          cls="!h-10 mx-1 flex justify-center items-center text-lg">
          English
        </RadioCard>
        <RadioCard
          name="language"
          onChange={() => changeLanguage("ar")}
          cls="!h-10 mx-1 flex justify-center items-center text-lg">
          العربية
        </RadioCard>
      </div>
    </Modal>
  );
}
