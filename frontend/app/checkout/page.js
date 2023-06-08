"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../app-session-context";
import { request } from "../(service)/api-provider";
import Modal from "../(component)/(styled)/modal";
import { Button } from "../(component)/(styled)/button";
import { CheckInput, CheckCard } from "../(component)/(styled)/inputs";
import SvgIcon from "../(component)/(styled)/svg-icon";
import AddressInputs from "../(component)/address-inputs";
import { NameInputField, PhoneInputField } from "../(component)/custom-inputs";
import OnDeliveryPaymentMethods from "./on-delivery-payment-methods";
import OnlinePaymentMethods from "./online-payment-methods";
import shdCnt from "../(layout)/json/shared-content.json";
const q =
  "?fields=subscriptionStatus,name,deliver,deliveryCost,currency,whatsAppOrder,meta&populate=address,payments";

export default function Checkout({}) {
  const router = useRouter();
  const { lang, user, addMessage } = useContext(AppSessionContext);

  const [loading, setLoading] = useState(false);
  const [store, setStore] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState(null);
  const [confirmCheckout, setConfirmCheckout] = useState(false);
  const [addressForm, setAddressForm] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [paymentType, setPaymentType] = useState("ON-DELIVERY");
  const [paymentMethod, setPaymentMethod] = useState();
  const items = useRef(JSON.parse(window.localStorage.getItem("checkoutItems"))).current;

  const validateOrder = () => {
    if (!deliveryMethod) {
      setLoading(false);
      setConfirmCheckout(false);
      return addMessage({ type: "warning", text: content.deliveryErr[lang], duration: 4 });
    }
    if (deliveryMethod == "delivery" && !address) {
      setLoading(false);
      setConfirmCheckout(false);
      return addMessage({ type: "warning", text: content.adrErr[lang], duration: 4 });
    }
    if (!paymentMethod) {
      setLoading(false);
      setConfirmCheckout(false);
      return addMessage({ type: "warning", text: content.payErr[lang], duration: 4 });
    }

    if (!store.payments.find((p) => p.type == paymentType && p.method == paymentMethod)) {
      setLoading(false);
      setConfirmCheckout(false);
      return addMessage({ type: "warning", text: content.payNotSupportErr[lang], duration: 4 });
    }
    return true;
  };

  const handleCreateAddress = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { country, province, city } = store.address;
      const data = { country, province, city };
      new FormData(e.target).forEach((value, key) => (data[key] = value));
      setAddress(data);
    } catch (err) {
      addMessage({ type: "error", text: err.message, duration: 5 });
    }

    setLoading(false);
    setAddressForm(false);
  };

  const sendOrderViaWhatsApp = (e) => {
    if (!validateOrder()) return e.preventDefault();

    let total = 0;

    const its = items.reduce((t, it, i) => {
      total += +it.price * +it.quantity;
      return t + `\n*${i + 1}-* ${it.barcode}: ${it.title} *(${store.currency}${it.price} × ${it.quantity})*`;
    }, "");
    const payment = content.paymentMethods[paymentType == "ONLINE" ? "online" : "onDelivery"];
    const deliveryMethods = content.deliveryMethods.find((p) => p.text.en == deliveryMethod);
    const adr = `
${firstName} ${lastName}
${address?.line1 || ""} ${address?.line2 || ""}
${address?.postalCode || ""} ${address?.city || ""}
${address?.province ? address.province + "," : ""} ${address?.country || ""}`;

    e.target.href =
      `https://api.whatsapp.com/send/?phone=${store.meta?.phone}&text=` +
      encodeURI(
        whatsAppOrder[lang](
          its,
          store.currency + total,
          deliveryMethods.text[lang],
          payment.text[lang],
          payment.methods[paymentMethod][lang],
          adr.trim()
        )
      );
  };

  const handleBuy = async () => {
    setLoading(true);
    try {
      if (!validateOrder()) return;
      const lineItems = items.map(({ productNumber, barcode, quantity }) => ({
        productNumber,
        barcode,
        quantity,
      }));

      const order = {
        storeId: store.id,
        lineItems,
        payment: { type: paymentType, method: paymentMethod.toUpperCase() },
        delivery: deliveryMethod,
        address: { firstName, lastName, ...(address || {}) },
      };

      order.customer = JSON.parse(window.localStorage.getItem("customer")) || null;
      const { customer } = await request("order", "POST", { data: order });
      if (!user) window.localStorage.setItem("customer", JSON.stringify(customer));
      router.replace("/checkout/success");
    } catch (err) {
      addMessage({ type: "error", text: err.message, duration: 5 });
      router.replace("/checkout/error");
    }
    setLoading(false);
    setConfirmCheckout(false);
  };

  const fetchStore = async () => {
    try {
      const res = await request("store", "GET", { query: `/${items[0].storeId}${q}` });
      res.data.attributes.id = res.data.id;
      res.data.attributes.currency = res.data.attributes.currency.split("-")[0];
      res.data.attributes.payments.forEach((p) => {
        p.method = p.method.toLowerCase();
        if (p.method == "cash") p.color = 5;
        if (p.method == "bank") p.color = 1;
        if (p.method == "card") {
          p.icon = "creditCard";
          p.color = 7;
        }
      });
      setStore(res.data.attributes);
    } catch (err) {
      addMessage({ type: "error", text: err.message, duration: 5 });
    }
  };

  useEffect(() => {
    if (items || items[0]) fetchStore();
    if (user) {
      if (user.address) setAddress(user.address);
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
    }
  }, [user]);

  if (!items || !items[0]) return router.replace("/");
  if (!store) return null;
  return (
    <article className="py-8">
      <h1 className="mb-4 text-xl font-medium text-center">
        {content.h1[lang]} ( {items.length} )
      </h1>

      <div className="flex md:w-1/2 my-8 mx-auto -space-x-px">
        <NameInputField
          full
          first
          lang={lang}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          cls="1 relative w-1/2"
          inCls="text-lg rounded"
        />
        <span className="w-2"></span>
        <NameInputField
          full
          lang={lang}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          cls="2 relative w-1/2"
          inCls="text-lg rounded"
        />
      </div>

      <h3 className="mb-4 text-lg font-medium">{content.deliveryH3[lang]}</h3>

      <section className="flex justify-center items-center lazy-b">
        {/* Todo: if store.deliver then show delivery option. */}
        {content.deliveryMethods.map(({ text, icon, cls }, i) => (
          <CheckCard
            type="radio"
            name="delivery"
            checked={deliveryMethod == text.en}
            onChange={() => setDeliveryMethod(text.en)}
            required
            key={i}
            cls="w-44 py-1 flex flex-col justify-center items-center mx-1 space-y-3">
            <div className={"w-auto h-[40px] " + cls}>
              <SvgIcon name={icon} />
            </div>
            <div className="capitalize">{text[lang]}</div>
          </CheckCard>
        ))}
      </section>

      {deliveryMethod === "delivery" && (
        <section className="">
          {!store.deliver ? (
            <p className="mt-8 text-center text-orange">{content.noDelivery[lang]}</p>
          ) : address ? (
            <>
              <h3 className="mt-6 text-lg font-medium">{content.addressH3[lang]}</h3>
              <div className="flex flex-wrap">
                <CheckCard
                  type="radio"
                  Tag="address"
                  name="address"
                  title={content.savedAdr[lang]}
                  required
                  checked
                  onChange={() => {}}
                  cls="w-1/2 md:w-44 m-2 p-3 w-full md:w-1/2 lg:w-1/3">
                  <h6 className="font-medium" dir="ltr">
                    {firstName} {lastName}
                  </h6>
                  <p dir="ltr">
                    {address.line1} {address.line2 || ""}
                    <br />
                    {address.postalCode} {address.city}
                    <br /> {address.province} {address.country}
                  </p>
                </CheckCard>
              </div>
            </>
          ) : (
            <>
              <p className="mt-8 text-center text-sm">{content.addressP[lang]}</p>
              <Button
                icon="plus"
                cls="mt-6 !flex w-40 mx-auto !py-2 !rounded-full"
                onClick={() => setAddressForm(true)}>
                {shdCnt.newAdr[lang]}
              </Button>
            </>
          )}

          <Modal
            lang={lang}
            tag="form"
            title={shdCnt.newAdr[lang]}
            okBtn={shdCnt.create[lang]}
            onCancel={() => setAddressForm(false)}
            onSubmit={handleCreateAddress}
            onApprove={() => {}}
            loading={loading}
            open={addressForm}>
            <div className="px-1 mt-5">
              <PhoneInputField full lang={lang} cls="4 mb-2 relative shadow-sm" inCls="text-lg rounded-md" />
              <AddressInputs
                lang={lang}
                country={store?.address.country}
                province={store?.address.province}
                city={store?.address.city}
                onError={(text) => addMessage({ type: "error", text, duration: 5 })}
                checkout
                map
              />
            </div>
          </Modal>
        </section>
      )}

      <section className="pt-6 mb-6 lazy-b">
        <h3 className="mb-3 text-lg font-medium">{content.paymentH3[lang]}</h3>
        <div className="md:w-1/2 mx-auto flex justify-evenly">
          <CheckInput
            type="radio"
            name="payment-methods"
            checked={paymentType == "ONLINE"}
            onChange={() => setPaymentType("ONLINE")}>
            {content.paymentMethods.online.text[lang]}
          </CheckInput>
          <CheckInput
            type="radio"
            name="payment-methods"
            checked={paymentType == "ON-DELIVERY"}
            onChange={() => setPaymentType("ON-DELIVERY")}>
            {content.paymentMethods.onDelivery.text[lang]}
          </CheckInput>
        </div>

        <section className="min-h-[250px] card px-2 py-3 mt-4 rounded-md lazy-b">
          {paymentType === "ON-DELIVERY" ? (
            <OnDeliveryPaymentMethods
              lang={lang}
              cnt={content}
              payments={store.payments}
              paymentMethod={paymentMethod}
              selectPayment={setPaymentMethod}
            />
          ) : (
            <>
              <div className="flex lazy-b">
                {Object.keys(content.paymentMethods.online.methods).map((method, i) => (
                  <CheckCard
                    type="radio"
                    name="payment"
                    checked={paymentMethod == method}
                    onChange={() => setPaymentMethod(method)}
                    title={content.paymentMethods.online.methods[method].title[lang]}
                    cls="w-1/2 md:w-44 !h-10 mx-1 flex justify-center items-center"
                    key={i}>
                    <span className={`h-[25px] ${method != "card" ? "" : "mx-1"}`}>
                      <SvgIcon name={method == "card" ? "creditCard" : "bank"} />
                    </span>
                    {content.paymentMethods.online.methods[method][lang]}
                  </CheckCard>
                ))}
              </div>
              <OnlinePaymentMethods
                lang={lang}
                cnt={content}
                payments={store.payments}
                selected={paymentMethod}
                showMsg={addMessage}
              />
            </>
          )}
        </section>
      </section>

      <div dir="ltr" className="fixed bottom-0 right-0 left-0 h-12 flex">
        <button
          type="button"
          onClick={() => setConfirmCheckout(true)}
          dir="ltr"
          className="flex-1 flex justify-center items-center bg-pc text-t text-lg font-medium hover:text-red transition">
          <span className="text-red mx-2">
            {store.currency}
            {items.reduce((total, item) => total + item.price * item.quantity, 0)}
          </span>
          {content.payBtn[lang]}
        </button>
        {store.whatsAppOrder && store.meta?.phone && (
          <a
            onClick={sendOrderViaWhatsApp}
            href={`https://api.whatsapp.com/send/?phone=${store.meta?.phone}&text=`}
            rel="noopener noreferrer"
            target="_blank"
            alt={content.whatsAppSand[lang]}
            title={content.whatsAppSand[lang]}
            className="w-12 flex px-2 bg-pc hover:text-red border-l-[1px] border-blur transition">
            <SvgIcon name="whatsapp" />
          </a>
        )}
      </div>

      <Modal
        lang={lang}
        title={content.confirmTitle[lang]}
        okBtn={shdCnt.yes[lang]}
        onCancel={() => setConfirmCheckout(false)}
        onApprove={handleBuy}
        loading={loading}
        open={confirmCheckout}>
        <p className="my-5">{content.confirmP[lang][0]}</p>
        <p className="my-5">{content.confirmP[lang][1]}</p>
      </Modal>
    </article>
  );
}

const whatsAppOrder = {
  en: (items, total, deliveryMethod, type, method, address) => `Hi!
I would like to order the following items.
${items}

*Total:* ${total}

*Delivery type:* ${deliveryMethod}

*Payment method:* ${type} - ${method}

${!address ? "" : "*Address:*"}
${address || ""}
`,

  ar: (items, total, deliveryMethod, type, method, address) => `مرحبا!
أود أن أطلب العناصر التالية.
${items}

*المجموع:* ${total}

*نوع التوصيل:* ${deliveryMethod}

*طريقة الدفع:* ${type} - ${method}

${!address ? "" : "*العنوان:*"}
${address || ""}
`,
};

const content = {
  h1: { en: "items", ar: "عناصر" },
  deliveryH3: { en: "Please select delivery method", ar: "الرجاء تحديد طريقة التسليم" },
  noDelivery: { en: "This store does not have delivery", ar: "هذا المتجر لا يوجد لديه توصيل" },
  deliveryMethods: [
    { text: { en: "pickup", ar: "التقاط" }, icon: "personPushingCart", cls: "" },
    { text: { en: "delivery", ar: "توصيل" }, icon: "foodDeliverBike", cls: "p-1" },
  ],
  addressH3: { en: "Saved Addresses", ar: "العناوين المحفوظة" },
  addressP: { en: "Seems you haven't added your address yet", ar: "يبدو أنك لم تقم بإضافة عنوانك حتى الآن" },
  savedAdr: { en: "Saved Address", ar: "العنوان المحفوظ" },
  adrErr: { en: "Please fill in your address", ar: "يرجى ملء عنوانك" },
  deliveryErr: { en: "Please select a delivery method", ar: "الرجاء تحديد طريقة التسليم" },
  payErr: { en: "Please select a payment method", ar: "الرجاء اختيار طريقة الدفع" },
  payNotSupportErr: {
    en: "Selected payment method is not accepted by the store",
    ar: "لا يقبل المتجر طريقة الدفع المحددة",
  },
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
        card: {
          en: "Credit card",
          ar: "بطاقة إئتمان",
          title: {
            en: "Credit card and other online payment methods",
            ar: "بطاقة الائتمان وطرق الدفع الأخرى عبر الإنترنت",
          },
        },
        bank: {
          en: "Bank Transfer",
          ar: "التحويل المصرفي",
          title: {
            en: "Bank transfer to the seller bank's account",
            ar: "التحويل البنكي لحساب البائع البنكي",
          },
        },
      },
    },
  },
  noOnDeliveryPay: {
    en: "This store does not accept on delivery payment",
    ar: "هذا المتجر لا يقبل الدفع عند التسليم",
  },
  noOnlinePay: {
    en: "This store does not accept online payment",
    ar: "هذا المتجر لا يدعم الدفع عبر الإنترنت",
  },
  noBankPay: {
    en: "This store does not accept bank transfer payment",
    ar: "هذا المتجر لا يقبل الدفع عن طريق التحويل المصرفي",
  },
  noBankPayPrivate: {
    en: "Only signed in users can use this payment method",
    ar: "فقط اللمستخدمين الذين سجلوا الدخول يمكنهم استخدام طريقة الدفع هذه",
  },
  payBtn: { en: "Pay", ar: "ادفع" },
  confirmTitle: { en: "Order confirmation", ar: "تأكيد الطلب" },
  confirmP: {
    en: [
      "Please make sure you hav entered the address and phone number correctly so the delivery man can reach you",
      "Are you sure you want to confirm this order?",
    ],
    ar: [
      "يرجى التأكد من إدخال العنوان ورقم الهاتف بشكل صحيح حتى يتمكن عامل التوصيل من الوصول إليك",
      "هل أنت متأكد أنك تريد تأكيد هذا الطلب؟",
    ],
  },
  whatsAppSand: { en: "Send the order via WhatsApp", ar: "أرسل الطلب عبر الواتساب" },
};
