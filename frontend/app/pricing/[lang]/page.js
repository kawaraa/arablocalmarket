import { notFound } from "next/navigation";
import Pricing from "../page";

export default function PricingByLang(props) {
  if (!/en|ar/gim.test(props.params?.lang)) notFound();
  return <Pricing {...props} />;
}
