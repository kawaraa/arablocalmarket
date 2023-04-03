"use client";
import { useContext, useState } from "react";
import { Button } from "../(component)/(styled)/button";
import { CheckInput, CheckCard } from "../(component)/(styled)/inputs";
import Modal from "../(component)/(styled)/modal";
import SvgIcon from "../(component)/(styled)/svg-icon";
import { AppSessionContext } from "../app-session-context";
import { AddressInputs } from "../(component)/address-inputs";
import Badge from "../(component)/(styled)/badge";

export default function Checkout({}) {
  const { lang, user } = useContext(AppSessionContext);

  const [loading, setLoading] = useState(false);
  const [addressForm, setAddressForm] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState("on-delivery");
  const [selectedPayment, setSelectedPayment] = useState("bank-transfer");
  const [addresses, setAddresses] = useState(fakeAddresses);

  const store = { currency: "€" };
  const total = 40;

  const handleCreateAddress = (e) => {
    e.preventDefault();

    setLoading(true);
    const data = {};

    new FormData(e.target).forEach((value, key) => (data[key] = value));

    setAddresses([...addresses, data]);

    setTimeout(() => {
      setLoading(false);
      setAddressForm(false);
    }, 1000);
  };

  const handleBuy = () => {
    // Todo: Only the logged in users can order products with on delivery options
    // redirect to a success page with a message says E.g.: Please note: if you chose pay on delivery and the delivery man can find you or you don't come to collect your order, you will be baned after 3 times
    console.log("handleBuy: ");
  };

  return (
    <article className="py-8">
      <h3 className="mb-2 text-lg font-medium">{content.deliveryH3[lang]}</h3>

      <section className="flex justify-center items-center lazy-c">
        {/* Todo: if store.deliver then show delivery option. */}
        {[
          { text: { en: "pickup", ar: "التقط" }, icon: "personPushingCart" },
          { text: { en: "delivery", ar: "توصيل" }, icon: "foodDeliverBike" },
        ].map(({ text, icon }, i) => (
          <CheckCard
            type="radio"
            name="delivery"
            onChange={() => setDeliveryMethod(text.en)}
            required
            key={i}
            cls="flex flex-col justify-center items-center mx-1 space-y-3">
            <div className="h-1/3 ">
              <SvgIcon name={icon} />
            </div>
            <div className="capitalize">{text[lang]}</div>
          </CheckCard>
        ))}
      </section>

      {deliveryMethod === "delivery" && (
        <section className="">
          {addresses ? (
            <>
              <h3 className="mt-6 text-lg font-medium">{content.addressH3[lang]}</h3>

              <div className="flex flex-wrap">
                {addresses.map((adr, i) => (
                  <CheckCard
                    type="radio"
                    Tag="address"
                    name="address"
                    title="Saved Address"
                    onChange={() => setSelectedAddress(adr.id)}
                    required
                    key={i}
                    cls="m-2 p-3 w-full md:w-1/2 lg:w-1/3">
                    <h6 className="font-medium" dir="ltr">
                      {adr.firstName} {adr.lastName}
                    </h6>
                    <p dir="ltr">
                      {adr.line1} {adr.line2 || ""},<br />
                      {adr.postalCode} {adr.city}, {adr.country}
                    </p>
                  </CheckCard>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="mt-8 text-center text-sm">Seems you have added your address yet.</p>
              <Button
                icon="plus"
                cls="mt-6 !flex w-40 mx-auto !py-2 !rounded-full"
                onClick={() => setAddressForm(true)}>
                {content.addressBtn[lang]}
              </Button>
            </>
          )}

          <Modal
            tag="form"
            title="New Addresses"
            // title="Shipping Information"
            okBtn="Create"
            onCancel={() => setAddressForm(false)}
            onSubmit={handleCreateAddress}
            onApprove={() => {}}
            loading={loading}
            open={addressForm}>
            <AddressInputs lang={lang} />
          </Modal>
        </section>
      )}

      <section className="pt-6 mb-6 lazy-c">
        <h3 className="mb-1 text-lg font-medium">{content.paymentH3[lang]}</h3>
        <div className="md:w-1/2 mx-auto flex justify-evenly">
          <CheckInput
            type="radio"
            name="payment-methods"
            checked={selectedPaymentMethods == "online"}
            onChange={() => setSelectedPaymentMethods("online")}>
            {content.paymentMethods.online.text[lang]}
          </CheckInput>
          <CheckInput
            type="radio"
            name="payment-methods"
            checked={selectedPaymentMethods == "on-delivery"}
            onChange={() => setSelectedPaymentMethods("on-delivery")}>
            {content.paymentMethods.onDelivery.text[lang]}
          </CheckInput>
        </div>

        <section className="card p-3 mt-4 rounded-md lazy-c">
          <p className="pb-3 mt-6 mb-3 mx-2 border-b-[1px] border-bc">{content.paymentMethods.p[lang]}</p>
          {selectedPaymentMethods === "on-delivery" ? (
            <div className="mb-3 flex lazy-c">
              <Badge
                text={content.paymentMethods.onDelivery.methods.cash[lang]}
                icon="cash"
                color={5}
                cls=""
              />
              <Badge
                text={content.paymentMethods.onDelivery.methods.card[lang]}
                icon="creditCard"
                color={7}
                cls=""
              />
              <Badge
                text={content.paymentMethods.onDelivery.methods.bank[lang]}
                icon="bank"
                color={1}
                cls=""
              />
            </div>
          ) : (
            <>
              <div className="flex lazy-c">
                <CheckCard
                  type="radio"
                  name="payment"
                  checked={selectedPayment == "card"}
                  onChange={() => setSelectedPayment("card")}
                  title="Credit card and other online payment methods"
                  aria-label="Credit card and other online payment methods"
                  cls="!h-10 mx-1 flex justify-center items-center">
                  <span className="h-[25px] ">
                    <SvgIcon name="creditCard" />
                  </span>
                  {content.paymentMethods.online.methods.card[lang]}
                </CheckCard>
                <CheckCard
                  type="radio"
                  name="payment"
                  checked={selectedPayment == "bank-transfer"}
                  onChange={() => setSelectedPayment("bank-transfer")}
                  title="Make a bank transfer to the seller bank's account"
                  aria-label="Make a bank transfer to the seller bank's account"
                  cls="!h-10 mx-1 flex justify-center items-center">
                  <span className="h-[25px]">
                    <SvgIcon name="bank" />
                  </span>
                  {content.paymentMethods.online.methods.bank[lang]}
                </CheckCard>
              </div>
              <div className="mb-3 lazy-c">
                {selectedPayment == "card" ? (
                  <div className="lazy-r">
                    <img src="/credit-card-inputs.png" />
                  </div>
                ) : (
                  <dl className="mt-6 lazy-c">
                    <dt className="">Account holder</dt>
                    <dd className=" flex justify-between items-center text-blue cursor-pointer">
                      A Kawara
                      <span className="inline-block w-6">
                        <SvgIcon name="copy" />
                      </span>
                    </dd>
                    <dt className="">Account Number / IBAN</dt>
                    <dd className="flex justify-between items-center text-blue cursor-pointer">
                      ING06B887823483542
                      <span className="inline-block w-6">
                        <SvgIcon name="copy" />
                      </span>
                    </dd>
                    <dt className="">BIC / Swift</dt>
                    <dd className="flex justify-between items-center text-blue cursor-pointer">
                      FJENKXX
                      <span className="inline-block w-6">
                        <SvgIcon name="copy" />
                      </span>
                    </dd>
                  </dl>
                )}
              </div>
            </>
          )}
        </section>
      </section>

      <button
        onClick={handleBuy}
        dir="ltr"
        className="fixed bottom-0 right-0 left-0 h-12 flex justify-center items-center bg-pc text-t text-lg font-medium hover:text-red duration-200">
        <span className="text-red mx-2">
          {store.currency}
          {total}
        </span>
        {content.payBtn[lang]}
      </button>
    </article>
  );
}

const content = {
  deliveryH3: { en: "Please select delivery method", ar: "الرجاء تحديد طريقة التسليم" },
  addressH3: { en: "Saved Addresses", ar: "العناوين المحفوظة" },
  addressBtn: { en: "New address", ar: "عنوان جديد" },
  paymentH3: { en: "Payment methods", ar: "طرق الدفع" },
  paymentMethods: {
    p: {
      en: "This store provides the following payment methods",
      ar: "يوفر هذا المتجر طرق الدفع التالية",
    },
    onDelivery: {
      text: { en: "On delivery", ar: "عند التسليم" },
      methods: {
        cash: { en: "Cash", ar: "نقدي" },
        card: { en: "Card", ar: "بطاقة" },
        bank: { en: "Bank Transfer", ar: "تحويل" },
      },
    },
    online: {
      text: { en: "Online", ar: "عبر الإنترنت" },
      methods: {
        card: { en: "Credit card", ar: "بطاقة إئتمان" },
        bank: { en: "Bank Transfer", ar: "التحويل المصرفي" },
      },
    },
  },

  payBtn: { en: "Pay", ar: "ادفع" },
};

const fakeAddresses = [
  {
    line1: "Govert Flinckstraat",
    line2: "2",
    postalCode: "1072 EE",
    city: "Amsterdam",
    province: "north holland",
    country: "Netherlands",
  },
];
