import { notFound } from "next/navigation";
import HomePage from "../page";

export default function HomePageByLang(props) {
  if (!/en|ar/gim.test(props.params?.lang)) notFound();
  return <HomePage {...props} />;
}
