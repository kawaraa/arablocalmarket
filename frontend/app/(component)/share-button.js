"use client";
import { useContext } from "react";
import { AppSessionContext } from "../app-session-context";
import SvgIcon from "./(styled)/svg-icon";
import { copyText } from "../(service)/utilities";

export function ShareButton({ title, text, url, cls }) {
  const { lang, addMessage } = useContext(AppSessionContext);

  const handleShare = (e) => {
    e.preventDefault();
    const newUrl = url ? window.location.origin + url : window.location.href;
    if (navigator.share) {
      return navigator.share({ title: title + " - ALM", text: text, url: newUrl });
    }
    copyText(newUrl, (copied) => {
      const type = copied ? "success" : "error";
      addMessage({ type, text: content[type][lang], duration: 2 });
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
  success: { en: "Copied the link", ar: "تم نسخ الرابط" },
  error: { en: "Could not copy the link", ar: "تعذر نسخ الرابط" },
};
