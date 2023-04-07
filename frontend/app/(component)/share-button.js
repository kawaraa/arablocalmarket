"use client";
import { useContext } from "react";
import { AppSessionContext } from "../app-session-context";
import SvgIcon from "./(styled)/svg-icon";
import { copyText } from "../(service)/utilities";

export function ShareButton({ title, text, cls }) {
  const { lang, addMessage } = useContext(AppSessionContext);

  const handleShare = (e) => {
    e.preventDefault();
    if (navigator.share) {
      return navigator.share({ title: title + " - ALM", text: text, url: window.location.href });
    }
    copyText(window.location.href, (copied) => {
      const type = copied ? "success" : "error";
      addMessage({ type, text: content[type][lang], duration: 10 });
    });
  };

  return (
    <a
      href="#"
      onClick={handleShare}
      title={content.title[lang]}
      aria-label={content.title[lang]}
      className={cls}>
      <SvgIcon name="share" />
    </a>
  );
}

const content = {
  title: { en: "Click to share", ar: "انقر للمشاركة" },
  success: { en: "Copied store link", ar: "تم نسخ رابط المتجر" },
  error: { en: "Could not copy store link", ar: "تعذر نسخ رابط المتجر" },
};
