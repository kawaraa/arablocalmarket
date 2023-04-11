"use client";
import Script from "next/script";
import { useContext, useEffect, useState } from "react";
import Modal from "../../(component)/(styled)/modal";
import StarRating from "../../(component)/(styled)/rating";
import SvgIcon from "../../(component)/(styled)/svg-icon";
import { AppSessionContext } from "../../app-session-context";
import { ShareButton } from "../../(component)/share-button";
import shdCnt from "../../(layout)/json/shared-content.json";
const liCls =
  "relative w-9 h-9 md:w-10 md:h-10 mx-1 p-1.5 flex justify-center items-center rounded-full hover:text-pc duration-200";

export default function StoreLinks({ lang, name = "", about = "", phone, ratings, scroll }) {
  const { user, addMessage } = useContext(AppSessionContext);
  const [showQR, setShowQR] = useState(false);
  const [showRatingInput, setShowRatingInput] = useState(false);
  const [stars, setStars] = useState(ratings.userStars);

  const handleRating = async (stars) => {
    if (!user) return addMessage({ type: "warning", text: content.rateErr[lang], duration: 4 });
    // Todo: sent the rating to the backend
    setShowRatingInput(false);
  };

  const addToFavorite = async (e) => {
    e.preventDefault();
    if (!user) return addMessage({ type: "warning", text: shdCnt.favoriteErr[lang], duration: 4 });
    // Todo: Add store to the singed in user favorite in the backend
  };

  const generateStoreQR = () => {
    new QRCode(document.getElementById("qrcode"), window.location.href);
  };

  useEffect(() => {
    if (+scroll) setTimeout(() => window.scroll(0, scroll), 500);
  }, [scroll]);

  return (
    <>
      <ul className="absolute bottom-3 px-3 sm:justify-end w-full flex text-bg text-2xl font-bold lazy-c">
        <li className={liCls}>
          <a className="block w-6" href={`tel:${phone}`}>
            <SvgIcon name="phone" />
          </a>
        </li>
        <li className={liCls}>
          <a href={`https://wa.me/:${phone}`} target="_blank" title="WhatsApp" aria-label="WhatsApp">
            <SvgIcon name="whatsapp" />
          </a>
        </li>
        <li className={liCls}>
          <a
            href="#"
            onClick={(e) => e.preventDefault() + setShowQR(true)}
            title="Show QR Code"
            aria-label="Show QR Code">
            <SvgIcon name="qr" />
          </a>
        </li>
        <li className={liCls}>
          <a
            href="#"
            onClick={addToFavorite}
            title="Add to favorite"
            aria-label="Add to favorite"
            className="fill-none p-[2px]">
            <SvgIcon name="favorite" />
          </a>
        </li>
        <li className={liCls}>
          <ShareButton title={name} text={about} />
        </li>
        <li className={liCls}>
          <a
            href="#"
            title={content.rateH[lang]}
            aria-label={content.rateH[lang]}
            onClick={(e) => e.preventDefault() + setShowRatingInput(true)}>
            &#9733;
          </a>
          {ratings.total && <sub className="absolute -right-1 bottom-0 text-xs text-bg">{ratings.total}</sub>}
        </li>
      </ul>

      <Modal open={showQR} onCancel={() => setShowQR(false)} center>
        <div id="qrcode" className="flex justify-center "></div>

        <Script src="/qr-generator/index.js" onReady={generateStoreQR}></Script>
      </Modal>

      <Modal
        open={showRatingInput}
        title={content.rateH[lang]}
        onCancel={() => setShowRatingInput(false)}
        onApprove={handleRating}
        okBtn={shdCnt.save[lang]}
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
  share: {
    success: { en: "Copied store link", ar: "تم نسخ رابط المتجر" },
    error: { en: "Could not copy store link", ar: "تعذر نسخ رابط المتجر" },
  },
  rateErr: {
    en: "Only signed in users can rate the store",
    ar: "فقط المستخدمين الذين سجلوا الدخول يمكنهم تقييم المتجر",
  },
};
