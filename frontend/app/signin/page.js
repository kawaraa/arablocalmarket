"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppSessionContext } from "../app-session-context";
import { fetchUser, request } from "../(service)/api-provider";
import { InputField } from "../(component)/(styled)/inputs";
import { Button } from "../(component)/(styled)/button";
import { EmailInputField, PswInputField } from "../(component)/custom-inputs";

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
      const response = await request("signIn", "POST", data);
      window.localStorage.removeItem("accessToken");
      window.localStorage.setItem("accessToken", response.jwt);

      const customer = JSON.parse(window.localStorage.getItem("customer"));
      await request("customer", "POST", { data: { customer } }).catch(() => null);
      window.localStorage.removeItem("customer");

      updateUser(await fetchUser());

      // Todo: merge the carts stored in the browser with user carts
    } catch (error) {
      addMessage({ type: "error", text: error.message, duration: 5 });
      window.localStorage.removeItem("accessToken");
    }

    setLoading(false);
  };

  useEffect(() => {
    const id = setTimeout(() => {
      if (user) router.replace(user.myStores[0] ? "/admin/store" : "store");
    }, 1000);
    return () => clearTimeout(id);
  }, [user]);

  if (user) return null;
  return (
    <div className="min-h-[90vh] pt-12 px-4 ">
      <form dir="auto" onSubmit={handleSignIn} className="w-full max-w-md mx-auto space-y-6">
        <div>
          <img src="/img/logo.png" alt="Arab Local market Logo" className="h-auto w-24 mx-auto " />

          <h1 className="mt-6 text-center text-2xl font-bold ">{content.h1[lang]}</h1>
        </div>

        <div className="-space-y-px rounded-md shadow-sm">
          <EmailInputField full lang={lang} cls="text-lg rounded-t-md cd_hr" inCls="rounded-t-md" />
          <PswInputField full lang={lang} cls="" inCls="text-lg cd_hr rounded-b-md" />
        </div>

        <div className="text-sm text-right">
          <Link
            href="forget-password"
            className="inline-block font-medium underline underline-offset-4 hover:text-pc2">
            {content.forget[lang]}
          </Link>
        </div>

        <div>
          <Button type="submit" disabled={loading} loading={loading} cls="text-base w-full py-2">
            {content.submit[lang]}
          </Button>
        </div>

        <div className="text-sm text-left">
          <Link
            href="signup"
            className="inline-block font-medium underline underline-offset-4 hover:text-pc2">
            {content.createAccount[lang]}
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
