"use client";
import { useContext, useState } from "react";
import { AppSessionContext } from "../app-session-context";
import Modal from "./(styled)/modal";
import { CheckCard } from "./(styled)/inputs";

export default function SelectLanguage({ selected }) {
  const { updateLang } = useContext(AppSessionContext);
  const [open, setOpen] = useState(!selected);

  const changeLanguage = (lang) => {
    updateLang(lang);
    setOpen(false);
    window.location.reload();
  };

  return (
    <Modal open={open} center>
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
