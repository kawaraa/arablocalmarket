import Image from "next/image";
import Link from "next/link";
import { getCssDelay } from "../(service)/utilities";
import SvgIcon from "../(component)/(styled)/svg-icon";
import { StoreCustomerInfo, StoreAdminInfo } from "./store-card-info";
import shdCnt from "../(layout)/json/shared-content.json";

export default function StoreCard({ Tag, lang, admin, link, name, imageUrl, open, cls, ...s }) {
  return (
    <Tag
      className={"relative p-1 text-t dark:text-dt lazy-b " + (cls || "w-full sm:w-1/2 xl:w-1/3 2xl:w-1/4")}
      style={getCssDelay()}>
      <Link passHref legacyBehavior hrefLang={lang} href={link}>
        <a className="relative flex flex-col justify-between w-full h-full bg-cbg card cd_hr rounded-xl duration-200">
          <p className={`overflow-hidden absolute top-10 -right-1 w-14  text-${open ? "green" : "t"}`}>
            <SvgIcon name="tag" />
            <span className="absolute top-0 right-0 bottom-0 left-2 inline-flex justify-center items-center text-[11px] font-semibold  text-dt">
              {shdCnt.statusStatus[open ? "open" : "close"][lang]}
            </span>
          </p>
          <h2 className="p-3 font-medium">{name}</h2>
          <div className="overflow-hidden w-ful aspect-video flex items-center">
            <Image priority src={imageUrl} width="250" height="250" alt={name} className="w-full" />
          </div>

          {admin ? <StoreAdminInfo {...s} /> : <StoreCustomerInfo lang={lang} {...s} />}
        </a>
      </Link>
    </Tag>
  );
}

const content = {};
