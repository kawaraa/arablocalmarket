"use client";
import { useEffect, useRef } from "react";
import Script from "next/script";
import { Button, IconButton } from "./(styled)/button";

export default function BarcodeScanner({ lang, onDetect, onError, onClose, cls = "" }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(document.createElement("canvas"));
  const width = 500;
  const height = 250;

  const initializeScanner = async () => {
    const video = videoRef.current;
    const ctx = canvasRef.current.getContext("2d");
    let barcodeDetector = null;

    try {
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

      const constraints = {
        audio: false,
        video: { facingMode: { exact: "environment" } }, // width: 1920, height: 1080,width: { min: 1280 },
        height: { min: 720 },
      };
      if (!("ontouchstart" in document.documentElement)) constraints.video = true;

      if (!video?.srcObject) {
        if (navigator.mediaDevices.getUserMedia) {
          video.srcObject = await navigator.mediaDevices.getUserMedia(constraints);
        } else {
          video.srcObject = await new Promise((res, rej) => navigator.getUserMedia(constraints, res, rej));
        }
      }

      if (window?.BarcodeDetector) barcodeDetector = new BarcodeDetector({ formats });
      // if (!barcodeDetector) throw new Error("Barcode Detector is not supported by this browser.");

      canvasRef.current.width = width;
      canvasRef.current.height = height;

      video.addEventListener("canplay", () => video.play());
      video.addEventListener("loadeddata", () => check());

      const scanImage = async (canvas) => {
        if (barcodeDetector) {
          const result = await barcodeDetector.detect(canvas).catch(console.log);
          if (result && result[0]?.rawValue) return (result[0].rawValue + "").trim();
        }

        const src = canvas.toDataURL("image/jpeg", 1.0); // full-quality with compressing version

        const result = await new Promise((res) =>
          Quagga.decodeSingle({ decoder: { readers }, src, locate: false, multiple: false }, res)
        );
        return !result?.codeResult?.code ? null : (result.codeResult.code + "").trim();
      };

      const check = async () => {
        console.log("Barcode Scanner");
        if (!video?.srcObject || !canvasRef.current) return;
        const x = (video.videoWidth - width) / 2;
        const y = (video.videoHeight - height) / 2;

        ctx.drawImage(video, x, y, width, height, 0, 0, width, height);
        const barcode = await scanImage(canvasRef.current);

        // setTimeout(check, 1000 / 30); // drawing at 30fps Or just use 50s
        if (!barcode) return check();
        stopStreams();
        onDetect(barcode);
      };
    } catch (error) {
      console.error(`${error.name}: ${error.message}`);
      stopStreams();
      if (error.message == "Permission denied") onError(content.permissionErr[lang]);
      else onError(`${error.name}: ${error.message}`);
    }
  };

  const stopStreams = () => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current?.srcObject.getTracks();
      for (let i = 0; i < tracks.length; i += 1) tracks[i].stop();
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => stopStreams, []);

  return (
    <div dir="ltr" className={`w-full h-52 flex justify-center items-center ${cls || ""}`}>
      <Script src="/barcode-scanner/quagga.min.js" onReady={initializeScanner}></Script>

      {onClose && (
        <IconButton
          icon="crossMark"
          onClick={() => onClose(stopStreams())}
          title="Cancel and close the modal window"
          cls="w-8 absolute top-4 right-4 hover:text-red"
        />
      )}

      <div className="overflow-hidden relative w-full h-full">
        <video ref={videoRef} className="w-full bg-lbg dark:bg-cbg"></video>

        {videoRef.current?.paused && (
          <div className="absolute inset-0 w-full h-full bg-blur flex justify-center items-center">
            <Button onClick={() => videoRef.current?.play()}>{content.startBtn[lang]}</Button>
          </div>
        )}
      </div>
    </div>
  );
}
const content = {
  permissionErr: { en: "Could not access camera.", ar: "تعذر الوصول إلى الكاميرا" },
  startBtn: { en: "Start", ar: "بدء" },
};

const readers = [
  "ean_reader",
  "ean_8_reader",
  "upc_reader",
  "upc_e_reader",
  "code_128_reader",
  "code_39_reader",
  "code_39_vin_reader",
  "codabar_reader",
  "i2of5_reader",
];

const formats = [
  "ean_13",
  "ean_8",
  "upc_a",
  "upc_e",
  "itf",
  "code_128",
  "code_39",
  "code_93",
  "codabar",
  // "qr_code",
  // "aztec",
  // "data_matrix",
  // "pdf417",
  // "unknown",
];
