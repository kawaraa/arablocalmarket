"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../app-session-context";
import shdCnt from "../(layout)/json/shared-content.json";
import { Button } from "../(component)/(styled)/button";
import {
  EmailInputField,
  NameInputField,
  PhoneInputField,
  PswInputField,
} from "../(component)/custom-inputs";
import { request } from "../(service)/api-provider";
import { Cookies } from "../(service)/utilities";
import SvgIcon from "../(component)/(styled)/svg-icon";
import Link from "next/link";
import Image from "next/image";

export default function Signup() {
  const router = useRouter();
  const { lang, user, addMessage, refetchUser } = useContext(AppSessionContext);
  const [loading, setLoading] = useState(false);

  const checkConfirmation = async (data, times) => {
    const response = await request("signIn", "POST", data).catch(() => null);

    if (!response?.user?.confirmed && times < 20) setTimeout(() => checkConfirmation(data, times + 1), 15000);
    else if (response?.user?.confirmed) {
      window.localStorage.setItem("accessToken", response.jwt);
      Cookies.set("accessToken", response.jwt);
      refetchUser();
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {};
    new FormData(e.target).forEach((value, key) => (data[key] = value));
    try {
      const { email, password, confirmPassword, firstName, lastName } = data;
      if (password != confirmPassword) throw new Error(shdCnt.pswErr[lang]);
      delete data.confirmPassword;
      data.username = (firstName + lastName + email.slice(0, email.indexOf("@"))).toLowerCase();

      window.localStorage.removeItem("accessToken");
      Cookies.remove("accessToken");
      await request("signUp", "POST", data);

      addMessage({ type: "success", text: success(lang), duration: 30 });

      checkConfirmation({ identifier: email, password }, 1);
    } catch (error) {
      addMessage({ type: "error", text: error.message, duration: 5 });
    }

    setLoading(false);
  };

  useEffect(() => {
    if (user?.myStores) router.replace(user.myStores[0] ? "/admin/store?tab=my" : "store");
  }, [user]);

  if (user?.loading) return null;
  return (
    <div className="min-h-[90vh] pt-3 px-4 ">
      <form onSubmit={handleSignup} className="w-full max-w-md mx-auto space-y-6">
        <div>
          <div className="w-20 mx-auto">
            <SvgIcon name="logo" />
          </div>

          <h1 className="text-center text-2xl font-bold ">{content.h1[lang]}</h1>
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
          <PswInputField full lang={lang} cls="5 w-1/2" inCls={`rounded-${lang == "ar" ? "r" : "l"}-md`} />
          <PswInputField
            full
            lang={lang}
            confirm
            cls="6 w-1/2"
            inCls={`rounded-${lang == "ar" ? "l" : "r"}-md`}
          />
        </div>

        <div>
          <Button type="submit" disabled={loading} loading={loading} cls="text-lg w-full">
            {content.submit[lang]}
          </Button>
        </div>
      </form>

      <p className="max-w-md mx-auto text-center text-xl my-8 leading-[0px] border-b-[0.5px] border-b-bf">
        <span className="bg-bg dark:bg-dbg px-3">{content.or[lang]}</span>
      </p>

      <div>
        <Link passHref legacyBehavior href="https://api.arablocalmarket.com/api/connect/google">
          <a
            dir="ltr"
            className="flex justify-center items-center max-w-md mx-auto p-2 text-lg border-[0.5px] border-bf rounded-lg">
            <Image
              src="/img/google-icon.png"
              width="100"
              height="100"
              alt="Google icon"
              className="w-6 h-6 mr-2"
            />
            {content.oAuth[lang]}
          </a>
        </Link>
      </div>
    </div>
  );
}

const success = (lang) => (
  <div>
    <h4 className="font-semibold">{content.success[lang][0]}</h4>
    <p>{content.success[lang][1]}</p>
    <p>{content.success[lang][2]}</p>
  </div>
);

const content = {
  h1: { en: "Create a new account", ar: "انشاء حساب جديد" },
  // username: { en: "Username", ar: "اسم المستخدم" } ,
  submit: { en: "Create", ar: "إنشاء حساب" },
  or: { en: "or", ar: "أو" },
  oAuth: { en: "Google", ar: "Google" },
  success: {
    en: [
      "Your account has been created",
      "A confirmation Email is sent to your Email address",
      "Please go to your Email inbox and confirm your Email address",
    ],
    ar: [
      "لقد تم إنشاء حسابك",
      "تم إرسال بريد إلكتروني للتأكيد عنوان بريدك الإلكتروني",
      "يرجى الذهاب إلى صندوق البريد الإلكتروني الخاص بك وتأكيد عنوان البريد الإلكتروني الخاص بك",
    ],
  },
};
