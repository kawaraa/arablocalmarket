import { getSupportedLanguage } from "../layout";
import HomePage from "../page";

export default function HomePageByLang(props) {
  if (!getSupportedLanguage(props.params.lang)) return null;
  return <HomePage {...props} />;
}

export async function generateMetadata({ params: { lang } }) {
  return lang != "en" ? null : { alternates: { canonical: "/" } };
}
