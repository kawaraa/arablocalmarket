import { notFound } from "next/navigation";
import Sitemap from "../page";

export default function SitemapLang(props) {
  if (!/en|ar/gim.test(props.params?.lang)) notFound();
  return <Sitemap {...props} />;
}
