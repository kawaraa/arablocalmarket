"use client";
import { useState } from "react";
import BarcodeScannerPopup from "../(component)/(styled)/barcode-scanner-popup";

export default function Test() {
  const [data, setData] = useState(false);

  return (
    <>
      <div className="py-5">
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
