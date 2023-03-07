"use client";
import { useContext, useState } from "react";
import Link from "next/link";
import { AppSessionContext } from "../app-session-context";
import Button from "../(component)/(styled)/button";

export default function Signin({ a }) {
  const { lang } = useContext(AppSessionContext);

  const handleSignin = () => {
    e.preventDefault();

    console.log("handleSignin: ");
  };
  return (
    <div className="min-h-[90vh] pt-12 px-4 ">
      <form dir="auto" onSubmit={handleSignin} className="w-full max-w-md mx-auto space-y-6">
        <div>
          <img src="logo.svg" alt="Arab Local market Logo" className="h-auto w-14 mx-auto " />
          <h1 className="mt-6 text-center text-2xl font-bold ">{content.h1[lang]}</h1>
        </div>

        <div className="-space-y-px rounded-md shadow-sm">
          <div className="relative">
            <label htmlFor="email-address" className="sr-only">
              {content.email[lang]}
            </label>
            <input
              id="email-address"
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder={content.email[lang]}
              className="block peer w-full bg-bg dark:bg-cbg appearance-none border border-bc px-3 py-2 rounded-t-md cd_hr"
            />
            {/* <p className="absolute -top-5 pl-2 bg-lbg black h-0 peer-invalid:h-auto text-red text-sm">
              Please provide a valid email address.
            </p> */}
          </div>
          <div className="relative">
            <label htmlFor="password" className="sr-only">
              {content.password[lang]}
            </label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              required
              placeholder={content.password[lang]}
              className="block pear w-full bg-cbg appearance-none border border-bc px-3 py-2 rounded-b-md cd_hr"
            />
            {/* <p className="absolute -bottom-0 pl-2 bg-lbg black h-0 peer-invalid:h-auto text-red text-sm">
              Please provide a valid email address.
            </p> */}
          </div>
        </div>

        <div className="text-sm text-right">
          <Link
            href="forget-password"
            className="inline-block font-medium underline underline-offset-4 hover:text-pc2">
            {content.forget[lang]}
          </Link>
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
