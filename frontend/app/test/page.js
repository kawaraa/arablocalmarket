"use client";
// import { useEffect, useState } from "react";
// import Modal from "../(component)/(styled)/modal";
// import { IconButton } from "../(component)/(styled)/button";
// import BrowserBarcodeDetecter from "../(component)/b-barcode-detecter";
// import BarcodeScanner from "../(component)/barcode-scanner";
// import { ToggleSwitch } from "../(component)/(styled)/inputs";

export default function SignIn() {
  // const [browserSupport, setBrowserSupport] = useState(false);
  // const [showScanner, setShowScanner] = useState(false);
  // const [result, setResult] = useState("No result yet");

  // useEffect(() => {
  //   setBrowserSupport(!!window.BarcodeDetector);
  // }, []);
  return (
    <div>
      {/* <ToggleSwitch onChange={() => setBrowserSupport(!browserSupport)} />

      <div>
        <IconButton
          type="button"
          onClick={() => setShowScanner(true)}
          icon="scan"
          cls="w-12 p-1 hover:text-pc transition"
        />
      </div>

      <Modal title="Scanner" open={showScanner} center>
        {browserSupport ? (
          <BrowserBarcodeDetecter
            lang={"en"}
            onDetect={setResult}
            onError={(err) => setResult("err: " + err)}
            onClose={() => setShowScanner(false)}
            cls="mt-5"
          />
        ) : (
          <BarcodeScanner
            lang={"en"}
            onDetect={setResult}
            onError={(err) => setResult("err: " + err)}
            onClose={() => setShowScanner(false)}
            cls="mt-5"
          />
        )}
      </Modal> */}
    </div>
  );
}
