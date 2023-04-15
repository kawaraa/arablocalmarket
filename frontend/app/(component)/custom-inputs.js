"use client";
import { useState } from "react";
import categories from "../(layout)/json/categories.json";
import shdCnt from "../(layout)/json/shared-content.json";
import { IconButton } from "./(styled)/button";
import { CheckCard, InputField, InputWithSelect, Select } from "./(styled)/inputs";

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
      pattern="^(\+|00|0)\d{10,13}$"
      autoComplete="tel"
      placeholder="E.g. +31639793297"
      title={content.phone[lang]}
      {...p}
    />
  );
}
export function PswInputField({ lang, confirm, cls, ...p }) {
  const [visible, setVisible] = useState(false);

  const newProps = { ...p, ...(!confirm ? {} : { name: "confirmPassword", autoComplete: "new-password" }) };
  const t = !confirm ? content.password[lang] : content.confirmPassword[lang];
  return (
    <InputField
      type={visible ? "text" : "password"}
      name="password"
      required
      min="9"
      max="50"
      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
      autoComplete="current-password"
      placeholder={t}
      title={t}
      cls={"items-center " + cls}
      {...newProps}>
      <IconButton icon="eye" onClick={() => setVisible(!visible)} className="absolute right-2 w-5 z-1" />
    </InputField>
  );
}
export function PriceInputField({ lang, compare, ...p }) {
  const t = compare ? content.comparePrice[lang] : content.price[lang];
  return (
    <InputField
      type="number"
      name={compare ? "comparePrice" : "price"}
      required
      min="0"
      max="1000"
      step="0.10"
      inputMode="numeric"
      pattern="\d*"
      autoComplete="one"
      placeholder={compare ? "11.50" : "10.50"}
      title={t}
      label={t}
      {...p}
    />
  );
}
export function WeightInputField({ lang, label, ...p }) {
  return (
    <InputWithSelect
      label={!label ? null : content.weight.text[lang]}
      options={Object.keys(content.weight.units).map((unit) => ({
        key: unit,
        text: content.weight.units[unit][lang] || unit,
      }))}
      {...p}
    />
  );
}

export function CurrencySelect({ lang, label, ...p }) {
  return (
    <Select
      name="currency"
      title={content.currencies.text[lang]}
      cls="flex items-center"
      inCls="mx-1 !p-[2px] rounded-full"
      {...p}
      label={!label ? null : content.currencies.text[lang]}>
      {content.currencies.values.map((currency, i) => (
        <option value={currency} key={i}>
          {currency}
        </option>
      ))}
    </Select>
  );
}
export function DaysCheckButtons({ lang, checkedDays, onCheck, ...p }) {
  return (
    <div className="flex flex-wrap my-3">
      {shdCnt.day.values.map((d, i) => (
        <CheckCard
          type="checkbox"
          // name={d.en}
          checked={!!checkedDays.find(({ day }) => day == d.en)}
          key={i}
          cls="flex justify-center items-center flex-1 m-1 py-2 px-2 capitalize"
          {...p}
          onChange={(e) => onCheck({ name: d.en, checked: e.target.checked })}>
          {d[lang]}
        </CheckCard>
      ))}
    </div>
  );
}
export function OpeningHoursSelect({ lang, time, ...p }) {
  return (
    <Select label={shdCnt[time][lang]} cls="mx-1 flex items-center" inCls="mx-1 !p-[2px] rounded-full" {...p}>
      {shdCnt.periods.map((period, i) =>
        content.times.map((time, ii) => (
          <option value={period.en + "-" + time} key={i + ii}>
            {time} {period[lang]}
          </option>
        ))
      )}
    </Select>
  );
}
export function DayOpeningHours({ lang, day, onDayUpdate }) {
  const updateOpen = ({ target }) => {
    onDayUpdate({ ...day, open: target.value });
  };
  const updateClose = ({ target }) => {
    onDayUpdate({ ...day, close: target.value });
  };

  return (
    <div className="mb-2">
      <h6 className="mb-1 w-[80px]">{shdCnt.day.values.find((d) => d.en == day.day)[lang]}</h6>
      <div className="flex justify-evenly">
        <OpeningHoursSelect lang={lang} time="open" defaultValue={day?.open} onChange={updateOpen} />
        <OpeningHoursSelect lang={lang} time="close" defaultValue={day?.close} onChange={updateClose} />
      </div>
    </div>
  );
}

export function CategorySelect({ lang, ...p }) {
  return (
    <Select
      name="category"
      label={content.categories.text[lang]}
      cls="flex items-center"
      inCls="mx-1 !p-[2px] rounded-full"
      {...p}>
      {content.categories.values.map((v, i) => (
        <option value={v.key} key={i}>
          {v.text[lang]}
        </option>
      ))}
    </Select>
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
  price: { en: "Price", ar: "السعر" },
  comparePrice: { en: "Compare price", ar: "السعر المقارن" },
  weight: {
    text: { en: "Weight", ar: "الوزن" },
    units: { G: { ar: "جرام" }, KG: { ar: "كغ" }, OZ: { ar: "وقية" }, LBS: { ar: "رطل" } },
  },
  currencies: {
    text: { en: "Currency", ar: "العملة" },
    values: ["$-USD", "€-EUR", "£-GBP", "$-AUD", "$-CAD", "CHF-CHF", "₺-TRY"],
  },
  categories: {
    text: { en: "Category", ar: "الفئة" },
    values: categories,
  },
  times: [
    "12.00",
    "12.15",
    "12.30",
    "12.45",
    "01.00",
    "01.15",
    "01.30",
    "01.45",
    "02.00",
    "02.15",
    "02.30",
    "02.45",
    "03.00",
    "03.15",
    "03.30",
    "03.45",
    "04.00",
    "04.15",
    "04.30",
    "04.45",
    "05.00",
    "05.15",
    "05.30",
    "05.45",
    "06.00",
    "06.15",
    "06.30",
    "06.45",
    "07.00",
    "07.15",
    "07.30",
    "07.45",
    "08.00",
    "08.15",
    "08.30",
    "08.45",
    "09.00",
    "09.15",
    "09.30",
    "09.45",
    "10.00",
    "10.15",
    "10.30",
    "10.45",
    "11.00",
    "11.15",
    "11.30",
    "11.45",
  ],
};
