"use client";
import { useContext, useState } from "react";
import { request } from "../(service)/api-provider";
import { AppSessionContext } from "../app-session-context";
import { EmailInputField } from "../(component)/custom-inputs";
import { Button } from "../(component)/(styled)/button";
import { useRouter } from "next/navigation";

export default function ForgotPassword({}) {
  const router = useRouter();
  const { lang, addMessage } = useContext(AppSessionContext);
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await request("forgotPassword", "POST", { email: e.target.email.value });
      addMessage({ type: "success", text: success(lang), duration: 30 });
    } catch (error) {
      addMessage({ type: "error", text: error.message, duration: 5 });
    }
    setLoading(false);
  };

  return (
    <form
      dir="auto"
      onSubmit={handleForgotPassword}
      className="w-full max-w-md mx-auto pt-[20vh] px-4 space-y-6">
      <h1 className="mt-6 text-center text-2xl font-bold ">{content.h1[lang]}</h1>

      <EmailInputField full lang={lang} cls="text-lg rounded-t-md cd_hr" inCls="rounded-md" />

      <Button type="submit" disabled={loading} loading={loading} cls="w-full">
        {content.submit[lang]}
      </Button>
    </form>
  );
}

const success = (lang) => (
  <div className="">
    <h4 className="font-semibold">{content.success[lang][0]}</h4>
    <p>{content.success[lang][1]}</p>
    <p>
      <strong>{content.success[lang][2]}: </strong>
      {content.success[lang][3]}
    </p>
  </div>
);

const content = {
  h1: { en: "Reset password", ar: "إعادة تعيين كلمة المرور" },
  submit: { en: "Send", ar: "إرسال" },
  success: {
    en: [
      "An Email is sent to your Email address",
      "Please check your inbox, it contains a password recovery link",
      "Please note",
      "It can take a few minutes to the Email",
    ],
    ar: [
      "تم إرسال بريد إلكتروني إلى عنوان بريدك الإلكتروني",
      "يرجى التحقق من صندوق الوارد الخاص بك، فهو يحتوي على رابط استعادة كلمة المرور",
      "يرجى الملاحظة",
      "يمكن أن يستغرق الأمر بضع دقائق للوصول إلى البريد الإلكتروني",
    ],
  },
};
// Email sent
// It can take a few minutes to receive your password recovery link.
// If you do not receive this link, please contact your administrator.
