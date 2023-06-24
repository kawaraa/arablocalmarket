"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../../app-session-context";
import { request } from "../../(service)/api-provider";
import {
  CheckInput,
  InputField,
  NumberInputWithControl,
  Select,
  Textarea,
  ToggleSwitch,
} from "../../(component)/(styled)/inputs";
import AddressInputs from "../../(component)/address-inputs";
import { CurrencySelect, DayOpeningHours, DaysCheckButtons } from "../../(component)/custom-inputs";
import { Button } from "../../(component)/(styled)/button";
import Collapse from "../../(component)/collapse";
import ImageUpload from "../../(component)/(styled)/upload-image";
import shdCnt from "../../(layout)/json/shared-content.json";
import Modal from "../../(component)/(styled)/modal";
import { Cookies } from "../../(service)/utilities";
// import Tooltip from "../(component)/(styled)/tooltip";
const q =
  "?fields=owner,subscriptionStatus,about,currency,deliver,deliveryCost,cocNumber,vatNumber,meta&populate=address,openingHours,payments";
const openingHour = { open: "AM-07.00", close: "PM-07.00" };

export default function NewStore({ params, searchParams: { id, subscription } }) {
  const router = useRouter();
  const { lang, setAppLoading, user, addMessage } = useContext(AppSessionContext);
  const [store, setStore] = useState(null);
  const [file, setFile] = useState(null);
  const [days, setDays] = useState([]);
  const [deliver, setDeliver] = useState(false);
  const [onDeliveryPayment, setOnDeliveryPayment] = useState(null);
  const [onlinePayment, setOnlinePayment] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

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
            meta: { accountHolder: f.accountHolder.value, iban: f.iban.value, private: f.private.checked },
          });
        }
      }
      const data = {
        name: f.name.value,
        about: f.about.value,
        type: f.type.value,
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
        const d = {
          body: new FormData(),
          query: `?subscription=${subscription}&referral=${Cookies.get("referralId") || ""}`,
        };
        d.body.append("files.cover", file, file.name);
        d.body.append("data", JSON.stringify(data));
        id = (await request("store", "POST", d)).data.id;
      } else {
        delete data.name;
        await request("store", "PUT", { query: "/" + store.id, body: { data } });
        id = store.id;
      }

      window.location.replace(`/admin/store/${id}/product`);
    } catch (error) {
      addMessage({ type: "error", text: error.message, duration: 5 });
    }
    setAppLoading(false);
  };

  const handleDelete = async () => {
    setDeleteConfirmation(false);
    setAppLoading(true);
    try {
      await request("store", "DELETE", { query: `/${id}` });
      addMessage({ type: "success", text: shdCnt.done[lang], duration: 2 });
      window.location.replace(`/admin/store?tab=my`);
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
    if (!user && !user?.loading) router.replace("/signin");
    else if (!id && !subscription) router.replace("/pricing");
    else if (id) fetchStoreById(id);
  }, [user, id, subscription]);

  if (!user || user?.loading || (!id && !subscription)) return null;
  return (
    <>
      <form onSubmit={handleSubmit} className="mb-12 mx-auto md:w-[70%] lg:w-[650px]">
        <h1 className="text-xl text-center my-5">{id ? content.updateH1[lang] : shdCnt.createStore[lang]}</h1>
        {/* cover */}
        {!id && (
          <ImageUpload
            id="store-cover"
            // name="cover"
            required
            onFile={setFile}
            alt={content.imgAlt[lang]}
            title={content.imgTitle[lang]}
          />
        )}
        {!id && (
          <InputField type="text" name="name" required min="4" max="30" full cls="mb-2 flex-col">
            <span className="block mb-1 font-semibold rq">{content.name[lang]}</span>
          </InputField>
        )}
        <Textarea
          required
          name="about"
          defaultValue={store?.about}
          label={content.about[lang]}
          placeholder={content.about.placeholder[lang]}
          inCls="1"
        />

        <Select
          required
          name="type"
          label={content.storeType.label[lang]}
          cls="my-6 flex items-center"
          inCls="mx-2 !p-[2px] rounded-full invalid:border-red">
          <option value="">{content.storeType.default[lang]}</option>
          {content.storeType.values.map((v, i) => (
            <option value={v.en} key={i}>
              {v[lang]}
            </option>
          ))}
        </Select>

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
              cls="!flex my-3">
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
              placeholder={shdCnt.ex[lang] + " John Doe"}
              required
              full
              cls="flex-col my-1"
            />
            <InputField
              type="text"
              name="iban"
              defaultValue={onlinePayment?.bank?.iban}
              label={shdCnt.bankInfo.number[lang]}
              placeholder={shdCnt.ex[lang] + " FI21 1234 5698 7654 3210"}
              required
              full
              cls="flex-col my-1"
            />
            <CheckInput type="checkbox" name="private" cls="my-3">
              {content.privateBank[lang]}
            </CheckInput>
          </Collapse>
        </Collapse>

        <h6 className="font-semibold mt-7"> {content.businessInfo[lang]}</h6>
        <InputField
          type="text"
          name="cocNumber"
          defaultValue={store?.cocNumber}
          label={content.cocNumber[lang]}
          placeholder={shdCnt.ex[lang] + " 9876543"}
          full
          cls="flex-col mt-1 mb-3"
        />
        <InputField
          type="text"
          name="vatNumber"
          defaultValue={store?.vatNumber}
          label={content.vatNumber[lang]}
          placeholder={" US52359525 " + shdCnt.ex[lang]}
          full
        />

        <div className="flex my-5">
          <Button type="submit" cls={`text-lg ${store ? "" : "flex-1 sm:flex-none"}`}>
            {id ? shdCnt.save[lang] : shdCnt.create[lang]}
          </Button>

          {store && (
            <>
              <span className="w-5 h-5"></span>
              <Button
                type="button"
                onClick={() => setDeleteConfirmation(true)}
                cls="!bg-bg3 !text-bg text-lg">
                {shdCnt.delete[lang]}
              </Button>
            </>
          )}
        </div>
      </form>

      <Modal
        lang={lang}
        icon="warning"
        title={content.confirmTitle[lang]}
        okBtn={shdCnt.yes[lang]}
        onCancel={() => setDeleteConfirmation(false)}
        onApprove={handleDelete}
        open={deleteConfirmation}>
        <p className="my-5">
          <strong>{content.confirmP[lang][0]} </strong>
          {content.confirmP[lang][1]}
        </p>
        <p className="my-5">{content.confirmP[lang][2]}</p>
      </Modal>
    </>
  );
}

const content = {
  updateH1: { en: "Update store", ar: "تحديث المتجر" },
  imgAlt: { en: "Store cover image", ar: "صورة الغلاف المخزن" },
  imgTitle: { en: "Upload the store cover image", ar: "قم بتحميل صورة غلاف المتجر" },
  name: { en: "Store name", ar: "اسم المتجر" },
  about: {
    en: "About",
    ar: "وصف المتجر",
    placeholder: {
      en: "Write something about your store, E.g. Welcome to our supermarket ...",
      ar: "اكتب شيئًا عن متجرك ، على سبيل المثال. مرحبًا بكم في سوبر ماركتنا ...",
    },
  },
  storeType: {
    default: { en: "Select type", ar: "اختر نوع" },
    label: { en: "Store type", ar: "نوع المتجر" },
    values: [
      { en: "market", ar: "محل بقالة" },
      { en: "bakery", ar: "مخبز" },
      { en: "grocery", ar: "محل خضروات" },
      { en: "restaurant", ar: "مطعم" },
      { en: "other", ar: "آخر" },
    ],
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
  privateBank: {
    en: "Only signed in users can see it",
    ar: "فقط المستخدمين الذين قاموا بتسجيل الدخول يمكن رؤيته",
  },
  businessInfo: { en: "Business info", ar: "معلومات العمل التجارة" },
  cocNumber: { en: "COC Number", ar: "رقم السجل التجاري" },
  vatNumber: { en: "Tax ID / VAT Number", ar: "الرقم الضريبي" },
  error: {
    en: "Please locate your store location on the map so your customers can find your it",
    ar: "يرجى تحديد موقع متجرك على الخريطة حتى يتمكن الزبائن من العثور عليه",
  },
  confirmTitle: { en: "Store delete confirmation", ar: "تأكيد حذف المتجر" },
  confirmP: {
    en: [
      "Please note:",
      "Deleting the store will also delete all the products listed in the store",
      "Are you sure you want to delete this store?",
    ],
    ar: [
      "يرجى الملاحظة:",
      "سيؤدي حذف المتجر أيضًا إلى حذف جميع المنتجات المدرجة في المتجر",
      "هل أنت متأكد أنك تريد حذف هذا المتجر؟",
    ],
  },
};
