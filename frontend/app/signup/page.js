"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../app-session-context";
import { Button } from "../(component)/(styled)/button";
import {
  EmailInputField,
  NameInputField,
  PhoneInputField,
  PswInputField,
} from "../(component)/(styled)/inputs";

export default function Signup({ a }) {
  const router = useRouter();
  const { lang } = useContext(AppSessionContext);
  const [loading, setLoading] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    // /auth/local/register
    // Redirect the user to a page that show him that he needs to confirm his Email to be able to sign in.

    console.log("handleSignup: ", e);
  };

  if (user) {
    router.push("/");
    return null;
  }
  return (
    <div className="min-h-[90vh] pt-12 px-4 ">
      <form dir="auto" onSubmit={handleSignup} className="w-full max-w-md mx-auto space-y-6">
        <div>
          <img src="logo.svg" alt="Arab Local market Logo" className="h-auto w-14 mx-auto " />
          <h1 className="mt-6 text-center text-2xl font-bold ">{content.h1[lang]}</h1>
        </div>

        <div className="flex -space-x-px shadow-sm">
          <NameInputField lang={lang} first cls="relative w-1/2" inCls="rounded-l-md" />
          <NameInputField lang={lang} cls="relative w-1/2" inCls="rounded-r-md" />
        </div>

        <EmailInputField lang={lang} cls="relative shadow-sm" />
        <PhoneInputField lang={lang} cls="relative shadow-sm" />

        <div className="flex -space-x-px shadow-sm">
          <PswInputField lang={lang} cls="relative w-1/2" inCls="rounded-l-md" />
          <PswInputField lang={lang} confirm cls="relative w-1/2" inCls="rounded-r-md" />
        </div>

        <div>
          <Button
            type="submit"
            text={content.submit[lang]}
            handler={null}
            loading={false}
            cls="w-full py-2 px-4"
          />
        </div>
      </form>
    </div>
  );
}

const content = {
  h1: { en: "Create a new account", ar: "انشاء حساب جديد" },
  // username: { en: "Username", ar: "اسم المستخدم" } ,
  submit: { en: "Create", ar: "إنشاء حساب" },
};
