"use client";
import { useContext, useState } from "react";
import { AppSessionContext } from "../app-session-context";
import { Button } from "../(component)/(styled)/button";
import { InputField } from "../(component)/(styled)/inputs";

export default function Signup({ a }) {
  const { lang } = useContext(AppSessionContext);

  const handleSignup = (e) => {
    e.preventDefault();
    // /auth/local/register

    console.log("handleSignup: ", e);
  };

  return (
    <div className="min-h-[90vh] pt-12 px-4 ">
      <form dir="auto" onSubmit={handleSignup} className="w-full max-w-md mx-auto space-y-6">
        <div>
          <img src="logo.svg" alt="Arab Local market Logo" className="h-auto w-14 mx-auto " />
          <h1 className="mt-6 text-center text-2xl font-bold ">{content.h1[lang]}</h1>
        </div>

        <div className="flex -space-x-px shadow-sm">
          <InputField
            type="text"
            name="firstName"
            required
            autoComplete="given-name"
            placeholder={content.firstName[lang]}
            title={content.firstName[lang]}
            cls="relative w-1/2"
            inCls="rounded-l-md"
          />

          <InputField
            type="text"
            name="lastName"
            required
            autoComplete="family-name"
            placeholder={content.lastName[lang]}
            title={content.lastName[lang]}
            cls="relative w-1/2"
            inCls="rounded-r-md"
          />
        </div>

        <InputField
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder={content.email[lang]}
          title={content.email[lang]}
          cls="relative shadow-sm"
        />

        <InputField
          type="tel"
          name="phone"
          required
          autoComplete="tel"
          placeholder={content.phone[lang]}
          pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
          title={content.phone[lang]}
          cls="relative shadow-sm"
        />

        <div className="flex -space-x-px shadow-sm">
          <InputField
            type="password"
            name="password"
            required
            autoComplete="current-password"
            placeholder={content.password[lang]}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title={content.password[lang]}
            cls="relative w-1/2"
            inCls="rounded-l-md"
          />

          <InputField
            type="password"
            name="confirmPassword"
            required
            autoComplete="new-password"
            placeholder={content.confirmPassword[lang]}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title={content.confirmPassword[lang]}
            cls="relative w-1/2"
            inCls="rounded-r-md"
          />
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
      </form>
    </div>
  );
}

const content = {
  h1: { en: "Create a new account", ar: "انشاء حساب جديد" },
  firstName: { en: "First name", ar: "الاسم" },
  lastName: { en: "Last name", ar: "اسم العائلة" },
  // username: { en: "Username", ar: "اسم المستخدم" } ,
  email: { en: "Email address", ar: "البريد الإلكتروني" },
  phone: { en: "Phone number", ar: "رقم الهاتف" },
  password: { en: "Password", ar: "كلمة المرور" },
  confirmPassword: { en: "Confirm Password", ar: "تأكيد كلمة المرور" },
  submit: { en: "Create", ar: "إنشاء حساب" },
};
