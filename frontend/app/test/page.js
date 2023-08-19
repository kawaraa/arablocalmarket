"use client";
import { useState } from "react";
import BarcodeScannerPopup from "../(component)/(styled)/barcode-scanner-popup";

export default function Test() {
  const [data, setData] = useState(false);

  const getMobileOperatingSystem = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // // Windows Phone must come first because its UA also contains "Android"
    // if (/windows phone/i.test(userAgent)) return "windows-phone";
    // if (/android/i.test(userAgent)) return "android";
    // // iOS detection from: http://stackoverflow.com/a/9039885/177710
    // if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return "iOS";
    // return "unknown";
    return userAgent;
  };

  const toggleLang = () => {};

  return (
    <>
      <div className="py-5" onClick={toggleLang}>
        {/* {window.document.cookie} */}
        {/* {window?.BarcodeDetector?.name} */}
        Data:
        <br />
        {data}
      </div>

      <BarcodeScannerPopup lang={"en"} onBarcodeDetect={setData} onError={setData} btnCls="w-10" />
    </>
  );
}
