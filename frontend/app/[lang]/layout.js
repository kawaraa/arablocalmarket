import { notFound } from "next/navigation";

export default async function StoreLayout({ children, params }) {
  if (params?.lang != "en" && params?.lang != "ar") notFound();
  return children;
}
