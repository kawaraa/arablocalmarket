"use client";

import { useContext } from "react";
import { AppSessionContext } from "../app-session-context";
import { InputField, Textarea } from "../(component)/(styled)/inputs";
import { AddressInputs } from "../(component)/address-inputs";

export default function CreateStore({ params, searchParams }) {
  const { lang } = useContext(AppSessionContext);
  console.log("CreateStore: >>>", params, searchParams);

  return (
    <form>
      <h1 className="text-xl text-center mt-8 mb-5">Create store form</h1>
      <InputField type="text" name="name" title="Store name" required min="4" max="30" cls="mb-2" />
      <Textarea name="about" />
      <AddressInputs lang={lang} />
      <div>
        <Select lang={lang} name="day" cls="" />
        <Select lang={lang} name="open" cls="" />
        <Select lang={lang} name="close" cls="" />
      </div>
      cover, openingHours, currency, deliver, shippingRate, payments, status, cocNumber, vatNumber
    </form>
  );
}

function Select({ lang, cls, ...p }) {
  // autoComplete="day"
  return (
    <label htmlFor={p.name}>
      {content[p.name][lang]}
      <select
        id={p.name}
        required
        title={p.title || p.name}
        aria-label={p.title || p.name}
        className={"block bg-cbg w-1/2 px-3 py-2 card cd_hr fs rounded-l-md " + cls}
        {...p}>
        {/open|close/gim.test(p.name)
          ? content.times.map((time) => (
              <option value={time.clock}>
                {time.clock} {time[lang]}
              </option>
            ))
          : content[p.name].values.map((v) => <option value={v.en}>{v[lang]}</option>)}
      </select>
    </label>
  );
}

const content = {
  day: {
    en: "Day",
    ar: "يوم",
    values: [
      { en: "Monday", ar: "الإثنين" },
      { en: "Tuesday", ar: "الثلاثاء" },
      { en: "Wednesday", ar: "الأربعاء" },
      { en: "Thursday", ar: "الخميس" },
      { en: "Friday", ar: "الجمعة" },
      { en: "Saturday", ar: "السبت" },
      { en: "Sunday", ar: "الأحد" },
    ],
  },
  open: { en: "Opens", ar: "يفتح" },
  close: { en: "Closes", ar: "يغلق" },
  times: [
    { clock: "01.00", en: "AM", ar: "صباحًا" },
    { clock: "01.15", en: "AM", ar: "صباحًا" },
    { clock: "01.30", en: "AM", ar: "صباحًا" },
    { clock: "01.45", en: "AM", ar: "صباحًا" },
    { clock: "02.00", en: "AM", ar: "صباحًا" },
    { clock: "02.15", en: "AM", ar: "صباحًا" },
    { clock: "02.30", en: "AM", ar: "صباحًا" },
    { clock: "02.45", en: "AM", ar: "صباحًا" },
    { clock: "03.00", en: "AM", ar: "صباحًا" },
    { clock: "03.15", en: "AM", ar: "صباحًا" },
    { clock: "03.30", en: "AM", ar: "صباحًا" },
    { clock: "03.45", en: "AM", ar: "صباحًا" },
    { clock: "04.00", en: "AM", ar: "صباحًا" },
    { clock: "04.15", en: "AM", ar: "صباحًا" },
    { clock: "04.30", en: "AM", ar: "صباحًا" },
    { clock: "04.45", en: "AM", ar: "صباحًا" },
    { clock: "05.00", en: "AM", ar: "صباحًا" },
    { clock: "05.15", en: "AM", ar: "صباحًا" },
    { clock: "05.30", en: "AM", ar: "صباحًا" },
    { clock: "05.45", en: "AM", ar: "صباحًا" },
    { clock: "06.00", en: "AM", ar: "صباحًا" },
    { clock: "06.15", en: "AM", ar: "صباحًا" },
    { clock: "06.30", en: "AM", ar: "صباحًا" },
    { clock: "06.45", en: "AM", ar: "صباحًا" },
    { clock: "07.00", en: "AM", ar: "صباحًا" },
    { clock: "07.15", en: "AM", ar: "صباحًا" },
    { clock: "07.30", en: "AM", ar: "صباحًا" },
    { clock: "07.45", en: "AM", ar: "صباحًا" },
    { clock: "08.00", en: "AM", ar: "صباحًا" },
    { clock: "08.15", en: "AM", ar: "صباحًا" },
    { clock: "08.30", en: "AM", ar: "صباحًا" },
    { clock: "08.45", en: "AM", ar: "صباحًا" },
    { clock: "09.00", en: "AM", ar: "صباحًا" },
    { clock: "09.15", en: "AM", ar: "صباحًا" },
    { clock: "09.30", en: "AM", ar: "صباحًا" },
    { clock: "09.45", en: "AM", ar: "صباحًا" },
    { clock: "10.00", en: "AM", ar: "صباحًا" },
    { clock: "10.15", en: "AM", ar: "صباحًا" },
    { clock: "10.30", en: "AM", ar: "صباحًا" },
    { clock: "10.45", en: "AM", ar: "صباحًا" },
    { clock: "11.00", en: "AM", ar: "صباحًا" },
    { clock: "11.15", en: "AM", ar: "صباحًا" },
    { clock: "11.30", en: "AM", ar: "صباحًا" },
    { clock: "11.45", en: "AM", ar: "صباحًا" },
    { clock: "12.00", en: "AM", ar: "صباحًا" },
    { clock: "12.15", en: "AM", ar: "صباحًا" },
    { clock: "12.30", en: "AM", ar: "صباحًا" },
    { clock: "12.45", en: "AM", ar: "صباحًا" },
    { clock: "01.00", en: "PM", ar: "مساءً" },
    { clock: "01.15", en: "PM", ar: "مساءً" },
    { clock: "01.30", en: "PM", ar: "مساءً" },
    { clock: "01.45", en: "PM", ar: "مساءً" },
    { clock: "02.00", en: "PM", ar: "مساءً" },
    { clock: "02.15", en: "PM", ar: "مساءً" },
    { clock: "02.30", en: "PM", ar: "مساءً" },
    { clock: "02.45", en: "PM", ar: "مساءً" },
    { clock: "03.00", en: "PM", ar: "مساءً" },
    { clock: "03.15", en: "PM", ar: "مساءً" },
    { clock: "03.30", en: "PM", ar: "مساءً" },
    { clock: "03.45", en: "PM", ar: "مساءً" },
    { clock: "04.00", en: "PM", ar: "مساءً" },
    { clock: "04.15", en: "PM", ar: "مساءً" },
    { clock: "04.30", en: "PM", ar: "مساءً" },
    { clock: "04.45", en: "PM", ar: "مساءً" },
    { clock: "05.00", en: "PM", ar: "مساءً" },
    { clock: "05.15", en: "PM", ar: "مساءً" },
    { clock: "05.30", en: "PM", ar: "مساءً" },
    { clock: "05.45", en: "PM", ar: "مساءً" },
    { clock: "06.00", en: "PM", ar: "مساءً" },
    { clock: "06.15", en: "PM", ar: "مساءً" },
    { clock: "06.30", en: "PM", ar: "مساءً" },
    { clock: "06.45", en: "PM", ar: "مساءً" },
    { clock: "07.00", en: "PM", ar: "مساءً" },
    { clock: "07.15", en: "PM", ar: "مساءً" },
    { clock: "07.30", en: "PM", ar: "مساءً" },
    { clock: "07.45", en: "PM", ar: "مساءً" },
    { clock: "08.00", en: "PM", ar: "مساءً" },
    { clock: "08.15", en: "PM", ar: "مساءً" },
    { clock: "08.30", en: "PM", ar: "مساءً" },
    { clock: "08.45", en: "PM", ar: "مساءً" },
    { clock: "09.00", en: "PM", ar: "مساءً" },
    { clock: "09.15", en: "PM", ar: "مساءً" },
    { clock: "09.30", en: "PM", ar: "مساءً" },
    { clock: "09.45", en: "PM", ar: "مساءً" },
    { clock: "10.00", en: "PM", ar: "مساءً" },
    { clock: "10.15", en: "PM", ar: "مساءً" },
    { clock: "10.30", en: "PM", ar: "مساءً" },
    { clock: "10.45", en: "PM", ar: "مساءً" },
    { clock: "11.00", en: "PM", ar: "مساءً" },
    { clock: "11.15", en: "PM", ar: "مساءً" },
    { clock: "11.30", en: "PM", ar: "مساءً" },
    { clock: "11.45", en: "PM", ar: "مساءً" },
    { clock: "12.00", en: "PM", ar: "مساءً" },
    { clock: "12.15", en: "PM", ar: "مساءً" },
    { clock: "12.30", en: "PM", ar: "مساءً" },
    { clock: "12.45", en: "PM", ar: "مساءً" },
  ],
};
