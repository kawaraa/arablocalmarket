"use client";
import { useState } from "react";
import Modal from "../(component)/(styled)/modal";
import { IconButton } from "../(component)/(styled)/button";
import BrowserBarcodeDetecter from "../(component)/b-barcode-detecter";
import BarcodeScanner from "../(component)/barcode-scanner";

export default function SignIn() {
  const [browserSupportBarcodeScanner, setBrowserSupportBarcodeScanner] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [result, setResult] = useState("No result yet");

  useEffect(() => {
    setBrowserSupportBarcodeScanner(!!window.BarcodeDetector);
  }, []);
  return (
    <div>
      <div>
        <IconButton
          type="button"
          onClick={() => setShowScanner(true)}
          icon="scan"
          cls="w-12 p-1 hover:text-pc transition"
        />
      </div>

      <Modal title="Scanner" open={showScanner} center>
        {browserSupportBarcodeScanner ? (
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
      </Modal>
    </div>
  );
}
