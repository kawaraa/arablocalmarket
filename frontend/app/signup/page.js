"use client";
import { useContext, useEffect, useState } from "react";
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
import { request } from "../(service)/api-provider";

export default function Signup({ searchParams }) {
  const router = useRouter();
  const { lang, user, addMessage, updateUser } = useContext(AppSessionContext);
  const [loading, setLoading] = useState(false);

  const checkConfirmation = async (data, times) => {
    const response = await request("signIn", "POST", data).catch(() => null);
    if (response?.user?.confirmed) {
      window.localStorage.removeItem("accessToken");
      window.localStorage.setItem("accessToken", response.jwt);

      const user = await request("getUser").catch(() => null);
      if (user) updateUser(user);
    } else if (times < 20) setTimeout(() => checkConfirmation(data, times + 1), 40000);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {};
    new FormData(e.target).forEach((value, key) => (data[key] = value));
    try {
      const { email, password, confirmPassword, firstName, lastName } = data;
      if (password != confirmPassword) throw new Error(messages.pswErr[lang]);
      delete data.confirmPassword;
      data.username = (firstName + lastName + email.slice(0, email.indexOf("@"))).toLowerCase();

      await request("signUp", "POST", data);

      addMessage({ type: "success", text: content.message[lang], duration: 3 });

      checkConfirmation({ identifier: email, password }, 1);

      setTimeout(() => router.replace(window.location.href + "?status=confirm"), 2000);
    } catch (error) {
      addMessage({ type: "error", text: error.message, duration: 5 });
    }

    setLoading(false);
  };

  if (user?.loading) return null;
  else if (user?.myStores) return router.replace(user.myStores[0] ? "/admin/store" : "store");
  else if (searchParams.status == "confirm") {
    return (
      <article className="flex flex-col justify-center items-center h-[80vh]">
        <h1 className="text-2xl mb-3">{content.confirmH1[lang]}</h1>
        <p className="text-center">{content.confirmP[lang]}</p>
      </article>
    );
  }
  return (
    <div className="min-h-[90vh] pt-12 px-4 ">
      <form onSubmit={handleSignup} className="w-full max-w-md mx-auto space-y-6">
        <div>
          <img src="/img/logo.png" alt="Arab Local market Logo" className="h-auto w-24 mx-auto " />
          <h1 className="mt-6 text-center text-2xl font-bold ">{content.h1[lang]}</h1>
        </div>

        <div className="flex -space-x-px shadow-sm">
          <NameInputField
            full
            lang={lang}
            first
            cls="1 w-1/2"
            inCls={`text-lg rounded-${lang == "ar" ? "r" : "l"}-md`}
          />
          <NameInputField
            full
            lang={lang}
            cls="2 w-1/2"
            inCls={`text-lg rounded-${lang == "ar" ? "l" : "r"}-md`}
          />
        </div>

        <EmailInputField full lang={lang} cls="3 shadow-sm" inCls="text-lg rounded-md" />
        <PhoneInputField full lang={lang} cls="4 shadow-sm" inCls="text-lg rounded-md" />

        <div className="flex -space-x-px shadow-sm">
          <PswInputField
            full
            lang={lang}
            cls="5 w-1/2"
            inCls={`py-[6px] rounded-${lang == "ar" ? "r" : "l"}-md`}
          />
          <PswInputField
            full
            lang={lang}
            confirm
            cls="6 w-1/2"
            inCls={`py-[6px] rounded-${lang == "ar" ? "l" : "r"}-md`}
          />
        </div>

        <div>
          <Button type="submit" disabled={loading} loading={loading} cls="!text-lg w-full py-2">
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
  message: { en: "Your account has been created", ar: "لقد تم إنشاء حسابك" },
  confirmH1: { en: "Signed up successfully!", ar: "تم التسجيل بنجاح!" },
  confirmP: {
    en: "We have sent you a confirmation Email, Please go to your Email inbox and confirm your Email address.",
    ar: "لقد أرسلنا لك رسالة تأكيد بالبريد الإلكتروني ، يرجى الذهاب إلى صندوق البريد الإلكتروني الخاص بك وتأكيد عنوان بريدك الإلكتروني.",
  },
};
