"use client";
import { CheckCard } from "../../(component)/(styled)/inputs";
import Badge from "../../(component)/(styled)/badge";

export default function OnDeliveryPaymentMethods({ lang, cnt, payments, paymentMethod, selectPayment }) {
  const methods = payments
    .filter((p) => p.type == "ON-DELIVERY")
    .map((p, i) => (
      <CheckCard
        type="radio"
        name="payment"
        checked={paymentMethod == p.method}
        onChange={() => selectPayment(p.method)}
        title={cnt.paymentMethods.online.methods[p.method]?.title[lang]}
        cls="mx-1 !p-0 w-initial !rounded-full flex"
        inCls="!rounded-full"
        key={i}>
        <Badge
          text={cnt.paymentMethods.onDelivery.methods[p.method][lang]}
          icon={p.icon || p.method}
          color={p.color}
          cls="!m-0 !py-1 !px-2"
        />
      </CheckCard>
    ));
  return methods[0] ? (
    <>
      <p className="pb-3 mt-6 mb-3 mx-2 ">{cnt.paymentMethods.p[lang]}</p>
      <div className="mb-3 flex lazy-c">{methods}</div>
    </>
  ) : (
    <p className="w-full mt-6 mb-3 text-orange text-center">{cnt.noOnDeliveryPay[lang]}</p>
  );
}
