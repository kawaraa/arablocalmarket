"use client";
import { useEffect, useState } from "react";
import Modal from "./modal";
import { IconButton } from "./button";
import BarcodeScanner from "../barcode-scanner";
import shdCnt from "../../(layout)/json/shared-content.json";

export default function BarcodeScannerPopup({ lang, onBarcodeDetect, onError, btnCls }) {
  const [showScanner, setShowScanner] = useState(false);

  const handleDetect = (barcode) => {
    setShowScanner(false);
    onBarcodeDetect(barcode);
  };

  const prop = { lang, onDetect: handleDetect, onError: onError, onClose: () => setShowScanner(false) };

  return (
    <>
      {btnCls && (
        <IconButton
          type="button"
          onClick={() => setShowScanner(true)}
          icon="scan"
          title={shdCnt.scanBtn[lang]}
          aria-expanded="true"
          aria-haspopup="dialog"
          cls={"p-1 cursor-pointer hover:text-pc transition " + btnCls}
        />
      )}

      <Modal lang={lang} title={shdCnt.scanner[lang]} open={showScanner} center>
        {<BarcodeScanner {...prop} />}
      </Modal>
    </>
  );
}

const content = { sc: { en: "Scanner", ar: "الماسح" } };
