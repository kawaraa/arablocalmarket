"use client";

import { useContext, useState } from "react";
import { AppSessionContext } from "../../app-session-context";
import {
  InputField,
  NumberInputWithControl,
  Textarea,
  ToggleSwitch,
} from "../../(component)/(styled)/inputs";
import { AddressInputs } from "../../(component)/address-inputs";
import { CurrencySelect, DayOpeningHours, DaysCheckButtons } from "../../(component)/custom-inputs";
import { Button } from "../../(component)/(styled)/button";
import Collapse from "../../(component)/collapse";
import ImageUpload from "../../(component)/(styled)/upload-image";
// import Tooltip from "../(component)/(styled)/tooltip";

export default function NewStore({ params, searchParams }) {
  const { lang } = useContext(AppSessionContext);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState([]);
  const [deliver, setDeliver] = useState(false);
  const [onDeliveryPayment, setOnDeliveryPayment] = useState(null);
  const [onlinePayment, setOnlinePayment] = useState(null);
  const [status, setStatus] = useState(false);

  // console.log("NewStore: >>>", params, searchParams);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const addDay = ({ target: { name, checked } }) => {
    const newDays = days.filter((d) => d.name !== name);
    if (!checked) setDays(newDays);
    else if (checked && days.length == newDays.length) setDays([...days, { name, open: "", close: "" }]);
  };

  const updateDay = (day) => {
    console.log(day);
  };

  return (
    <form className="mb-12 mx-auto md:w-[70%] lg:w-[650px]">
      <h1 className="text-xl text-center my-2">{content.h1[lang]}</h1>

      {/* cover */}
      <ImageUpload id="store-cover" name="image" />

      <InputField
        type="text"
        name="name"
        placeholder="E.g. alm-store"
        required
        min="4"
        max="30"
        full
        cls="mb-2">
        <span className="block mb-1 font-semibold rq">Store name</span>
      </InputField>

      <Textarea
        name="about"
        title="Write something about your store, E.g. Welcome to our supermarket, ..."
        cls=""
      />

      <div className="my-6 md:flex md:justify-between">
        <div className="flex justify-between">
          <CurrencySelect lang={lang} required cls="mx-0" />

          <ToggleSwitch name="deliver" checked={deliver} onCheck={({ checked }) => setDeliver(checked)}>
            <div className="mx-3">Deliver</div>
          </ToggleSwitch>
        </div>

        {deliver && (
          <NumberInputWithControl
            value={0}
            onChange={null}
            required
            cls="w-full md:w-auto my-3 md:my-0"
            inCls="w-12"
            label={<label className="flex-1 md:flex-initial md:mx-2 ">Delivery rate</label>}
          />
        )}
      </div>

      <h6 className="mb-2  font-semibold rq">Store Address</h6>
      <AddressInputs lang={lang} />

      <h6 className="font-semibold mt-7 rq">Working days</h6>
      <DaysCheckButtons lang={lang} checkedDays={days} onChange={addDay} />
      <div className="my-5">
        {days.map((d, i) => (
          <DayOpeningHours lang={lang} day={d} onDayUpdate={updateDay} key={i} />
        ))}
      </div>

      <ToggleSwitch
        name="status"
        checked={status}
        onCheck={({ checked }) => setStatus(checked)}
        cls="!flex my-6">
        <div className="flex-1">This store will be open from now.</div>
      </ToggleSwitch>

      <h6 className="font-semibold mt-7 rq">Payment methods</h6>
      <Collapse
        title="Do you want to accept on delivery payment?"
        cls="my-3"
        hCls="rounded-t-lg"
        checked={!!onDeliveryPayment}
        onCheck={() => setOnDeliveryPayment(onDeliveryPayment ? null : { cash: true })}>
        <div>
          <ToggleSwitch
            name="onDeliveryCash"
            checked={!!onDeliveryPayment?.cash}
            onCheck={({ checked }) => setOnDeliveryPayment({ ...(onDeliveryPayment || {}), cash: checked })}
            cls="!flex my-3">
            <div className="flex-1">I accept cash payment.</div>
          </ToggleSwitch>

          <ToggleSwitch
            name="onDeliveryCard"
            checked={!!onDeliveryPayment?.card}
            onCheck={({ checked }) => setOnDeliveryPayment({ ...(onDeliveryPayment || {}), card: checked })}
            cls="!flex my-3">
            <div className="flex-1">I accept credit card payment.</div>
          </ToggleSwitch>

          <ToggleSwitch
            name="onDeliveryBank"
            checked={!!onDeliveryPayment?.bank}
            onCheck={({ checked }) => setOnDeliveryPayment({ ...(onDeliveryPayment || {}), bank: checked })}
            cls="!flex my-3">
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
          name="online"
          checked={!!onlinePayment?.card}
          onCheck={({ checked }) => setOnlinePayment({ ...(onlinePayment || {}), card: checked })}
          cls="!flex my-5">
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
          <InputField
            type="text"
            name="accountHolder"
            label="Account holder"
            placeholder="E.g. John Doe"
            required
            full
            cls="my-1"
          />
          <InputField
            type="text"
            name="iban"
            label="Account Number / IBAN"
            placeholder="E.g. FI21 1234 5698 7654 3210"
            required
            full
            cls="my-1"
          />
          <InputField
            type="text"
            name="bic"
            label="BIC / Swift"
            title="Bank Identifier Number"
            placeholder="E.g. BOHIUS77"
            required
            full
            cls="my-1"
          />
        </Collapse>
      </Collapse>

      <h6 className="font-semibold mt-7">Business details</h6>
      <InputField
        type="text"
        name="cocNumber"
        label="COC Number"
        placeholder="E.g. 9876543"
        full
        cls="mt-1 mb-3"
      />
      <InputField type="text" name="vatNumber" label="VAT Number" placeholder="E.g. US52359525" full />

      <Button text="Create" type="submit" cls="w-full my-5" />
    </form>
  );
}

const content = {
  h1: { en: "Create store", ar: "إنشاء متجر" },
  delivery: { en: "Delivery", ar: "توصيل" },
};
