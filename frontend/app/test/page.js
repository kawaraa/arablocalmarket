"use client";
import { useState } from "react";
import BarcodeScanner from "./barcode-scanner";
import Modal from "../(component)/(styled)/modal";
import BarcodeScannerPopup from "../(component)/(styled)/barcode-scanner-popup";

export default function Test() {
  const [data, setData] = useState(false);

  return (
    <>
      <div className="py-5">
        {/* {window.document.cookie} */}
        Click here
        <br />
        {/* {window?.BarcodeDetector?.name} */}
        <br />
        {data}
      </div>

      <BarcodeScannerPopup lang={"en"} onBarcodeDetect={setData} onError={setData} btnCls="w-10" />
    </>
  );
}
