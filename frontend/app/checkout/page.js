"use client";
import { useContext, useState } from "react";
import { Button } from "../(component)/(styled)/button";
import { RadioCard } from "../(component)/(styled)/inputs";
import Modal from "../(component)/(styled)/modal";
import SvgIcon from "../(component)/(styled)/svg-icon";
import { AppSessionContext } from "../app-session-context";
import { AddressInputs } from "../(component)/address-inputs";

export default function Checkout({}) {
  const { lang, user } = useContext(AppSessionContext);

  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [selectedAddress, setSelectedAddress] = useState("pickup");
  const [loading, setLoading] = useState(false);
  const [addressForm, setAddressForm] = useState(false);

  const addresses = fakeAddresses;

  const handleCreateAddress = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAddressForm(false);
    }, 1000);
  };

  const handleBuy = () => {
    console.log("handleBuy: ");
  };

  return (
    <article className="py-8">
      <h3 className="mb-3 text-lg font-medium">{content.deliveryH3[lang]}</h3>

      <section className="flex justify-center items-center lazy-c">
        {/* Todo: if store.deliver then show delivery option. */}
        {[
          { text: { en: "pickup", ar: "التقط" }, icon: "personPushingCart" },
          { text: { en: "delivery", ar: "توصيل" }, icon: "foodDeliverBike" },
        ].map(({ text, icon }, i) => (
          <RadioCard
            Tag="label"
            name="delivery"
            onChange={() => setDeliveryMethod(text.en)}
            required
            key={i}
            cls="flex flex-col justify-center items-center mx-1">
            <div className="h-1/3 ">
              <SvgIcon name={icon} />
            </div>
            <div className="capitalize">{text[lang]}</div>
          </RadioCard>
        ))}
      </section>

      {deliveryMethod === "delivery" && (
        <section className="pb-8 ">
          {addresses ? (
            <>
              <h3 className="mt-6 mb-3 text-lg font-medium">{content.addressH3[lang]}</h3>

              {addresses.map((adr, i) => (
                <RadioCard
                  key={i}
                  Tag="address"
                  name="address"
                  title="Saved Address"
                  onChange={() => setSelectedAddress(adr.id)}
                  required
                  cls="p-3 w-auto md:w-1/2">
                  <h6 className="font-medium" dir="ltr">
                    {adr.firstName} {adr.lastName}
                  </h6>
                  <p dir="ltr">
                    {adr.line1} {adr.line2 || ""},<br />
                    {adr.zipCode} {adr.city}, {adr.country}
                  </p>
                </RadioCard>
              ))}
            </>
          ) : (
            <p className="mt-8 text-center text-sm">Seems you have added your address yet.</p>
          )}

          <Modal
            tag="form"
            title="New Addresses"
            // title="Shipping Information"
            okBtn="Create"
            onCancel={() => setAddressForm(false)}
            onSubmit={handleCreateAddress}
            loading={loading}
            open={addressForm}>
            <AddressInputs lang={lang} />
          </Modal>

          <Button
            text={content.addressBtn[lang]}
            icon="plus"
            cls="mt-6 !flex w-40 mx-auto !py-2 !rounded-full"
            handler={() => setAddressForm(true)}
          />
        </section>
      )}

      <div className="mt-10">
        <h3>Payment methods!</h3>
        Show the available methods tabs
        <br />
        in person cash, card
        <br />
        Online Credit card, Bank transfer
      </div>

      <button
        onClick={handleBuy}
        dir="ltr"
        className="fixed bottom-0 right-0 left-0 h-12 flex justify-center items-center bg-pc text-t text-lg font-medium fs hover:text-red duration-200">
        {content.payBtn[lang]}
      </button>
    </article>
  );
}

const content = {
  deliveryH3: { en: "Please select delivery method", ar: "الرجاء تحديد طريقة التسليم" },
  addressH3: { en: "Saved Addresses", ar: "العناوين المحفوظة" },
  addressBtn: { en: "New address", ar: "عنوان جديد" },
  payBtn: { en: "Pay", ar: "دفع" },
};

const fakeAddresses = [
  {
    firstName: "Mr",
    lastName: "Tester",
    line1: "street 1",
    line2: "av-1",
    city: "Amsterdam",
    country: "Netherlands",
  },
];
