"use client";
import { useState } from "react";

export default function Test() {
  const [data, setData] = useState(false);

  const toggleLang = () => {
    setData(shouldShowIosInstallModal() + " - " + window.navigator.userAgent);
  };

  const shouldShowIosInstallModal = () => {
    const isIos = /iphone|ipad|ipod/gim.test(window.navigator.userAgent); // detect if the device is on iOS
    const isInstalled = "standalone" in window.navigator; // check if the device is in standalone mode
    // show the modal only once
    return isIos && !isInstalled && !JSON.parse(localStorage.getItem("shownIosInstallModal"));
  };

  return (
    <>
      <div className="py-5" onClick={toggleLang}>
        {/* {window.document.cookie} */}
        {/* {window?.BarcodeDetector?.name} */}
        Data:
        <br />
        {data}
      </div>
    </>
  );
}
