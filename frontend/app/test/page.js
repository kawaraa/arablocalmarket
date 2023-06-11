"use client";
import { useState } from "react";
import BarcodeScanner from "./barcode-scanner";
import Modal from "../(component)/(styled)/modal";

export default function Test() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)} className="py-5">
        {/* {window.document.cookie} */}
        Click here
        <br />
        {/* {window?.BarcodeDetector?.name} */}
        <br />
        {data}
      </div>

      <Modal open={open}>
        <BarcodeScanner lang="en" onDetect={setData} onError={setData} onClose={() => setOpen(false)} />
      </Modal>
    </>
  );
}
