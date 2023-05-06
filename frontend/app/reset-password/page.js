"use client";
import { useContext, useEffect, useState } from "react";
import { request } from "../(service)/api-provider";
import { AppSessionContext } from "../app-session-context";
import shdCnt from "../(layout)/json/shared-content.json";
import { PswInputField } from "../(component)/custom-inputs";
import { Button } from "../(component)/(styled)/button";
import { useRouter } from "next/navigation";

export default function ResetPassword({ params, searchParams: { code } }) {
  const router = useRouter();
  const { lang, user, addMessage, updateUser } = useContext(AppSessionContext);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      password: e.target.password.value,
      passwordConfirmation: e.target.confirmPassword.value,
      code,
    };

    try {
      const response = await request("resetPassword", "POST", data);
      window.localStorage.removeItem("accessToken");
      window.localStorage.setItem("accessToken", response.jwt);
      window.location.reload();
    } catch (error) {
      addMessage({ type: "error", text: error.message, duration: 5 });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user?.id) router.push("/store");
  }, [user]);

  return (
    <form
      dir="auto"
      onSubmit={handleResetPassword}
      className="w-full max-w-md mx-auto pt-[15vh] px-4 space-y-6">
      <h1 className="mt-6 text-center text-2xl font-bold ">{content.h1[lang]}</h1>

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

      <Button type="submit" disabled={loading} loading={loading} cls="text-base w-full py-2">
        {shdCnt.save[lang]}
      </Button>
    </form>
  );
}

const content = {
  h1: { en: "Create new password", ar: "إنشاء كلمة مرور جديدة" },
};
