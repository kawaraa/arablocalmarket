"use client";
import { useEffect, useRef } from "react";
import { IconButton } from "./(styled)/button";

export default function CustomBarcodeDetecter({ onDetect, onError, onClose, cls }) {
  const videoRef = useRef(null);
  const width = 500;
  const height = 250;

  const initializeScanner = async () => {
    if (videoRef.current?.srcObject) return;
    try {
      const getUserMedia =
        navigator.mediaDevices.getUserMedia ||
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

      const barcodeDetector = new BarcodeDetector({ formats });
      if (!barcodeDetector) throw new Error("Barcode Detector supported!");
      else console.log("Barcode Detector is not supported by this browser.");

      const constraints = {
        audio: false,
        video: { width: 1920, height: 1080, facingMode: { exact: "environment" } },
      };
      if (!("ontouchstart" in document.documentElement)) constraints.video = true;

      const stream = await getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      videoRef.current.play();

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;

      const check = async () => {
        if (!videoRef.current?.srcObject) return;

        const x = (videoRef.current.videoWidth - width) / 2;
        const y = (videoRef.current.videoHeight - height) / 2;
        ctx.drawImage(videoRef.current, x, y, width, height, 0, 0, width, height);

        const barCodes = await barcodeDetector.detect(canvas).catch((err) => console.log(err));
        if (!barCodes[0]) return check();
        onDetect(barCodes[0].rawValue);
        stopStreams();
      };

      check();
    } catch (error) {
      console.error(`${error.name}: ${error.message}`);
      stopStreams();
      if (error.message == "Permission denied") onError("Can not access camera.");
      else onError(error.message);
    }
  };

  const stopStreams = () => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      for (let i = 0; i < tracks.length; i += 1) tracks[i].stop();
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    initializeScanner();
    return stopStreams;
  }, []);

  return (
    <div
      className={`overflow-hidden w-full h-50 max-h-50 flex justify-center items-center w-full ${cls || ""}`}>
      {onClose && (
        <IconButton
          icon="close"
          handler={() => onClose(stopStreams())}
          label="Cancel and close the modal window"
          cls="absolute top-4 right-4 print:hidden"
        />
      )}
      <video ref={videoRef} id="yourElement" className="w-full bg-lbg dark:bg-cbg -scale-x-100" />
    </div>
  );
}

const formats = [
  "aztec",
  "code_128",
  "code_39",
  "code_93",
  "codabar",
  "data_matrix",
  "ean_13",
  "ean_8",
  "itf",
  "pdf417",
  "qr_code",
  "unknown",
  "upc_a",
  "upc_e",
];

// const ean = ["ean_reader", "ean_8_reader"];
// const upc = ["upc_reader", "upc_e_reader"];
// const codes = ["code_128_reader","code_39_reader","code_39_vin_reader",]
// const other = ["codabar_reader","i2of5_reader"]
// const  readers =  [...ean, ...upc, ...codes, ...other]
