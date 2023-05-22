"use client";
import Script from "next/script";
import { useContext, useEffect, useState } from "react";
import { request } from "../../(service)/api-provider";
import Modal from "../../(component)/(styled)/modal";
import SvgIcon from "../../(component)/(styled)/svg-icon";
import { AppSessionContext } from "../../app-session-context";
import { ShareButton } from "../../(component)/share-button";
import shdCnt from "../../(layout)/json/shared-content.json";
import RatingInputPopup from "../[storeId]/product/(component)/rating-input-popup";
const liCls =
  "relative w-9 h-9 md:w-10 md:h-10 mx-1 p-1.5 flex justify-center items-center bg-blur rounded-full hover:text-pc duration-200";

export default function StoreLinks({ lang, storeId, name = "", about = "", phone, ratings, scroll }) {
  const { user, addMessage } = useContext(AppSessionContext);
  const [showQR, setShowQR] = useState(false);
  const [showRatingInput, setShowRatingInput] = useState(false);
  const [favoriteStores, setFavoriteStores] = useState([]);

  const addToFavorite = async (e) => {
    e.preventDefault();
    if (!user) return addMessage({ type: "warning", text: shdCnt.favErr[lang], duration: 4 });
    const data = { favoriteStores: [...favoriteStores] };
    if (!favoriteStores.includes(storeId)) data.favoriteStores.push(storeId);
    else data.favoriteStores = favoriteStores.filter((s) => s != storeId);
    try {
      await request("customer", "PUT", { query: `/${user.customerId}`, body: { data } });
      setFavoriteStores(data.favoriteStores);
      addMessage({ type: "success", text: shdCnt.done[lang], duration: 3 });
    } catch (error) {
      addMessage({ type: "error", text: error.message, duration: 5 });
    }
  };

  const generateStoreQR = () => {
    new QRCode(document.getElementById("qrcode"), window.location.href);
  };

  useEffect(() => {
    if (+scroll) setTimeout(() => window.scroll(0, scroll), 500);
  }, [scroll]);

  useEffect(() => {
    if (user?.favoriteStores) setFavoriteStores(user.favoriteStores.map((s) => s.id));
  }, [user]);

  return (
    <>
      <ul className="absolute bottom-3 px-3 justify-end w-full flex text-bg text-2xl font-bold lazy-b">
        {phone && (
          <>
            <li className={liCls}>
              <a className="block w-6" href={`tel:${phone}`}>
                <SvgIcon name="phone" />
              </a>
            </li>

            <li className={liCls}>
              <a
                href={`https://wa.me/:${phone}`}
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
                aria-label="WhatsApp">
                <SvgIcon name="whatsapp" />
              </a>
            </li>
          </>
        )}
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
            className={"p-[2px] " + (favoriteStores.includes(storeId) ? "fill-bg" : "fill-none")}>
            <SvgIcon name="favorite" />
          </a>
        </li>
        <li className={liCls}>
          <ShareButton title={name} text={about} />
        </li>
        <li className={liCls + (ratings.userStars > 0 ? " text-pc" : "")}>
          <a
            href="#"
            title={shdCnt.rateH[lang]}
            aria-label={shdCnt.rateH[lang]}
            onClick={(e) => e.preventDefault() + setShowRatingInput(true)}>
            &#9733;
          </a>
        </li>
      </ul>

      <Modal open={showQR} onCancel={() => setShowQR(false)} center>
        <div id="qrcode" className="flex justify-center"></div>

        <Script src="/qr-generator/index.js" onReady={generateStoreQR}></Script>
      </Modal>

      <RatingInputPopup
        ratedStars={ratings.userStars}
        data={{ store: storeId }}
        open={showRatingInput}
        onClose={setShowRatingInput}
      />
    </>
  );
}

const content = {};
