"use client";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AppSessionContext } from "../../../../app-session-context";
import { request } from "../../../../(service)/api-provider";
import shdCnt from "../../../../(layout)/json/shared-content.json";
import plans from "../../../../(layout)/plans";
import PlanCard from "../../../../(component)/plan-card";
import { Button } from "../../../../(component)/(styled)/button";
import Modal from "../../../../(component)/(styled)/modal";
import { useRouter } from "next/navigation";
const day = 1000 * 60 * 60 * 24;

export default function StorePlan({ params: { storeId } }) {
  const router = useRouter();
  const { lang, user, setAppLoading, addMessage } = useContext(AppSessionContext);
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState({ loading: true });
  const [showPlans, setShowPlans] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const index = plans.findIndex((p) => p.subscription == subscription?.id);
  const plan = plans[index];
  const upgradeable = index + 1 < plans.length;
  const active = ["trialing", "active"].includes(subscription?.status);
  const cls = "flex justify-between mb-3 pb-1 border-b-[1px] border-b-bc";

  const getValue = (value = "") => {
    return content.values[value] ? content.values[value][lang] : value || content.no[lang];
  };
  const getDateValue = (v) => (v && new Date(+(v + "000")).toLocaleDateString("nl")) || content.no[lang];
  const ended = (+(subscription?.ends + "000") - Date.now()) / day <= 1;

  const handleUpgrade = async (priceId) => {
    setAppLoading(true);
    try {
      if (ended) {
        const session = await request("stripe", "POST", { query: "/create", body: { storeId, priceId } });
        window.location.href = session.paymentUrl;
      } else {
        setSubscription(
          await request("stripe", "PUT", { query: `/update?storeId=${storeId}&priceId=${priceId}` })
        );
        addMessage({ type: "success", text: shdCnt.done[lang], duration: 3 });
      }
    } catch (err) {
      addMessage({ type: "error", text: err.message, duration: 8 });
    }
    setShowPlans(false);
    setAppLoading(false);
  };
  const payAgain = async () => {
    setAppLoading(true);
    try {
      const session = await request("stripe", "GET", { query: `/checkout/${storeId}` });
      window.location.href = session.paymentUrl;
    } catch (err) {
      addMessage({ type: "error", text: err.message, duration: 5 });
    }
    setAppLoading(false);
  };
  const handleCancel = async () => {
    setLoading(true);
    try {
      await request("stripe", "DELETE", { query: `/cancel?storeId=${storeId}` });
      addMessage({ type: "success", text: shdCnt.done[lang], duration: 3 });
      router.refresh();
    } catch (err) {
      addMessage({ type: "error", text: err.message, duration: 5 });
    }
    setShowWarning(false);
    setLoading(false);
  };

  const fetchSubscription = async (id) => {
    setAppLoading(true);
    try {
      setSubscription(await request("stripe", "GET", { query: `/subscription?storeId=${id}` }));
    } catch (err) {
      setSubscription(null);
      addMessage({ type: "error", text: err.message, duration: 5 });
    }
    setAppLoading(false);
  };

  useEffect(() => {
    document.title = content.title[lang] + " - ALM";
    fetchSubscription(storeId);
    setTimeout(() => window.scroll(0, 270), 800);
  }, []);

  return (
    <>
      <div className="min-h-[45vh]">
        {!subscription?.loading && ended && (
          <div
            dir="ltr"
            className="flex items-center justify-between mb-5 -mt-3 md:-mt-6 px-3 py-1 bg-bg3 text-sm text-t">
            <p className="">
              {content.warn[lang]}{" "}
              <strong>{new Date(+(subscription?.ends + "000") + day * 30).toLocaleDateString("nl")}</strong>
            </p>
            {/* new Date(Date.now()+  1000 * 60 * 60 * 24 * 30) */}
            <Link
              href="#"
              onClick={(e) => e.preventDefault() + setShowPlans(true)}
              className="font-semibold hover:text-bg underline underline-offset-4 transition">
              {content.reactivate[lang]}
            </Link>
          </div>
        )}

        <h3 className="text-center text-2xl mb-8">{content.h[lang]}</h3>
        <div dir="ltr" className="md:flex max-w-3xl mx-auto">
          {plan && (
            <>
              <PlanCard lang={lang} plan={plan}>
                <div className="flex justify-around">
                  {active && upgradeable && (
                    <Button
                      loading={loading}
                      onClick={() => setShowPlans(true)}
                      cls="min-w-[100px] md:mx-5 mb-5 !rounded-full">
                      {content.upgrade[lang]}
                    </Button>
                  )}
                  <Button
                    loading={loading}
                    disabled={!!subscription?.ends}
                    onClick={() => setShowWarning(true)}
                    cls="min-w-[100px] md:mx-5 mb-5 !rounded-full !bg-bg3">
                    {!subscription?.ends ? content.cancel[lang] : content.canceled[lang]}
                  </Button>
                  {[("trialing", "incomplete")].includes(subscription?.status) && (
                    <Button
                      loading={loading}
                      onClick={payAgain}
                      cls="min-w-[100px] md:mx-5 mb-5 !rounded-full !bg-bg1">
                      {content.pay[lang]}
                    </Button>
                  )}
                </div>
              </PlanCard>
              <div className="w-5 h-10 "></div>
            </>
          )}

          <ul dir="auto" className="flex-1 flex flex-col justify-between">
            <li className={cls}>
              {content.keys.status[lang]}: <strong>{getValue(subscription?.status)}</strong>
            </li>
            <li className={cls}>
              {content.keys.created[lang]}: <strong>{getDateValue(subscription?.created)}</strong>
            </li>
            <li className={cls}>
              {content.keys.ends[lang]}: <strong>{getDateValue(subscription?.ends)}</strong>
            </li>
            <li className={cls}>
              {content.keys.trialPeriod[lang]}:{" "}
              <strong>
                {subscription?.trialPeriod || 0} {content.values.d[lang]}
              </strong>
            </li>
            <li className={cls}>
              {content.keys.currentPeriodStart[lang]}:{" "}
              <strong>{getDateValue(subscription?.currentPeriodStart)}</strong>
            </li>
            <li className={cls}>
              {content.keys.currentPeriodEnd[lang]}:{" "}
              <strong>{getDateValue(subscription?.currentPeriodEnd)}</strong>
            </li>
            <li className={cls}>
              {content.keys.billingMethod[lang]}: <strong>{getValue(subscription?.billingMethod)}</strong>
            </li>
            <li className={cls}>
              {content.keys.canceledAt[lang]}: <strong>{getDateValue(subscription?.canceledAt)}</strong>
            </li>
            <li className={cls}>
              {content.keys.paymentMethod[lang]}: <strong>{getValue(subscription?.paymentMethod)}</strong>
            </li>
          </ul>
        </div>
        {/*  Todo: Invoices list: amount, date */}
      </div>

      <Modal
        lang={lang}
        open={showPlans}
        title={content.plansTitle[lang]}
        onCancel={() => setShowPlans(false)}>
        <div className="space-y-5 mt-5 md:space-y-0 md:flex md:justify-between ">
          {plans.map((plan, i) => (
            <PlanCard lang={lang} plan={plan} key={i}>
              <div className="text-center">
                <Button
                  disabled={!ended && subscription?.id == plan.subscription}
                  onClick={() => handleUpgrade(plan.subscription)}
                  cls="min-w-[100px] md:mx-5 mb-5 !rounded-full">
                  {subscription?.id != plan.subscription ? content.select[lang] : content.selected[lang]}
                </Button>
              </div>
            </PlanCard>
          ))}
        </div>
      </Modal>

      <Modal
        lang={lang}
        icon="warning"
        open={showWarning}
        title={content.confirmTitle[lang]}
        onCancel={() => setShowWarning(false)}
        okBtn={shdCnt.yes[lang]}
        onApprove={handleCancel}
        loading={loading}>
        <p dir="auto" className="mt-5">
          <strong>{content.confirmP[lang][0]} </strong>
          {content.confirmP[lang][1]} <strong>{getDateValue(subscription?.currentPeriodEnd)}</strong>
        </p>
        <p dir="auto" className="mb-5">
          {content.confirmP[lang][2]} <strong>{getDateValue(subscription?.currentPeriodEnd)}</strong>,{" "}
          {content.confirmP[lang][3]}
        </p>
        <p dir="auto" className="my-5">
          {content.confirmP[lang][4]}
        </p>
      </Modal>
    </>
  );
}

const content = {
  title: { en: "Store plan", ar: "اشتراك المتجر" },
  h: { en: "Plan details", ar: "تفاصيل اشتراك" },
  no: { en: "Not specified", ar: "غير محدد" },
  cancel: { en: "Cancel", ar: "إلغاء" },
  canceled: { en: "Canceled", ar: "ألغيت" },
  upgrade: { en: "Upgrade", ar: "ترقية" },
  pay: { en: "Pay", ar: "دفع" },
  reactivate: { en: "Reactivate", ar: "اعادة تنشط" },
  select: { en: "Select", ar: "اختار" },
  selected: { en: "Selected", ar: "مختار" },
  plansTitle: { en: "Select a plan", ar: "اختار اشتراكا" },
  warn: {
    en: "Your store plan has ended, if you don not reactivate it the store will be deleted on",
    ar: "انتهت صلاحية اشتراك متجرك، إذا لم تقم بإعادة تنشيطه فسيتم حذف المتجر في",
  },
  keys: {
    status: { en: "Status", ar: "الحالة" },
    // start: { en: "Start", ar: "" },
    created: { en: "Since", ar: "منذ" },
    ends: { en: "Ends", ar: "ينتهي" },
    trialPeriod: { en: "Trial period", ar: "فترة تجريبية" },
    // trialStart: { en: "Trial started", ar: "" },
    // trialEnd: { en: "Trial ends", ar: "" },
    currentPeriodStart: { en: "Current period started", ar: "بدأت الدورة الحالية" },
    currentPeriodEnd: { en: "Current period ends", ar: "تنتهي الدورة الحالية" },
    billingMethod: { en: "Billing method", ar: "طريقة الفواتير" },
    canceledAt: { en: "canceled", ar: "ألغيت" },
    paymentMethod: { en: "Payment method", ar: "طريقة الدفع" },
  },
  values: {
    send_invoice: { en: "Send invoice", ar: "إرسال الفاتورة" },
    charge_automatically: { en: "Charge automatically", ar: "شحن تلقائيا" },
    card: { en: "Card", ar: "بطاقة إئتمان" },
    trialing: { en: "Trial", ar: "تجربة" },
    active: { en: "Active", ar: "نشط" },
    incomplete: { en: "Incomplete", ar: "الدفع غير مكتمل" },
    incomplete_expired: { en: "Expired", ar: "منتهية الصلاحية" },
    past_due: { en: "Past due", ar: "تجاوز موعد الاستحقاق" },
    canceled: { en: "Canceled", ar: "ألغيت" },
    unpaid: { en: "Unpaid", ar: "غير مدفوع" },
    d: { en: "Days", ar: "يوما" },
    // تجريبي
  },
  confirmTitle: { en: "Plan cancel confirmation", ar: "تأكيد إلغاء الاشتراك" },
  confirmP: {
    en: [
      "Please note:",
      "If you cancel the store plan you will not be able to reactivate it until",
      "The store will stay active till",
      "then will become inactive, and thereafter you can activate it again",
      "Are you sure you want to cancel it?",
    ],
    ar: [
      "يرجى الملاحظة:",
      "إذا قمت بإلغاء اشتراك المتجر فلن تتمكن من إعادة تفعيله إلا بعد",
      "سيبقى المتجر نشطًا حتى",
      "ثم سيصبح غير نشط، وبعد ذلك يمكنك تفعيل مرة أخرى",
      "هل أنت متأكد أنك تريد ألغها؟",
    ],
  },
};
