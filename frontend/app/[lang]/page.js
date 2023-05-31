import { notFound } from "next/navigation";
import LandingPage from "../page";

export default function LandingPageByLang(props) {
  if (!/en|ar/gim.test(props.params?.lang)) notFound();
  return <LandingPage {...props} />;
}
