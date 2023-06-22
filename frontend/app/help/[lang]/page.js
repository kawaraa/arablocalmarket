import { notFound } from "next/navigation";
import Help from "../page";

export default function HelpLang(props) {
  if (!/en|ar/gim.test(props.params?.lang)) notFound();
  return <Help {...props} />;
}
