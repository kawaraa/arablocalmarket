import { cookies } from "next/headers";
import PlanCard from "../(component)/plan-card";
import plans from "../(layout)/plans";

export default async function pricing({ searchParams }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";

  const date = new Date();
  date.setMonth(date.getMonth() + 1);

  return (
    <section>
      <h1 className="mt-16 mb-4 text-4xl text-center font-bold">{content.h1[lang]}</h1>
      <p className="text-center">{content.h1P[lang][0]}</p>

      <p className="mt-10 mb-3 text-sm">
        {content.h1P[lang][1]} <strong className="font-medium">{date.toLocaleDateString("nl")}</strong>,{" "}
        {content.h1P[lang][2]}
      </p>

      <div className="space-y-5 md:space-y-0 md:flex md:justify-between ">
        {plans.map((plan, i) => (
          <PlanCard lang={lang} plan={plan} key={i} />
        ))}
      </div>
    </section>
  );
}

// export async function generateMetadata({ params, searchParams }) {
//   const cookieStore = cookies();
//   const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";
//   return {
//     title: content.title[lang] + " - ALM",
//     // description: content.desc[lang],
//   };
// }

const content = {
  title: { en: "Pricing", ar: "الأسعار" },
  h1: { en: "Start for free and enjoy the trial month.", ar: "ابدأ مجانًا واستمتع بالشهر التجريبي" },
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
