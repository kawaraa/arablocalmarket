"use client";

import { useContext, useState } from "react";
import { AppSessionContext } from "../app-session-context";
import { InputField, NumberInputField, Select, Textarea, ToggleSwitch } from "../(component)/(styled)/inputs";
import { AddressInputs } from "../(component)/address-inputs";
import { CurrencySelect, DayOpeningHours, DaysCheckButtons } from "../(component)/custom-inputs";
import { Button } from "../(component)/(styled)/button";

export default function CreateStore({ params, searchParams }) {
  const { lang } = useContext(AppSessionContext);
  const [days, setDays] = useState([]);
  const [deliver, setDeliver] = useState(false);
  // console.log("CreateStore: >>>", params, searchParams);

  const addDay = ({ target: { name, checked } }) => {
    const newDays = days.filter((d) => d.name !== name);
    if (!checked) setDays(newDays);
    else if (checked && days.length == newDays.length) setDays([...days, { name, open: "", close: "" }]);
  };

  const updateDay = (day) => {
    console.log(day);
  };

  return (
    <form className="mb-12">
      <h1 className="text-xl text-center mt-8 mb-5">{content.h1[lang]}</h1>
      <InputField type="text" name="name" title="Store name" required min="4" max="30" cls="mb-2" />
      <Textarea name="about" cls="" />
      <CurrencySelect lang={lang} required min="0" step="0.5" />
      {/* <InputField type="number" title={content.delivery[lang]} /> */}
      <ToggleSwitch checked={deliver} onCheck={({ checked }) => setDeliver(checked)} title="Deliver" />
      <div>{deliver && <NumberInputField value={0} onChange={null} inCls="w-12" />}</div>
      <AddressInputs lang={lang} />
      {days.map((d, i) => (
        <DayOpeningHours lang={lang} day={d} onDayUpdate={updateDay} key={i} />
      ))}
      <DaysCheckButtons lang={lang} checkedDays={days} onChange={addDay} />
      <ToggleSwitch checked={deliver} onCheck={({ checked }) => setDeliver(checked)} title="Open" />
      online and On delivery
      {/* cover, payments, status, cocNumber, vatNumber */}
      <Button text="Create" type="submit" />
    </form>
  );
}

const content = {
  h1: { en: "Create store", ar: "إنشاء متجر" },
  delivery: { en: "Delivery", ar: "توصيل" },
};
