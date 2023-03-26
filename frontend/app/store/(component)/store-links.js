"use client";

import { useEffect, useState } from "react";
import Modal from "../../(component)/(styled)/modal";
import StarRating from "../../(component)/(styled)/rating";
import SvgIcon from "../../(component)/(styled)/svg-icon";
import { copyText } from "../../(service)/utilities";

const liCls =
  "w-9 h-9 md:w-10 md:h-10 mx-1 p-1.5 flex justify-center items-center rounded-full hover:text-pc duration-200";
export default function StoreLinks({ lang, phone, scroll }) {
  const [showRatingInput, setShowRatingInput] = useState(false);
  const [stars, setStars] = useState(0);

  const handleShare = () => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
    if (navigator.share) return navigator.share(window.location.href);
    copyText(window.location.href, (copied) => alert((copied ? "Copied" : "Could not copy") + " store link"));
  };

  const handleRating = async (stars) => {
    setShowRatingInput(false);
  };

  useEffect(() => {
    if (+scroll) setTimeout(() => window.scroll(0, scroll), 500);
  }, [scroll]);

  return (
    <>
      <ul className="absolute bottom-3 px-3 sm:justify-end w-full flex text-bg text-2xl font-bold lazy-c">
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
            <SvgIcon name="favorite" />
          </a>
        </li>
        <li className={liCls}>
          <a href="#" onClick={handleShare} title="Share" aria-label="Share">
            <SvgIcon name="share" />
          </a>
        </li>
        <li className={liCls}>
          <a href="#" title="Rate store" aria-label="Rate store" onClick={() => setShowRatingInput(true)}>
            &#9733;
          </a>
        </li>
      </ul>

      <Modal
        open={showRatingInput}
        title={content.rateH[lang]}
        onCancel={() => setShowRatingInput(false)}
        onApprove={handleRating}
        okBtn={content.rateOk[lang]}
        center>
        <div className="text-center my-3">
          <StarRating stars={stars} onRate={setStars} cls="text-blur text-3xl" />
        </div>
      </Modal>
    </>
  );
}

const content = {
  rateH: { en: "Rating", ar: "التقييم" },
  rateOk: { en: "Save", ar: "حفظ" },
};
