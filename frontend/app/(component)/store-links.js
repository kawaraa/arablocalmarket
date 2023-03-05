"use client";

import SvgIcon from "./(styled)/svg-icon";

export default function StoreLinks({ phone }) {
  const liCls =
    "w-9 h-9 md:w-10 md:h-10 mx-1 p-1.5 flex justify-center items-center rounded-full hover:text-pc duration-200";

  return (
    <ul className="absolute bottom-3 px-3 sm:justify-end w-full flex text-2xl font-bold lazy-c">
      <li className={liCls}>
        <a className="block w-6" href="tel:+4733378901">
          <SvgIcon name="phone" />
        </a>
      </li>
      <li className={liCls}>
        <a href="https://wa.me/+905365646833" target="_blank" title="WhatsApp" aria-label="WhatsApp">
          <SvgIcon name="whatsapp" />
        </a>
      </li>
      <li className={liCls}>
        <a href="#" title="Show QR Code" aria-label="Show QR Code">
          <SvgIcon name="qr" />
        </a>
      </li>
      <li className={liCls}>
        <a href="#" title="Add to favorite" aria-label="Add to favorite" className="fill-none p-[2px]">
          {/* Or favorite */}
          <SvgIcon name="favorite" />
        </a>
      </li>
      <li className={liCls}>
        <a href="#" title="Share" aria-label="Share">
          <SvgIcon name="share" />
        </a>
      </li>
      {/* <li className={liCls}>
        <a href="#" title="Rate store" aria-label="Rate store">
          &#9733;
        </a>
      </li> */}
    </ul>
  );
}
