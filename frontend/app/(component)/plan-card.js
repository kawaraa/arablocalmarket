import { LinkButton } from "./(styled)/button";
import SvgIcon from "./(styled)/svg-icon";

export default function PlanCard({ children, lang, plan }) {
  return (
    <article className="overflow-hidden flex-1 md:max-w-sm md:mx-3 rounded-lg card">
      <div className="h-0.5 bg-pc mb-5"></div>
      <header className="min-h-[130px] px-5 mb-3">
        <h3 className="mb-3 text-lg text-center font-semibold">{plan.name[lang]}</h3>
        <p className="text-center">{plan.desc[lang]}</p>
      </header>
      <div dir="ltr" className="px-5 font-bold mb-4">
        <span className="text-2xl">{plan.currency}</span>
        <span className="text-3xl">{plan.price}</span>/
        <span className={"font-medium " + (lang == "ar" ? "text-xs" : "text-sm")}>
          {content.period[lang]}
        </span>
      </div>
      <h6 dir="auto" className="text-sm p-5 border-t-[1px] border-bc font-semibold uppercase">
        {content.include[lang]}
      </h6>
      <ul dir="auto" className="p-5 pt-0 min-h-[50px]">
        {plan.features.map((feature, i) => (
          <li className="flex items-center py-1" key={i}>
            <div className="w-5 text-green">
              <SvgIcon name="checkMark" />
            </div>
            <div className="text-sm mx-2">{feature[lang]}</div>
          </li>
        ))}
      </ul>
      {children || (
        <LinkButton
          href={
            plan?.storeId
              ? `/payment?storeId=${plan.storeId}&plan=${plan.subscription}`
              : `/admin/new-store?subscription=${plan.subscription}`
          }
          cls="!flex max-w-[120px] mx-auto md:max-w-full md:mx-5 mb-5 !rounded-full">
          {content.link[lang]}
        </LinkButton>
      )}
    </article>
  );
}

const content = {
  link: { en: "Select", ar: "اختار" },
  // link2: { en: "Selected", ar: "مختار" },
  period: { en: "mo", ar: "شهري" },
  include: { en: "What's included", ar: "ما تضمنه" },
};
