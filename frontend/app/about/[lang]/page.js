import { notFound } from "next/navigation";
import About from "../page";

export default function AboutLang(props) {
  if (!/en|ar/gim.test(props.params?.lang)) notFound();
  return <About {...props} />;
}
