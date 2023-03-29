"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppSessionContext } from "../app-session-context";
import { Button } from "../(component)/(styled)/button";
import { InputField } from "../(component)/(styled)/inputs";

export default function Signin({ a }) {
  const router = useRouter();
  const { lang, user, updateUser } = useContext(AppSessionContext);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    e.preventDefault();
    // const {jwt, user} = await fetch("url");
    // updateUser(user)
    // Todo: Adjust Strapi tp make return the jwt in the cookie as well with "HttpOnly"
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies
    console.log("handleSignIn: ");
  };

  if (user) {
    router.push("/");
    return null;
  }
  return (
    <div className="min-h-[90vh] pt-12 px-4 ">
      <form dir="auto" onSubmit={handleSignIn} className="w-full max-w-md mx-auto space-y-6">
        <div>
          <img src="logo.svg" alt="Arab Local market Logo" className="h-auto w-14 mx-auto " />
          <h1 className="mt-6 text-center text-2xl font-bold ">{content.h1[lang]}</h1>
        </div>

        <div className="-space-y-px rounded-md shadow-sm">
          <InputField
            type="email"
            name="email"
            required
            min="10"
            max="30"
            full
            title={content.email[lang]}
            autoComplete="email"
            inCls="text-lg rounded-t-md cd_hr"
          />

          <InputField
            type="password"
            name="password"
            required
            min="10"
            max="30"
            full
            title={content.password[lang]}
            autoComplete="current-password"
            inCls="text-lg rounded-b-md cd_hr"
          />
        </div>

        <div className="text-sm text-right">
          <Link
            href="forget-password"
            className="inline-block font-medium underline underline-offset-4 hover:text-pc2">
            {content.forget[lang]}
          </Link>
        </div>

        <div>
          <Button type="submit" handler={null} loading={false} cls="text-base w-full py-2">
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
  password: { en: "Password", ar: "كلمة المرور" },
  forget: { en: "Forgot your password?", ar: "هل نسيت كلمة المرور؟" },
  submit: { en: "Sign in", ar: "تسجيل الدخول" },
  createAccount: { en: "Create an account", ar: "إنشاء حساب" },
};
