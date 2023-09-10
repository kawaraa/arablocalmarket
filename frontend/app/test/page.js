"use client";
import { useState } from "react";

export default function Test() {
  const [data, setData] = useState(false);

  const showData = () => {
    setData(shouldShowIosInstallModal() + " - " + window.navigator.userAgent);
  };

  const shouldShowIosInstallModal = () => {
    const isIos = /iphone|ipad|ipod/gim.test(window.navigator.userAgent); // detect if the device is on iOS
    const isInstalled = window.navigator.standalone; // check if the device is in standalone mode
    return isIos + " - " + !isInstalled + " - " + !JSON.parse(localStorage.getItem("shownIosInstallModal"));
  };

  return (
    <>
      <div className="py-5" onClick={showData}>
        Data:
        <br />
        {data}
      </div>
    </>
  );
}
