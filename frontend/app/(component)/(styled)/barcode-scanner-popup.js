"use client";
import { useEffect, useState } from "react";
import shdCnt from "../../(layout)/json/shared-content.json";
import BrowserBarcodeDetecter from "../b-barcode-detecter";
import BarcodeScanner from "../barcode-scanner";
import Modal from "./modal";
import { IconButton } from "./button";

export default function BarcodeScannerPopup({ lang, onBarcodeDetect, onError, btnSize }) {
  const [showScanner, setShowScanner] = useState(false);
  const [browserSupportBarcodeScanner, setBrowserSupportBarcodeScanner] = useState(false);

  const handleDetect = (barcode) => {
    setShowScanner(false);
    onBarcodeDetect(barcode);
  };

  useEffect(() => {
    setBrowserSupportBarcodeScanner(!!window.BarcodeDetector);
  }, []);

  return (
    <>
      {btnSize && (
        <IconButton
          type="button"
          onClick={() => setShowScanner(true)}
          icon="scan"
          title={shdCnt.scanBtn[lang]}
          aria-expanded="true"
          aria-haspopup="dialog"
          size={btnSize}
          cls="p-1 cursor-pointer hover:text-pc transition"
        />
      )}
      <Modal title={shdCnt.scanner[lang]} open={showScanner} center>
        {/* {browserSupportBarcodeScanner ? (
          <BrowserBarcodeDetecter
            lang={lang}
            onDetect={handleDetect}
            onError={onError}
            onClose={() => setShowScanner(false)}
            cls="mt-5"
          />
        ) : (
          <BarcodeScanner
            lang={lang}
            onDetect={handleDetect}
            onError={onError}
            onClose={() => setShowScanner(false)}
            cls="mt-5"
          />
        )} */}
        <BarcodeScanner
          lang={lang}
          onDetect={handleDetect}
          onError={onError}
          onClose={() => setShowScanner(false)}
          cls="mt-5"
        />
      </Modal>
    </>
  );
}
