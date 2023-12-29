import { notFound } from "next/navigation";
import { getSupportedLanguage } from "../layout";
import getMetadata from "../metadata";
import { content } from "../metadata";

export default async function LayoutPageByLang({ children, params: { lang } }) {
  if (!getSupportedLanguage(lang)) return notFound();
  return children;
}

export function generateMetadata({ params: { lang } }) {
  return !getSupportedLanguage(lang) ? null : getMetadata({ lang, title: content.title[lang] });
}
