import Image from "next/image";
import Link from "next/link";
import { getCssDelay } from "../../(service)/style-methods";
import SvgIcon from "../../(component)/(styled)/svg-icon";
import { StoreCustomerInfo, StoreAdminInfo } from "./store-card-info";

export default function StoreCard({ Tag, lang, admin, link, name, imageUrl, open, cls, ...s }) {
  return (
    <Tag
      className={
        "relative p-1 text-t dark:text-dt lazy-c " +
        (cls || "w-[100%] sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:flex-1 2xl:!min-w-[300px] md:last:max-w-[300px]")
      }
      // style={getCssDelay()}
    >
      <Link href={link} className="relative block w-full bg-cbg card cd_hr rounded-xl duration-200">
        <p className={`overflow-hidden absolute top-10 -right-1 w-14  text-${open ? "green" : "t"}`}>
          <SvgIcon name="tag" />
          <span className="absolute top-0 right-0 bottom-0 left-2 inline-flex justify-center items-center text-[11px] font-semibold  text-dt">
            {content[open ? "open" : "close"][lang]}
          </span>
        </p>
        <h2 className="p-3 font-medium">{name}</h2>
        <div className="overflow-hidden w-ful h-auto sm:h-72 flex items-center">
          <Image
            priority
            src={imageUrl}
            width="150"
            height="150"
            alt="Some description for the image"
            className={`block w-full ${cls ? "" : "h-full"}`}
          />
        </div>

        {admin ? <StoreAdminInfo {...s} /> : <StoreCustomerInfo lang={lang} {...s} />}
      </Link>
    </Tag>
  );
}

const content = { open: { en: "Open", ar: "مفتوح" }, close: { en: "Closed", ar: "مغلق" } };
