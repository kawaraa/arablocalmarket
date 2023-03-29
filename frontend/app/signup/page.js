"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../app-session-context";
import messages from "../(layout)/json/messages.json";
import { Button } from "../(component)/(styled)/button";
import {
  EmailInputField,
  NameInputField,
  PhoneInputField,
  PswInputField,
} from "../(component)/custom-inputs";
import { getURL, request } from "../(service)/api-provider";

export default function Signup({ a }) {
  const router = useRouter();
  const { lang, user } = useContext(AppSessionContext);
  const [loading, setLoading] = useState(false);

  const checkConfirmation = async () => {
    const response = await request("getUser").catch(() => null);

    if (response?.confirm) return router.replace("/");
    setTimeout(checkConfirmation, 1000);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const data = {};
    new FormData(e.target).forEach((value, key) => (data[key] = value));
    // /auth/local/register
    // Redirect the user to a page that show him that he needs to confirm his Email to be able to sign in.
    try {
      if (data.password != data.confirmPassword) throw new Error(messages.pswErr[lang]);
      delete data.confirmPassword;
      data.username = data.email.slice(0, data.email.indexOf("@"));
      const response = await request("signUp", "POST", data);
      response.jwt;
      // checkConfirmation()
    } catch (error) {
      console.log(error);
      //
    }
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
          <NameInputField full lang={lang} first cls="1 relative w-1/2" inCls="text-lg rounded-l-md" />
          <NameInputField full lang={lang} cls="2 relative w-1/2" inCls="text-lg rounded-r-md" />
        </div>

        <EmailInputField full lang={lang} cls="3 relative shadow-sm" inCls="text-lg rounded-md" />
        <PhoneInputField full lang={lang} cls="4 relative shadow-sm" inCls="text-lg rounded-md" />

        <div className="flex -space-x-px shadow-sm">
          <PswInputField full lang={lang} cls="5 relative w-1/2" inCls="py-[6px] rounded-l-md" />
          <PswInputField full lang={lang} confirm cls="6 relative w-1/2" inCls="py-[6px] rounded-r-md" />
        </div>

        <div>
          <Button type="submit" handler={null} loading={false} cls="!text-lg w-full py-2">
            {content.submit[lang]}
          </Button>
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
