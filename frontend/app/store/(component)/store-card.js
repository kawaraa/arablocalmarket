import Image from "next/image";
import Link from "next/link";
import { getCssDelay } from "../../(service)/style-methods";
import SvgIcon from "../../(component)/(styled)/svg-icon";
import Rating from "../../(component)/(styled)/rating";

export default function StoreCard({ imageUrl, name, distance, open }) {
  let dst = +distance;
  let measuringUnit = "KM";

  if (dst < 1) {
    dst = dst * 1000;
    measuringUnit = "M";
  }

  return (
    <article
      className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-1 text-t dark:text-dt lazy-c relative"
      style={getCssDelay()}>
      <Link href="store/1" className="relative block w-full bg-cbg card cd_hr rounded-xl duration-200">
        <p className={`overflow-hidden absolute top-5 -right-1 w-8 md:w-10 text-${open ? "green" : "t"}`}>
          <SvgIcon name="tag" />
          <span className="absolute inset-0 inline-flex justify-end items-center pr-[4px] text-[6px] md:text-[8px] text-dt">
            {open ? "Open" : "Closed"}
          </span>
        </p>
        <h2 className="p-3 font-medium">{name}</h2>
        <div className="w-ful h-40 sm:h-48 md:h-40 ">
          <Image
            src={imageUrl}
            width="250"
            height="250"
            alt="Some description for the image"
            className="block w-full h-full"
          />
        </div>

        <section dir="auto" className="p-3">
          <p className="flex justify-end text-red">
            <span className="w-4 fill-none">
              <SvgIcon name="heart" />
            </span>
          </p>
          <h3 className="text-sm mb-1">hef wfiuhfw ffpuhf wefwfpwuef wf</h3>
          <div className="flex justify-between items-center">
            <Rating stars={3.5} cls="text-sm lg:text-base" />

            <p>
              <strong className="">{dst} </strong>
              <span className="text-xs">{measuringUnit}</span>
            </p>
          </div>
        </section>
      </Link>
    </article>
  );
}
