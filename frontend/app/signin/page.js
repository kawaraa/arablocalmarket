"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppSessionContext } from "../app-session-context";
import { fetchUser, request } from "../(service)/api-provider";
import { Button } from "../(component)/(styled)/button";
import { EmailInputField, PswInputField } from "../(component)/custom-inputs";
import { Cookies } from "../(service)/utilities";
import SvgIcon from "../(component)/(styled)/svg-icon";

export default function SignIn() {
  const router = useRouter();
  const { lang, user, addMessage, updateUser } = useContext(AppSessionContext);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {};
    new FormData(e.target).forEach((value, key) => (data[key == "email" ? "identifier" : key] = value));
    // Todo: Adjust Strapi tp make return the jwt in the cookie as well with "HttpOnly"
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies
    try {
      if (!data && !data.identifier) window.location.reload();
      const response = await request("signIn", "POST", data);
      window.localStorage.removeItem("accessToken");
      window.localStorage.setItem("accessToken", response.jwt);
      Cookies.set("accessToken", response.jwt);

      const customer = JSON.parse(window.localStorage.getItem("customer"));
      await request("customer", "POST", { data: { customer } }).catch(() => null);
      window.localStorage.removeItem("customer");

      updateUser(await fetchUser());
    } catch (error) {
      addMessage({ type: "error", text: error.message, duration: 30 });
      window.localStorage.removeItem("accessToken");
      Cookies.remove("accessToken");
      if (error.message?.includes("(01)")) request("EmailConfiguration", "POST", { email: data.identifier });
    }

    setLoading(false);
  };

  useEffect(() => {
    if (user?.myStores) router.replace(user.myStores[0] ? "/admin/store?tab=my" : "store");
  }, [user]);

  if (user?.loading) return null;
  return (
    <div className="min-h-[90vh] pt-12 px-4 ">
      <form dir="auto" onSubmit={handleSignIn} className="w-full max-w-md mx-auto space-y-6">
        <div>
          <div className="w-20 mx-auto">
            <SvgIcon name="logo" />
          </div>

          <h1 className="text-center text-2xl font-bold ">{content.h1[lang]}</h1>
        </div>

        <div className="-space-y-px rounded-md shadow-sm">
          <EmailInputField full lang={lang} cls="text-lg rounded-t-md cd_hr" inCls="rounded-t-md" />
          <PswInputField full lang={lang} cls="" inCls="text-lg cd_hr rounded-b-md" />
        </div>

        <div className="text-sm text-right">
          <Link passHref legacyBehavior href="/forgot-password">
            <a className="inline-block font-medium underline underline-offset-4 hover:text-pc2">
              {content.forget[lang]}
            </a>
          </Link>
        </div>

        <div>
          <Button type="submit" disabled={loading} loading={loading} cls="w-full">
            {content.submit[lang]}
          </Button>
        </div>

        <div className="text-sm text-left">
          <Link passHref legacyBehavior href="/signup">
            <a className="inline-block font-medium underline underline-offset-4 hover:text-pc2">
              {content.createAccount[lang]}
            </a>
          </Link>
        </div>
      </form>
    </div>
  );
}

const content = {
  h1: { en: "Sign in to your account", ar: "تسجيل الدخول إلى حسابك" },
  email: { en: "Email address", ar: "البريد الإلكتروني" },
  forget: { en: "Forgot your password?", ar: "هل نسيت كلمة المرور؟" },
  submit: { en: "Sign in", ar: "تسجيل الدخول" },
  createAccount: { en: "Create an account", ar: "إنشاء حساب" },
};
