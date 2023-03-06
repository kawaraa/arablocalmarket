"use client";
import { useContext, useState } from "react";
import { AppSessionContext } from "../app-session-context";

export default function Login({ a }) {
  const { lang } = useContext(AppSessionContext);

  const handleSignIn = () => {
    console.log("handleSignIn: ");
  };
  return (
    // <div>
    //   <form>
    //     <label className="block">
    //       <span className="block text-sm font-medium text-slate-700">Email</span>

    //       <input type="email" className="peer ..." />
    //       <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
    //         Please provide a valid email address.
    //       </p>
    //     </label>
    //   </form>
    // </div>
    // dir="auto"
    <div className="min-h-[90vh] flex justify-center pt-12 px-4 ">
      <form dir="auto" onSubmit={handleSignIn} className="w-full max-w-md space-y-6">
        <div>
          <img src="logo.svg" alt="Arab Local market Logo" className="h-auto w-14 mx-auto " />
          <h1 className="mt-6 text-center text-3xl font-bold ">{data.h1.text[lang]}</h1>
        </div>

        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="email-address" className="sr-only">
              {data.email.text[lang]}
            </label>
            <input
              id="email-address"
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder={data.email.text[lang]}
              className="block w-full bg-bg dark:bg-cbg appearance-none border border-bc px-3 py-2 rounded-t-md sm:text-sm cd_hr"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              {data.password.text[lang]}
            </label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              required
              placeholder={data.password.text[lang]}
              className="block w-full bg-cbg appearance-none border border-bc px-3 py-2 rounded-b-md sm:text-sm cd_hr"
            />
          </div>
        </div>

        <div className="text-sm text-right">
          <a href="#" className="inline-block font-medium text-t hover:text-pc2">
            {data.forget.text[lang]}
          </a>
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md bg-dbg text-dt hover:bg-pc hover:text-t dark:bg-pc dark:text-t dark:hover:bg-lbg duration-200">
            {data.submit.text[lang]}
          </button>
        </div>

        <div className="text-sm text-left">
          <a href="#" className="inline-block font-medium text-t hover:text-pc2">
            {data.createAccount.text[lang]}
          </a>
        </div>
      </form>
    </div>
  );
}

const data = {
  h1: { text: { en: "Sign in to your account", ar: "تسجيل الدخول إلى حسابك" } },
  email: { text: { en: "Email address", ar: "البريد الإلكتروني" } },
  password: { text: { en: "Password", ar: "كلمة المرور" } },
  forget: { text: { en: "Forgot your password?", ar: "هل نسيت كلمة المرور؟" } },
  submit: { text: { en: "Sign in", ar: "تسجيل الدخول" } },
  createAccount: { text: { en: "Create an account", ar: "إنشاء حساب" } },
};
