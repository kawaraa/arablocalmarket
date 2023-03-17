import Image from "next/image";
import Link from "next/link";
import { getCssDelay } from "../../(service)/style-methods";
import SvgIcon from "../../(component)/(styled)/svg-icon";
import { StoreCustomerInfo, StoreAdminInfo } from "./store-card-info";

export default function StoreCard({ Tag, admin, link, name, imageUrl, open, cls, ...s }) {
  // let dst = +distance;
  // let measuringUnit = "KM";

  // if (dst < 1) {
  //   dst = dst * 1000;
  //   measuringUnit = "M";
  // }

  return (
    <Tag
      className={
        "relative p-1 text-t dark:text-dt lazy-c " +
        (cls || "w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:flex-1 2xl:!min-w-[300px] last:!max-w-[300px]")
      }
      // style={getCssDelay()}
    >
      <Link href={link} className="relative block w-full bg-cbg card cd_hr rounded-xl duration-200">
        <p className={`overflow-hidden absolute top-5 -right-1 w-8 md:w-10 text-${open ? "green" : "t"}`}>
          <SvgIcon name="tag" />
          <span className="absolute inset-0 inline-flex justify-end items-center pr-[4px] text-[6px] md:text-[8px] text-dt">
            {open ? "Open" : "Closed"}
          </span>
        </p>
        <h2 className="p-3 font-medium">{name}</h2>
        <div className="overflow-hidden w-ful h-auto sm:h-72 flex items-center">
          <Image
            src={imageUrl}
            width="150"
            height="150"
            alt="Some description for the image"
            className={`block w-full ${cls ? "" : "h-full"}`}
          />
        </div>

        {admin ? <StoreAdminInfo {...s} /> : <StoreCustomerInfo {...s} />}
      </Link>
    </Tag>
  );
}
