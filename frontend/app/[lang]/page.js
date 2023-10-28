import { notFound } from "next/navigation";
import HomePage from "../page";

export default function HomePageByLang(props) {
  if (props.params?.lang != "en" && props.params?.lang != "ar") notFound();
  return <HomePage {...props} />;
}
