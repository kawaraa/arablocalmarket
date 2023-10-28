import { notFound } from "next/navigation";
import getMetadata from "../metadata";

export default async function StoreLayout({ children, params }) {
  if (params?.lang != "en" && params?.lang != "ar") notFound();
  return children;
}

export async function generateMetadata({ params }) {
  return getMetadata({ lang: params.lang });
}
