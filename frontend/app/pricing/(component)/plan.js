import { LinkButton } from "../../(component)/(styled)/button";
import SvgIcon from "../../(component)/(styled)/svg-icon";

export default function Plan({ lang, plan }) {
  return (
    <article className="overflow-hidden flex-1 md:max-w-sm md:mx-3 rounded-lg card">
      <div className="h-0.5 bg-pc mb-5"></div>
      <header className="px-5 mb-2">
        <h3 className="text-lg text-center font-semibold">Basic</h3>
        <p>Ideal for individuals that need a custom solution with custom tools.</p>
      </header>
      <div dir="ltr" className="px-5 font-bold mb-4">
        <span className="text-2xl">€</span>
        <span className="text-3xl">{"30"}</span>
        <span className="font-medium text-sm">/mo</span>
      </div>
      <h6 className="text-sm p-5 border-t-[1px] border-bc font-semibold uppercase">What's included</h6>
      <ul className="p-5 pt-0">
        <li className="flex items-center py-1">
          <div className="w-5 text-green">
            <SvgIcon name="checkMark" />
          </div>
          <div className="text-sm mx-2">Lorem ipsum dolor sit amet</div>
        </li>
      </ul>
      <LinkButton
        href={plan?.storeId ? `/payment?storeId=${plan.storeId}&plan=${plan.id}` : "/admin/store?tab=my"}
        cls="!flex max-w-[120px] mx-auto md:max-w-full md:mx-5 mb-5 !rounded-full">
        Downgrade
      </LinkButton>
    </article>
  );
}

const content = {
  link: { en: "Select", ar: "اختار" },
};
