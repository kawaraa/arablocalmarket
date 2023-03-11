"use client";
import { getCssDelay } from "../(service)/style-methods";

export default function Card({ Tag }) {
  console.log("Card: >>>", a);

  return (
    <Tag
      className="relative overflow-hidden w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-1 lazy-c "
      style={getCssDelay()}>
      <Link
        href="store/1"
        className="relative block w-full bg-cbg card cd_hr fs rounded-xl duration-200"></Link>
    </Tag>
  );
}
