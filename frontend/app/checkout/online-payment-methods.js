"use client";
import SvgIcon from "../(component)/(styled)/svg-icon";
import shdCnt from "../(layout)/json/shared-content.json";

export default function OnlinePaymentMethods({ lang, cnt, user, payments, selected }) {
  const cardMethod = payments.find((p) => p.type == "ONLINE" && p.method == "card");
  const bankMethod = payments.find((p) => p.type == "ONLINE" && p.method == "bank");

  return (
    <>
      <div className="mb-3 lazy-b">
        {selected == "card" ? (
          <div className="lazy-b">
            <p className="mt-8 text-center text-orange">{cnt.noOnlinePay[lang]}</p>
            {/* {!cardMethod.meta ? (
                <p className="mt-8 text-center text-orange">{cnt.noOnlinePay[lang]}</p>
              ) : (
                <>
                Todo: here goes the third party payment provider form E.g. Stripe.
                Payment provider Form
                </>
              )} */}
          </div>
        ) : !bankMethod?.meta ? (
          <p className="mt-8 text-center text-orange">{cnt.noBankPay[lang]}</p>
        ) : !user && bankMethod?.meta?.private ? (
          <p className="mt-8 text-center text-orange">{cnt.noBankPayPrivate[lang]}</p>
        ) : (
          <dl className="mt-6 lazy-b">
            <dt className="">{shdCnt.bankInfo.holder[lang]}</dt>
            <dd className=" flex justify-between items-center text-blue cursor-pointer">
              {bankMethod?.meta?.accountHolder}
              <span className="inline-block w-6">
                <SvgIcon name="copy" />
              </span>
            </dd>
            <dt className="">{shdCnt.bankInfo.number[lang]}</dt>
            <dd className="flex justify-between items-center text-blue cursor-pointer">
              {bankMethod?.meta?.iban}
              <span className="inline-block w-6">
                <SvgIcon name="copy" />
              </span>
            </dd>
            <dt className="">{shdCnt.bankInfo.bic[lang]}</dt>
            <dd className="flex justify-between items-center text-blue cursor-pointer">
              {bankMethod?.meta?.bic}
              <span className="inline-block w-6">
                <SvgIcon name="copy" />
              </span>
            </dd>
          </dl>
        )}
      </div>
    </>
  );
}
