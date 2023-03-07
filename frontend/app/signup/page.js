"use client";
import { useContext, useState } from "react";
import { AppSessionContext } from "../app-session-context";
import Button from "../(component)/(styled)/button";

export default function Signup({ a }) {
  const { lang } = useContext(AppSessionContext);

  const handleSignup = (e) => {
    e.preventDefault();
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
          <div className="relative w-1/2">
            <label htmlFor="first-name" className="sr-only">
              {content.firstName[lang]}
            </label>
            <input
              id="first-name"
              type="text"
              name="firstName"
              autoComplete="given-name"
              required
              placeholder={content.firstName[lang]}
              className="block peer w-full bg-bg dark:bg-cbg appearance-none border border-bc px-3 py-2 rounded-l-md cd_hr"
            />
          </div>
          <div className="relative w-1/2">
            <label htmlFor="last-name" className="sr-only">
              {content.lastName[lang]}
            </label>
            <input
              id="last-name"
              type="text"
              name="lastName"
              autoComplete="family-name"
              required
              placeholder={content.lastName[lang]}
              className="block pear w-full bg-cbg appearance-none border border-bc px-3 py-2 rounded-r-md cd_hr"
            />
          </div>
        </div>

        <div className="relative shadow-sm">
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
            className="block peer w-full bg-bg dark:bg-cbg appearance-none border border-bc px-3 py-2 rounded-md cd_hr"
          />
          {/* <p className="absolute -top-5 pl-2 bg-lbg black h-0 peer-invalid:h-auto text-red text-sm">
          Please provide a valid email address.
        </p> */}
        </div>

        <div className="relative shadow-sm">
          <label htmlFor="phone" className="sr-only">
            {content.phone[lang]}
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            required
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            placeholder={content.phone[lang]}
            className="block pear w-full bg-cbg appearance-none border border-bc px-3 py-2 rounded-md cd_hr"
          />
          {/* <p className="absolute -bottom-0 pl-2 bg-lbg black h-0 peer-invalid:h-auto text-red text-sm">
          Please provide a valid phone number.
        </p> */}
        </div>

        <div className="flex -space-x-px shadow-sm">
          <div className="relative w-1/2">
            <label htmlFor="password" className="sr-only">
              {content.email[lang]}
            </label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              required
              placeholder={content.password[lang]}
              className="block peer w-full bg-bg dark:bg-cbg appearance-none border border-bc px-3 py-2 rounded-l-md cd_hr"
            />
          </div>
          <div className="relative w-1/2">
            <label htmlFor="confirm-password" className="sr-only">
              {content.confirmPassword[lang]}
            </label>
            <input
              id="confirm-password"
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              required
              placeholder={content.confirmPassword[lang]}
              className="block pear w-full bg-cbg appearance-none border border-bc px-3 py-2 rounded-r-md cd_hr"
            />
          </div>
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
