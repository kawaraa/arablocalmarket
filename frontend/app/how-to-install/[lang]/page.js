import { notFound } from "next/navigation";
import HowToInstall from "../page";

export default function HowToInstallLang(props) {
  if (!/en|ar/gim.test(props.params?.lang)) notFound();
  return <HowToInstall {...props} />;
}
