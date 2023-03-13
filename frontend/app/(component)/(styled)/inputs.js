import { useState } from "react";
import SvgIcon from "./svg-icon";

export function InputField({ editable, cls, inCls, onChange, onBlur, ...p }) {
  const [changed, setChanged] = useState(false);

  const handleChange = (e) => {
    setChanged(true);
    if (onChange) onChange(e);
  };

  const handleBlur = (e) => {
    setChanged(false);
    if (onBlur) onBlur(e);
  };

  return (
    <label htmlFor={p.name} className={"block " + (editable && "relative ") + cls}>
      <span className="sr-only">{p.title || p.name}</span>
      <input
        id={p.name}
        placeholder={p.title || p.name}
        aria-label={p.title || p.name}
        className={`block peer w-full bg-cbg appearance-none border border-bc px-3 py-2 card ${
          editable ? "pr-12" : "cd_hr"
        } fs ${inCls || "rounded-md"}`}
        {...p}
        onChange={editable ? handleChange : onChange}
        onBlur={editable ? handleBlur : onBlur}
      />
      {/* <p className="absolute -top-5 pl-2 bg-lbg black h-0 peer-invalid:h-auto text-red text-sm">
          Please provide a valid email address.
        </p> */}

      {editable && (
        <span
          className={`block absolute top-0 right-0 w-[42px] p-${
            changed ? 2 : 3
          } cursor-pointer hover:text-red duration-150`}>
          <SvgIcon name={changed ? "checkMark" : "edit"} />
        </span>
      )}
    </label>
  );
}

export function Radio({ children, size = "20", color = "red", cls, ...p }) {
  const checkSize = Math.round(+size / 3);
  const checkBorder = Math.round(+size / 5);

  return (
    <label htmlFor={p.name} className={`flex justify-center items-center ${cls}`}>
      <div className={`relative w-[${size}px] h-[${size}px] flex justify-center items-center`}>
        <input
          type="radio"
          id={p.name}
          aria-label={p.title || p.name}
          className="peer absolute top-0 left-0 w-full h-full appearance-none bg-bc dark:bg-cbg border border-bf rounded-full cursor-pointer"
          {...p}
        />
        <span
          className={`box-content w-[${checkSize}px] h-[${checkSize}px] border-0 border-${color} rounded-full peer-checked:border-[${checkBorder}px] duration-150`}></span>
      </div>
      {children && <span className="mx-1">{children}</span>}
    </label>
  );
}

export function RadioCard({ Tag = "label", children, cls, ...p }) {
  return (
    <Tag className={`relative w-1/2 md:w-44 h-24 bg-cbg rounded-lg card cd_hr ${cls || ""}`}>
      <input
        type="radio"
        aria-label={p.title || p.name}
        className="absolute top-0 left-0 w-full h-full appearance-none border-pc bg-[rgb(0,0,0,0.1)] dark:bg-blur checked:bg-[transparent] dark:checked:bg-[transparent] checked:border-4 rounded-lg fs"
        {...p}
      />
      {children}
    </Tag>
  );
}

export function Textarea({ cls, ...p }) {
  return (
    <textarea
      dir="auto"
      autoComplete="on"
      className={"w-full h-40 mt-3 p-2 card cd_hr fs rounded-md " + cls}
      {...p}></textarea>
  );
}

export function NameInputField({ lang, first, ...p }) {
  const t = first ? content.firstName[lang] : content.lastName[lang];

  return (
    <InputField
      type="text"
      name={first ? "firstName" : "lastName"}
      required
      min="4"
      max="15"
      autoComplete={first ? "given-name" : "family-name"}
      placeholder={t}
      title={t}
      {...p}
    />
  );
}

export function EmailInputField({ lang, ...p }) {
  return (
    <InputField
      type="email"
      name="email"
      required
      min="10"
      max="30"
      autoComplete="email"
      placeholder={content.email[lang]}
      title={content.email[lang]}
      {...p}
    />
  );
}
export function PhoneInputField({ lang, ...p }) {
  return (
    <InputField
      type="tel"
      name="phone"
      required
      min="10"
      max="15"
      pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
      autoComplete="tel"
      placeholder={content.phone[lang]}
      title={content.phone[lang]}
      {...p}
    />
  );
}
export function PswInputField({ lang, confirm, ...p }) {
  const newProps = { ...p, ...(!confirm ? {} : { name: "confirmPassword", autoComplete: "new-password" }) };
  const t = !confirm ? content.password[lang] : content.confirmPassword[lang];
  return (
    <InputField
      type="password"
      name="password"
      required
      min="9"
      max="50"
      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
      autoComplete="current-password"
      placeholder={t}
      title={t}
      {...newProps}
    />
  );
}

const content = {
  firstName: { en: "First name", ar: "الاسم" },
  lastName: { en: "Last name", ar: "اسم العائلة" },
  // username: { en: "Username", ar: "اسم المستخدم" } ,
  email: { en: "Email address", ar: "البريد الإلكتروني" },
  phone: { en: "Phone number", ar: "رقم الهاتف" },
  password: { en: "Password", ar: "كلمة المرور" },
  confirmPassword: { en: "Confirm Password", ar: "تأكيد كلمة المرور" },
};
