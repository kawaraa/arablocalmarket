"use client";

import { useContext, useEffect, useState } from "react";
import { AppSessionContext } from "../../../app-session-context";
import { request } from "../../../(service)/api-provider";
import shdCnt from "../../../(layout)/json/shared-content.json";
import StarRating from "../../../(component)/(styled)/rating";
import Modal from "../../../(component)/(styled)/modal";

export default function RatingInputPopup({ stars, ratedStars, total, data, open, onClose, starsCls }) {
  const { lang, user, addMessage } = useContext(AppSessionContext);
  const [showRatingInput, setShowRatingInput] = useState(false);
  const [theStars, setStars] = useState(stars);
  const [inputStars, setInputStars] = useState(ratedStars);

  const handleRating = async () => {
    if (!user) return addMessage({ type: "warning", text: content.rateErr[lang], duration: 5 });
    try {
      await request("rating", "POST", { data: { ...data, stars: inputStars } });
      setStars(inputStars);
      addMessage({ type: "success", text: shdCnt.done[lang], duration: 3 });
    } catch (error) {
      addMessage({ type: "error", text: error.message, duration: 5 });
    }
    setShowRatingInput(false);
    if (onClose) onClose(false);
  };

  useEffect(() => {
    if (open) setShowRatingInput(true);
  }, [open]);

  return (
    <>
      {stars >= 0 && (
        <div
          onClick={data ? () => setShowRatingInput(true) : null}
          className={`text-center mt-7 ${data ? "cursor-pointer" : ""}`}>
          <StarRating stars={theStars} cls={starsCls || "text-blur text-3xl"} />
          {total > 0 && <sub className="absolute -right-1 bottom-0 !text-xs text-bg">{total}</sub>}
        </div>
      )}

      <Modal
        lang={lang}
        open={showRatingInput}
        title={content.rateH[lang]}
        onCancel={() => setShowRatingInput(false)}
        onApprove={handleRating}
        okBtn={shdCnt.save[lang]}
        center>
        <div className="text-center my-3">
          <StarRating stars={inputStars} onRate={setInputStars} cls="text-blur text-3xl" />
        </div>
      </Modal>
    </>
  );
}

const content = {
  rateH: { en: "Rating", ar: "التقييم" },
  rateErr: {
    en: "Only signed in users can rate the store",
    ar: "فقط المستخدمين الذين سجلوا الدخول يمكنهم تقييم المتجر",
  },
};
