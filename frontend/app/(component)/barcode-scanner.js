"use client";
import { useEffect, useRef } from "react";
import Script from "next/script";

export default function BarcodeScanner({ onDetect, onError }) {
  const videoRef = useRef(null);
  const width = 320;
  const height = 240;

  const initializeScanner = async () => {
    if (videoRef.current?.srcObject) return;
    try {
      const constraints = { audio: false, video: { facingMode: { exact: "environment" } } };
      if (!("ontouchstart" in document.documentElement)) constraints.video = true;

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;
      const period = 1000;

      const checkResult = (result) => {
        if (!result?.codeResult?.code) setTimeout(check, period);
        else {
          onDetect(result.codeResult.code);
          stopStreams();
        }
      };

      const check = () => {
        if (!videoRef.current?.srcObject) return;
        ctx.drawImage(videoRef.current, 0, 0, width, height);
        Quagga.decodeSingle(
          { decoder: { readers }, src: canvas.toDataURL("image/png"), locate: false, multiple: false },
          checkResult
        );
      };

      check();
    } catch (error) {
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

  useEffect(() => stopStreams);

  return (
    <div className="text-center bg-blur min-h-44 w-full">
      <Script src="/barcode-scanner/quagga.min.js" onReady={initializeScanner}></Script>
      <video ref={videoRef} id="yourElement" style={{ width: "100%" }} />
    </div>
  );
}

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

// const ean = ["ean_reader", "ean_8_reader"];
// const upc = ["upc_reader", "upc_e_reader"];
// const codes = ["code_128_reader","code_39_reader","code_39_vin_reader",]
// const other = ["codabar_reader","i2of5_reader"]
// const  readers =  [...ean, ...upc, ...codes, ...other]
