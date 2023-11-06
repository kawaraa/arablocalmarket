import { notFound } from "next/navigation";
import HomePage from "../page";
import getMetadata from "../metadata";

export default function HomePageByLang(props) {
  if (props.params?.lang != "en" && props.params?.lang != "ar") notFound();
  return <HomePage {...props} />;
}

export async function generateMetadata({ params }) {
  const data = { alternates: { canonical: params.lang == "en" ? "/" : "/ar" } };
  return getMetadata({ lang: params.lang, data });
}
