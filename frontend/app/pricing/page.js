import { cookies } from "next/headers";
import { extractLang } from "../(service)/utilities";
import PlanCard from "../(component)/plan-card";
import plans from "../(layout)/plans";
import CheckReferral from "./check-referral";

export default async function Pricing({ params, searchParams }) {
  const cookieStore = cookies();
  const lang = extractLang(params, searchParams, cookieStore.get("lang")?.value);

  const date = new Date();
  date.setMonth(date.getMonth() + 1);

  return (
    <section>
      <h1 className="mt-16 mb-4 text-3xl text-center font-bold">{content.h1[lang]}</h1>
      <p className="text-center">{content.h1P[lang][0]}</p>

      <p className="mt-10 mb-3 text-sm">
        {content.h1P[lang][1]} <strong className="font-medium">{date.toLocaleDateString("nl")}</strong>,{" "}
        {content.h1P[lang][2]}
      </p>

      <div className="flex-wrap sm:flex sm:justify-around md:justify-between">
        {plans.map((plan, i) => (
          <PlanCard lang={lang} plan={plan} key={i} />
        ))}
      </div>
      <CheckReferral referralId={searchParams?.referral} />
    </section>
  );
}

export async function generateMetadata({ params, searchParams }) {
  const cookieStore = cookies();
  const lang = extractLang(params, searchParams, cookieStore.get("lang")?.value);
  return {
    title: content.title[lang] + " - ALM",
    description: content.desc[lang],
  };
}

const content = {
  title: { en: "Pricing - Subscriptions", ar: "صفحة أسعار الاشتراكات" },
  h1: { en: "Start for free and enjoy the trial month.", ar: "ابدأ مجانًا واستمتع بالشهر التجريبي" },
  desc: {
    en: "Arab Local Market store plans and subscriptions prices",
    ar: "أسعار خطط واشتراكات متجر السوق المحلي العربي",
  },
  h1P: {
    en: [
      "With the trial month no credit card required.",
      "The selected plan will renew on",
      "No commitment, cancel anytime",
    ],
    ar: [
      "مع الشهر التجريبي لا حاجة لبطاقة ائتمان",
      "سيتم تجديد الاشتراك المختار في",
      "لا يوجد التزام، يمكنك الإلغاء الاشتراك في أي وقت",
    ],
  },
};
