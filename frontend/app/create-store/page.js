"use client";

import { useContext, useState } from "react";
import { AppSessionContext } from "../app-session-context";
import { InputField, NumberInputField, Select, Textarea, ToggleSwitch } from "../(component)/(styled)/inputs";
import { AddressInputs } from "../(component)/address-inputs";
import { CurrencySelect, DayOpeningHours, DaysCheckButtons } from "../(component)/custom-inputs";
import { Button } from "../(component)/(styled)/button";
import Collapse from "../(component)/collapse";

export default function CreateStore({ params, searchParams }) {
  const { lang } = useContext(AppSessionContext);
  const [days, setDays] = useState([]);
  const [deliver, setDeliver] = useState(false);
  const [onDeliveryPayment, setOnDeliveryPayment] = useState(null);
  const [onlinePayment, setOnlinePayment] = useState(null);
  // const [cash, setCash] = useState(false);
  // const [card, setCard] = useState(false);
  // const [bank, setBank] = useState(false);
  const [status, setStatus] = useState(false);

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
      <ToggleSwitch checked={status} onCheck={({ checked }) => setStatus(checked)} cls="!flex">
        <div className="w-full">This store will be open from now.</div>
      </ToggleSwitch>

      <Collapse
        title="Do you want to accept on delivery payment?"
        cls="mb-3"
        hCls="rounded-t-lg"
        checked={!!onDeliveryPayment}
        onCheck={() => setOnDeliveryPayment(onDeliveryPayment ? null : { cash: true })}>
        <div>
          <ToggleSwitch
            checked={!!onDeliveryPayment?.cash}
            onCheck={({ checked }) => setOnDeliveryPayment({ ...(onDeliveryPayment || {}), cash: checked })}
            cls="!flex mb-2">
            <div className="flex-1">I accept cash payment.</div>
          </ToggleSwitch>

          <ToggleSwitch
            checked={!!onDeliveryPayment?.card}
            onCheck={({ checked }) => setOnDeliveryPayment({ ...(onDeliveryPayment || {}), card: checked })}
            cls="!flex mb-2">
            <div className="flex-1">I accept credit card payment.</div>
          </ToggleSwitch>

          <ToggleSwitch
            checked={!!onDeliveryPayment?.bank}
            onCheck={({ checked }) => setOnDeliveryPayment({ ...(onDeliveryPayment || {}), bank: checked })}
            cls="!flex mb-2">
            <div className="flex-1">I accept bank transfer payment.</div>
          </ToggleSwitch>
        </div>
      </Collapse>

      <Collapse
        title="Do you want to accept online payment?"
        hCls="rounded-t-lg"
        checked={!!onlinePayment}
        onCheck={() => setOnlinePayment(onlinePayment ? null : { bank: {} })}>
        <ToggleSwitch
          checked={!!onlinePayment?.card}
          onCheck={({ checked }) => setOnlinePayment({ ...(onlinePayment || {}), card: checked })}
          cls="!flex mb-2">
          <div className="flex-1">I accept credit card payment.</div>
        </ToggleSwitch>

        <Collapse
          title="I accept bank transfer payment."
          // cls="-m-2"
          hCls="rounded-t-lg"
          checked={!!onlinePayment?.bank}
          onCheck={() =>
            setOnlinePayment({ ...(onlinePayment || {}), bank: onlinePayment?.bank ? null : {} })
          }>
          <h6 className="font-semibold">Bank account details</h6>
          <p>
            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as
            a welcome guest in many households across the world.
          </p>
        </Collapse>
      </Collapse>
      {/* cover, payments, status, cocNumber, vatNumber */}
      <Button text="Create" type="submit" />
    </form>
  );
}

const content = {
  h1: { en: "Create store", ar: "إنشاء متجر" },
  delivery: { en: "Delivery", ar: "توصيل" },
};
