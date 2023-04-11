"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../../app-session-context";
import { request } from "../../(service)/api-provider";
import {
  InputField,
  NumberInputWithControl,
  Textarea,
  ToggleSwitch,
} from "../../(component)/(styled)/inputs";
import AddressInputs from "../../(component)/address-inputs";
import { CurrencySelect, DayOpeningHours, DaysCheckButtons } from "../../(component)/custom-inputs";
import { Button } from "../../(component)/(styled)/button";
import Collapse from "../../(component)/collapse";
import ImageUpload from "../../(component)/(styled)/upload-image";
import shdCnt from "../../(layout)/json/shared-content.json";
// import Tooltip from "../(component)/(styled)/tooltip";
const q =
  "?fields=owner,about,currency,deliver,deliveryCost,cocNumber,vatNumber,meta&populate=address,openingHours,payments";
const openingHour = { open: "AM-07.00", close: "PM-07.00" };

export default function NewStore({ params, searchParams }) {
  const router = useRouter();
  const { lang, setAppLoading, user, addMessage } = useContext(AppSessionContext);
  const [store, setStore] = useState(null);
  const [days, setDays] = useState([]);
  const [deliver, setDeliver] = useState(false);
  const [onDeliveryPayment, setOnDeliveryPayment] = useState(null);
  const [onlinePayment, setOnlinePayment] = useState(null);
  const update = !!searchParams.id;

  const handleError = (text) => {
    addMessage({ type: "error", text, duration: 5 });
  };
  const addDay = ({ name, checked }) => {
    const newDays = days.filter((d) => d.day !== name);
    if (!checked) setDays(newDays);
    else if (checked && days.length == newDays.length) setDays([...days, { day: name, ...openingHour }]);
  };

  const updateDay = (day) => {
    const copy = [...days];
    const index = copy.findIndex((d) => d.day == day.day);
    copy[index].open = day.open;
    copy[index].close = day.close;
    setDays(copy);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const f = e.target;
    const payments = [];
    const file = f.cover?.files[0];
    setAppLoading(true);

    try {
      if (!f.lat.value || !f.lng.value) throw new Error(content.error[lang]);

      if (onDeliveryPayment) {
        for (let k in onDeliveryPayment) {
          if (onDeliveryPayment[k]) {
            payments.push({ type: "ON-DELIVERY", method: k.toUpperCase(), meta: onDeliveryPayment[k] });
          }
        }
      }
      if (onlinePayment) {
        if (onlinePayment.card) payments.push({ type: "ONLINE", method: "CARD", meta: true });
        if (onlinePayment.bank) {
          payments.push({
            type: "ONLINE",
            method: "BANK",
            meta: { accountHolder: f.accountHolder.value, iban: f.iban.value, bic: f.bic.value },
          });
        }
      }
      const data = {
        name: f.name.value,
        about: f.about.value,
        currency: f.currency.value,
        deliver: f.deliver.checked,
        cocNumber: f.cocNumber.value,
        vatNumber: f.vatNumber.value,
        address: {
          line1: f.line1.value,
          line2: f.line2.value,
          city: f.city.value,
          postalCode: f.city.value,
          province: f.province.value,
          country: f.country.value,
          currentLat: f.lat.value,
          currentLng: f.lng.value,
        },
        openingHours: days,
        payments,
      };

      if (f.deliveryCost) data.deliveryCost = f.deliveryCost.value;

      let id = null;
      if (!store) {
        const formData = new FormData();
        formData.append("files.cover", file, file.name);
        formData.append("data", JSON.stringify(data));
        id = (await request("store", "POST", formData)).data.id;
      } else {
        delete data.name;
        id = (await request("store", "PUT", { query: "/" + store.id, body: { data } })).data.id;
      }

      router.replace(`/admin/store/${id}/product`);
    } catch (error) {
      addMessage({ type: "error", text: error.message, duration: 5 });
    }
    setAppLoading(false);
  };

  const fetchStoreById = async (storeId) => {
    setAppLoading(true);
    try {
      const { id, attributes } = (await request("store", "GET", { query: `/${storeId}${q}` })).data;
      attributes.id = id;
      setStore(attributes);
      setDeliver(attributes.deliver);
      setDays(attributes.openingHours);

      const onDeliveryPay = {};
      const onlinePay = {};
      attributes.payments.forEach((p) => {
        if (p.type == "ONLINE") onlinePay[p.method.toLowerCase()] = p.meta;
        else onDeliveryPay[p.method.toLowerCase()] = p.meta;
      });
      setOnDeliveryPayment(onDeliveryPay);
      setOnlinePayment(onlinePay);
    } catch (error) {
      addMessage({ type: "error", text: error.message, duration: 5 });
    }
    setAppLoading(false);
  };

  useEffect(() => {
    if (searchParams.id) fetchStoreById(searchParams.id);
  }, [searchParams]);

  useEffect(() => {
    if (!user) router.replace("/signin");
  }, [user]);

  if (!user) return null;
  return (
    <form onSubmit={handleSubmit} className="mb-12 mx-auto md:w-[70%] lg:w-[650px]">
      <h1 className="text-xl text-center my-2">{update ? content.updateH1[lang] : content.createH1[lang]}</h1>

      {/* cover */}
      {!update && (
        <ImageUpload
          id="store-cover"
          name="cover"
          alt={content.imgAlt[lang]}
          title={content.imgTitle[lang]}
        />
      )}

      {!update && (
        <InputField
          type="text"
          name="name"
          placeholder={content.name.placeholder[lang]}
          required
          min="4"
          max="30"
          full
          cls="mb-2 flex-col">
          <span className="block mb-1 font-semibold rq">{content.name[lang]}</span>
        </InputField>
      )}

      <Textarea name="about" defaultValue={store?.about} title={content.about.placeholder[lang]} cls="1">
        <span className="block mb-1 font-semibold rq">{content.about[lang]}</span>
      </Textarea>

      <div className="my-6 md:flex md:justify-between">
        <div className="flex justify-between">
          <CurrencySelect lang={lang} label required defaultValue={store?.currency} cls="mx-0" />

          <ToggleSwitch name="deliver" checked={deliver} onChange={(e) => setDeliver(e.target.checked)}>
            <div className="mx-3">{content.delivery[lang]}</div>
          </ToggleSwitch>
        </div>

        {deliver && (
          <NumberInputWithControl
            name="deliveryCost"
            defaultValue={store?.deliveryCost || 0}
            required
            cls="w-full md:w-auto my-3 md:my-0"
            inCls="w-12"
            label={<label className="flex-1 md:flex-initial md:mx-2 ">{content.deliveryCost[lang]}</label>}
          />
        )}
      </div>

      <h6 className="mb-2  font-semibold rq">{content.address[lang]}</h6>
      <AddressInputs lang={lang} {...(store?.address || {})} map onError={handleError} />

      <h6 className="font-semibold mt-7 rq">{content.workdays[lang]}</h6>
      <DaysCheckButtons lang={lang} checkedDays={days} onCheck={addDay} />

      <div className="my-5">
        {days.map((d, i) => (
          <DayOpeningHours lang={lang} day={d} onDayUpdate={updateDay} key={i} />
        ))}
      </div>

      <h6 className="font-semibold mt-7 rq">{content.payments[lang]}</h6>
      <Collapse
        onCheck={() => setOnDeliveryPayment(onDeliveryPayment ? null : { cash: true })}
        checked={!!onDeliveryPayment}
        id="on-delivery-1313"
        title={content.onDelivery[lang]}
        cls="my-3"
        hCls="rounded-t-lg">
        <div>
          <ToggleSwitch
            name="onDeliveryCash"
            checked={!!onDeliveryPayment?.cash}
            onChange={(e) => setOnDeliveryPayment({ ...onDeliveryPayment, cash: e.target.checked })}
            cls="!flex my-3 cash">
            <div className="flex-1">{content.cash[lang]}</div>
          </ToggleSwitch>

          <ToggleSwitch
            name="onDeliveryCard"
            checked={!!onDeliveryPayment?.card}
            onChange={(e) => setOnDeliveryPayment({ ...onDeliveryPayment, card: e.target.checked })}
            cls="!flex my-3 card">
            <div className="flex-1">{content.card[lang]}</div>
          </ToggleSwitch>

          <ToggleSwitch
            name="onDeliveryBank"
            checked={!!onDeliveryPayment?.bank}
            onChange={(e) => setOnDeliveryPayment({ ...onDeliveryPayment, bank: e.target.checked })}
            cls="!flex my-3">
            <div className="flex-1">{content.bank[lang]}</div>
          </ToggleSwitch>
        </div>
      </Collapse>

      <Collapse
        onCheck={(e) => setOnlinePayment(onlinePayment ? null : { card: e.target.checked })}
        checked={!!onlinePayment?.card || !!onlinePayment?.bank}
        id="online-1213"
        title={content.online[lang]}
        hCls="rounded-t-lg">
        <ToggleSwitch
          name="onlineCard"
          checked={!!onlinePayment?.card}
          onChange={(e) => setOnlinePayment({ ...onlinePayment, card: e.target.checked })}
          cls="!flex my-5">
          <div className="flex-1">{content.card[lang]}</div>
        </ToggleSwitch>

        <Collapse
          name="onlineBank"
          checked={!!onlinePayment?.bank}
          onCheck={(e) => setOnlinePayment({ ...onlinePayment, bank: e.target.checked })}
          title={content.bank[lang]}
          hCls="rounded-t-lg">
          <h6 className="font-semibold">{shdCnt.bankInfo.title[lang]}</h6>
          <InputField
            type="text"
            name="accountHolder"
            defaultValue={onlinePayment?.bank?.accountHolder}
            label={shdCnt.bankInfo.holder[lang]}
            placeholder="E.g. John Doe"
            required
            full
            cls="flex-col my-1"
          />
          <InputField
            type="text"
            name="iban"
            defaultValue={onlinePayment?.bank?.iban}
            label={shdCnt.bankInfo.number[lang]}
            placeholder="E.g. FI21 1234 5698 7654 3210"
            required
            full
            cls="flex-col my-1"
          />
          <InputField
            type="text"
            name="bic"
            defaultValue={onlinePayment?.bank?.bic}
            label={shdCnt.bankInfo.bic[lang]}
            // title="Bank Identifier Number" // Todo: Add a tooltip
            placeholder="E.g. BOHIUS77"
            required
            full
            cls="flex-col my-1"
          />
        </Collapse>
      </Collapse>

      <h6 className="font-semibold mt-7"> {content.businessInfo[lang]}</h6>
      <InputField
        type="text"
        name="cocNumber"
        defaultValue={store?.cocNumber}
        label={content.cocNumber[lang]}
        placeholder="E.g. 9876543"
        full
        cls="flex-col mt-1 mb-3"
      />
      <InputField
        type="text"
        name="vatNumber"
        defaultValue={store?.vatNumber}
        label={content.vatNumber[lang]}
        placeholder="E.g. US52359525"
        full
      />

      <Button type="submit" cls="w-full my-5 !p-2">
        {update ? shdCnt.save[lang] : content.createBtn[lang]}
      </Button>
    </form>
  );
}

const content = {
  createH1: { en: "Create store", ar: "إنشاء متجر" },
  updateH1: { en: "Update store", ar: "تحديث المتجر" },
  imgAlt: { en: "Store cover image", ar: "صورة الغلاف المخزن" },
  imgTitle: { en: "Upload the store cover image", ar: "قم بتحميل صورة غلاف المتجر" },
  name: { en: "Store name", ar: "اسم المتجر", placeholder: { en: "E.g. alm-store", ar: "alm-store ,مثال" } },
  about: {
    en: "About",
    ar: "وصف المتجر",
    placeholder: {
      en: "Write something about your store, E.g. Welcome to our supermarket ...",
      ar: "اكتب شيئًا عن متجرك ، على سبيل المثال. مرحبًا بكم في سوبر ماركتنا ...",
    },
  },
  delivery: { en: "Delivery", ar: "توصيل" },
  deliveryCost: { en: "Delivery cost", ar: "تكلفة التوصيل" },
  address: { en: "Store Address", ar: "عنوان المتجر" },
  workdays: { en: "Workdays", ar: "أيام العمل" },
  payments: { en: "Payment methods", ar: "طرق الدفع" },
  onDelivery: { en: "Do you want to accept on delivery payment?", ar: "هل تريد قبول الدفع عند التسليم؟" },
  online: { en: "Do you want to accept online payment?", ar: "هل تريد قبول الدفع عبر الإنترنت؟" },
  cash: { en: "Accept cash payment", ar: "قبول الدفع النقدي" },
  card: { en: "Accept credit card payment", ar: "قبول الدفع ببطاقة الائتمان" },
  bank: { en: "Accept bank transfer payment", ar: "قبول الدفع عن طريق التحويل المصرفي" },
  businessInfo: { en: "Business info", ar: "معلومات العمل التجارة" },
  cocNumber: { en: "COC Number", ar: "رقم السجل التجاري" },
  vatNumber: { en: "Tax ID / VAT Number", ar: "الرقم الضريبي" },
  createBtn: { en: "Create", ar: "إنشاء" },
  error: {
    en: "Please locate your store location on the map so your customers can find your it",
    ar: "يرجى تحديد موقع متجرك على الخريطة حتى يتمكن الزبائن من العثور عليه",
  },
};
