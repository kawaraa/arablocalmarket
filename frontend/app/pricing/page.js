import { cookies } from "next/headers";
import PlanCard from "../(component)/plan-card";
import plans from "../(layout)/plans";

export default async function pricing({ searchParams }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";

  return (
    <section>
      <h1 className="mt-16 mb-4 text-4xl text-center font-bold">{content.h1[lang]}</h1>
      <p className="text-center">{content.h1P[lang]}</p>

      <p className="mt-10 mb-3 text-sm">
        The selected plan will renew on <strong className="font-medium">the first of each month</strong>, No
        commitment, cancel anytime..
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
  h1P: { en: "With the trial month no credit card required.", ar: "مع الشهر التجريبي لا حاجة لبطاقة ائتمان" },
};
