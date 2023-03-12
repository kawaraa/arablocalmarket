// "use client";
// import { useContext } from "react";
// import SvgIcon from "../(component)/(styled)/svg-icon";
// import { AppSessionContext } from "../app-session-context";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Checkout({ params, searchParams }) {
  // const { lang, user } = useContext(AppSessionContext);
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";
  const page = params.result;

  console.log(searchParams);

  if (!Object.keys(content).includes(page)) return redirect("/");
  return (
    <div>
      <article className="py-8">
        <h3 className="mb-2 text-lg font-medium">{content[page].h1[lang]}</h3>
        <p>{content[page].p[lang]}</p>
      </article>
    </div>
  );
}

const content = {
  success: {
    h1: {
      en: "Congrats! You order has been received, you will receive an confirmation Email very soon.",
      ar: "",
    },
    p: {
      en: "blah blah.",
      ar: "",
    },
  },
  error: {
    h1: { en: "Failed! Payment has not been confirmed, please try again", ar: "" },
    p: {
      en: "blah blah.",
      ar: "",
    },
  },
};
