"use client";
import { useContext, useState } from "react";
import Button from "../(component)/(styled)/button";
import { RadioCard } from "../(component)/(styled)/inputs";
import Modal from "../(component)/(styled)/modal";
import SvgIcon from "../(component)/(styled)/svg-icon";
import { AppSessionContext } from "../app-session-context";
import { Address } from "./(component)/address";

export default function Checkout({}) {
  const { loading, setLoading, lang, user } = useContext(AppSessionContext);

  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [address, setAddress] = useState("pickup");
  const [addressForm, setAddressForm] = useState(false);

  const handleBuy = () => {
    console.log("handleBuy: ");
  };

  return (
    <article className="py-8">
      <h3 className="mb-3 text-lg font-medium">Select delivery method</h3>

      <section className="flex justify-center items-center space-x-2">
        {/* Todo: if store.deliver then show delivery option. */}
        {[
          { t: "pickup", icon: "personPushingCart" },
          { t: "delivery", icon: "foodDeliverBike" },
        ].map(({ t, icon }, i) => (
          <RadioCard
            tag="label"
            name="delivery"
            onCheck={() => setDeliveryMethod(t)}
            required
            key={i}
            cls="flex flex-col justify-center items-center">
            <div className="h-1/3 ">
              <SvgIcon name={icon} />
            </div>
            <div className="capitalize">{t}</div>
          </RadioCard>
        ))}
      </section>

      {deliveryMethod === "delivery" && (
        <section className="pb-8 ">
          {addresses ? (
            <>
              <h3 className="mt-6 mb-3 text-lg font-medium">Saved Addresses</h3>

              {addresses.map((adr, i) => (
                <Address {...adr} onCheck={() => setAddress(adr.id)} key={i} />
              ))}
            </>
          ) : (
            <p className="mt-8 text-center text-sm">Seems you have added your address yet.</p>
          )}

          <Modal
            title="New Addresses"
            okBtn="Create"
            onCancel={() => setAddressForm(false)}
            onApprove={() => setAddressForm(false)}
            open={addressForm}>
            <p>Show inputs </p>
          </Modal>

          <Button
            text="New address"
            icon="plus"
            cls="mt-6 !flex w-40 mx-auto !py-2 !rounded-full"
            handler={() => setAddressForm(true)}
          />
        </section>
      )}

      <div>
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
        className="fixed bottom-0 right-0 left-0 h-12 flex justify-center items-center bg-pc text-t text-lg font-medium hover:text-red duration-200">
        {content.payBtn[lang]}
      </button>
    </article>
  );
}

const content = {
  payBtn: { en: "Pay", ar: "دفع" },
};

const addresses = [
  {
    firstName: "Mr",
    lastName: "Tester",
    line1: "street 1",
    line2: "av-1",
    city: "Amsterdam",
    country: "Netherlands",
  },
];
