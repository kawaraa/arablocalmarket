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
import OAuthProviderButtons from "../(component)/oauth-provider-buttons";

export default function Signup() {
  const router = useRouter();
  const { lang, user, addMessage } = useContext(AppSessionContext);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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

      localStorage.setItem("credentials", JSON.stringify({ identifier: email, password }));
      setLoading(false);
      router.replace("/signup/welcome");
    } catch (error) {
      addMessage({ type: "error", text: error.message, duration: 5 });
      setLoading(false);
    }
  };

  const checkNameField = (e) => {
    if (!firstName || !lastName) {
      e.preventDefault();
      addMessage({ type: "warning", text: content.nameErr[lang], duration: 5 });
    } else {
      window.localStorage.setItem("name", `${firstName}::${lastName}`);
    }
  };

  useEffect(() => {
    if (user?.myStores) router.replace(user.myStores[0] ? "/admin/store?tab=my" : "/store");
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
            onChange={(e) => setFirstName(e.target.value)}
            cls="1 w-1/2"
            inCls={`text-lg rounded-${lang == "ar" ? "r" : "l"}-md`}
          />
          <NameInputField
            full
            lang={lang}
            onChange={(e) => setLastName(e.target.value)}
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

      <OAuthProviderButtons lang={lang} onClick={checkNameField} />
    </div>
  );
}

const content = {
  h1: { en: "Create a new account", ar: "انشاء حساب جديد" },
  // username: { en: "Username", ar: "اسم المستخدم" } ,
  submit: { en: "Create", ar: "إنشاء حساب" },
  nameErr: { en: "Please fill in your first and last name", ar: "يرجى ملء الاسم واسم العائلة" },
};
