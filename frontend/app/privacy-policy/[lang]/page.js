import { notFound } from "next/navigation";
import PrivacyPolicy from "../page";

export default function PrivacyPolicyLang(props) {
  if (!/en|ar/gim.test(props.params?.lang)) notFound();
  return <PrivacyPolicy {...props} />;
}
