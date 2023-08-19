import { notFound } from "next/navigation";
import MakeMoney from "../page";

export default function MakeMoneyLang(props) {
  if (!/en|ar/gim.test(props.params?.lang)) notFound();
  return <MakeMoney {...props} />;
}
